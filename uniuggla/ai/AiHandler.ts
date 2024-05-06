"use server";

import OpenAI from "openai";
import { ChatCompletion, ChatCompletionMessageParam } from "openai/resources/index.mjs";
import programsJson from "@/public/dataset/programs.json";
import Program from "@/types/program";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs";


const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY, 
});

//The only function called from frontend
//returns the ai selected programs or throws an error
export async function getRecommendations(selectedInterest: string[]): Promise<Program[]> {

	try {
		//console.log("array : " + selectedInterest);
		const allPorgrams: Program[] = await fetchAllProgramsJson();
		const interestAsString: string = turnInterestToPrompt(selectedInterest);
		//console.log("string: " + interestAsString);
		//get id number form ai, if ai fails, set as an empty array
		const idNumbers: number[] | undefined = await callOpenaiInParts(interestAsString, allPorgrams);

		//get the programs for last call
		const selectedPrograms: Program[] = getProgramsFromId(idNumbers || [], allPorgrams);

		//get the final recommendations
		const finalProgramsId: number[] | undefined = await finalCallToAi(interestAsString, selectedPrograms);

		if (finalProgramsId) {
			const finalPrograms: Program[] = getProgramsFromId(finalProgramsId, allPorgrams);
			return finalPrograms;
		}
		else{
			throw new Error("Error occurred Ai can not filter the final results");
		}
	} catch (error) {
		console.error("Error occurred:", error);
		throw new Error("Error occurred Ai can not get recommendations");
	}
}
//get programs based on the id numbers sent int
function getProgramsFromId(idNumber: number[], allPrograms: Program[]): Program[] {
	return allPrograms.filter((program) => {
		return idNumber.includes(program.programId);
	});
}

//turn all the interests into a prompt for the ai
function turnInterestToPrompt(interests: string[]): string {
	return interests.reduce((result, interest, index) => {
		return result + "intressen " + index + ": " + interest + "\n";
	}, "");
}

// Turns all the programs into a prompt for the ai
function turnProgramToPrompt(programs: Program[]): string {
	return programs.reduce((accumulator, program) => {
		return accumulator + `program beskrivning: ${program.aiPrompt}, ProgramId: ${program.programId}\n`;
	}, "");
}

//format the message to ai, takes in a string argument which is the message to ai
function createChatCompletionMessage(content: string): ChatCompletionCreateParamsBase {
	const questionToAi: ChatCompletionMessageParam = {
		role: "user",
		content: content,
	};

	const systemMessage: ChatCompletionMessageParam = {
		role: "system",
		content: "Du är en studievägledare som ska rekommendera de bäst utbildningsprogram utifrån mina intressen. Har jag tekniska intressen ska du rekommendera tekniska utbildningar, har jag medicinska intressen ska du rekommendera medicinska utbildningar, och så vidare. Du ska svara med JSON object, med två fält programId och Motivation. Du måste svara med formatet [programs: [{programId: string, Motivation: string}]]"

};

	//content:
	//		"You are a student counselor and a JSON formatter. All your answers should be a JSON object. With only two fields programId and Motivation, no other fields should be present. The format must be [programs: [{programId: string, Motivation: string}]]",

	//content: "Du är en studievägledare som ska rekommendera de bäst utbildningsprogram utifrån mina intressen. Har jag tekniska intressen ska du rekommendera tekniska utbildningar, har jag medicinska intressen ska du rekommendera medicinska utbildningar, och så vidare. Du ska svara med JSON object, med två fält programId och Motivation."
	const completionMessage: ChatCompletionCreateParamsBase = {
		messages: [systemMessage, questionToAi],
		model: "gpt-3.5-turbo",
		response_format: { "type": "json_object" }
	};

	return completionMessage;
}

//This function is called concurrently for the first part
async function recommendProgramFromInterest(content: string) {
	// Generate content for AI based on interests and programs

	const messageToAi: ChatCompletionCreateParamsBase = createChatCompletionMessage(content);
	console.log(messageToAi);

	const completion = await openai.chat.completions.create(messageToAi);

	const response = completion as ChatCompletion;
	// save the answer to a varible to find the IDs


	try {
		const parsedObject = JSON.parse(response.choices[0].message.content as string);
		// Extract programIds from the 'programs' array
		const programIds: number[] = parsedObject.programs.map((obj: { programId: string }) => parseInt(obj.programId, 10));
		//parsedObject.programs.map((obj: { programId: string, Motivation: string }) => console.log("programId: " + obj.programId + " Motivation: " + obj.Motivation));
		//console.log("\n" + "\n" + "\n");
		return programIds;
	} catch (error) {
		console.error("Error parsing JSON:", error);
		return [];
	}
	
	
}

//This is the function that does calls recommendProgramFromInterest 
async function callOpenaiInParts(interestString: string, allPrograms: Program[]) {
	try {
		shuffleArray(allPrograms);
		const arrayLength = allPrograms.length;
		const partition = Math.ceil(arrayLength / 10);

		const promiseArray = Array.from({ length: 10 }, async (_, i) => {
			const startIndex = i * partition;
			const endIndex = Math.min((i + 1) * partition, arrayLength);
			const slicedPrograms = allPrograms.slice(startIndex, endIndex);
			const partialProgramString = turnProgramToPrompt(slicedPrograms);
			const content: string = `These are my interest: ${interestString} and these are all available programs ${partialProgramString}. I want you to choose 10 programs that are based on my interest. It's important that they are relevent to my interest. You should only answer with the programID and motivation why you choose that. The motivation should be two sentences`;
			return recommendProgramFromInterest(content);
		});
		const results = await Promise.all(promiseArray);
		let programIds: number[] = [];

		results.forEach((result) => {
			if (result) {
				programIds = programIds.concat(result);
			}
		});

		return programIds;
	} catch (error) {
		console.error("Error occurred:", error);
	}
}
//Final call to ai with message to rank and maybe remove not relevant programs
async function finalCallToAi(interestString: string, selectedProgram: Program[]){
	try{
	const programAsString: string = turnProgramToPrompt(selectedProgram);
	const content: string = `Det här är mina intressen: ${interestString}  \n och det här är alla utbildningsprogram  ${programAsString}. Jag vill att du väljer minst fem utbildningsprogram som passar mina intressen bäst. Rangordna så att det mest relevanta utbildningsprogramet är först. Jag vill att du motiverar först varför du valde programmet och sen skriver in program id.`;
	//console.log("whole content string final: " + content);
	const finalProgramsId : number[] = await recommendProgramFromInterest(content) || []
	//console.log("final numbers: " + finalProgramsId);
	return finalProgramsId;
	}
	catch(error) {
		console.error("Error occurred:", error);
	}
}

//fetches all the programs and is used once at getRecommendations
async function fetchAllProgramsJson(): Promise<Program[]> {
	return new Promise((resolve, reject) => {
		try {
			const allPrograms: Program[] = programsJson.map((item) => ({
				programTitle_sv: item.programTitle_sv,
				programPoints: item.programPoints,
				programDescription_sv: item.programDescription_sv,
				programLink: item.programLink,
				programId: item.programId,
				schoolName: item.schoolName,
				aiPrompt: item.aiPrompt,
				degree: item.degree !== null && item.degree !== undefined ? item.degree : "",
			}));
			resolve(allPrograms);
			return allPrograms; // can use resolve(allPrograms) if errors occur. -> is much slower
		} catch (parseError) {
			reject(parseError);
		}
	});
}

function shuffleArray<T>(array: T[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
