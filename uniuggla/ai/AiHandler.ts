"use server";

import OpenAI from "openai";
import { ChatCompletion, ChatCompletionMessageParam } from "openai/resources/index.mjs";
import programsJson from "@/public/dataset/programs.json";
import Program from "@/types/program";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs";
import { resolve } from "path";



const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY, 
});

var testCounterForPrint = 0;
var testTotalTokensForPrint = 0;
//The only function called from frontend
//returns the ai selected programs or throws an error
export async function getRecommendations(selectedInterest: string[]): Promise<Program[]> {

	try {
		//console.log("array : " + selectedInterest);
		const startTime = Date.now();
		const allPorgrams: Program[] = await fetchAllProgramsJson();
		const interestAsString: string = turnInterestToPrompt(selectedInterest);
		const interestProfile = await getProfile(interestAsString);
		const endTime = Date.now();
		const duration = endTime - startTime;
		console.log(`Time taken first call ${duration} milliseconds`);
		//console.log("string: " + interestAsString);
		//get id number form ai, if ai fails, set as an empty array
		const startTime2 = Date.now();
		const idNumbers: number[] | undefined = await callOpenaiInParts(interestProfile, allPorgrams);
		const endTime2 = Date.now();
		const duration2 = endTime2 - startTime2;
		console.log(`Time taken concurrent call: ${duration2} milliseconds`);
		//get the programs for last call
		const startTime4 = Date.now();
		const selectedPrograms: Program[] = getProgramsFromId(idNumbers || [], allPorgrams);
		const endTime4 = Date.now();
		const duration4 = endTime4 - startTime4;
		console.log(`Time taken to get id: ${duration4} milliseconds`);
		//get the final recommendations

		
		const startTime3 = Date.now();
		const finalProgramsId: number[] | undefined = await finalCallToAi(interestProfile, selectedPrograms);
		const endTime3 = Date.now();
		const duration3 = endTime3 - startTime3;
		
		console.log(`Time taken final call: ${duration3} milliseconds`);
		if (finalProgramsId) {
			const startTime5 = Date.now();
			const finalPrograms: Program[] = getProgramsFromId(finalProgramsId, allPorgrams);
			const endTime5 = Date.now();
			const duration5 = endTime5 - startTime5;
			console.log(`Time taken to get id: ${duration5} milliseconds`);
			console.log(`Total token for all calls: ${testTotalTokensForPrint}`)
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

async function getProfile (interestAsString: string): Promise<string>{

	const content = `Det här är mina intressen \n ${interestAsString} \n Jag vill att du beskriver min intresse profil i några meningar.`
	// Make a prompt format
	const questionToAi: ChatCompletionMessageParam = {
		role: "user",
		content: content,
	};

	// Make the HTTP request to AI and save the results
	const completion = await openai.chat.completions.create({
		messages: [{ role: "system", content: "Du är en studievägledare som hjälper studenter att förstå vad dem är intresserade i" }, questionToAi],
		model: "gpt-3.5-turbo",
	});

	const response = completion as ChatCompletion;

	if(response.usage?.total_tokens) testTotalTokensForPrint += response.usage?.total_tokens; 

	console.log(response.choices[0].message.content);

	return response.choices[0].message.content ? response.choices[0].message.content : "";


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
		return accumulator + `{program beskrivning: ${program.aiPrompt}, ProgramId: ${program.programId}},\n`;
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
		content: "Du är en studievägledare som ska rekommendera de bäst utbildningsprogram utifrån mina intressen, du lägger ingen värdering i studentens intressen. Det är viktigt att utbildningarna matchar mina intressen strikt. Du ska svara med JSON object, med två fält programId och wildcard. Du måste svara med formatet [programs: [{programId: string, wildcard: string}]]"

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
	//console.log(messageToAi);

	const completion = await openai.chat.completions.create(messageToAi);

	const response = completion as ChatCompletion;
	// save the answer to a varible to find the IDs

	if(response.usage?.total_tokens) testTotalTokensForPrint += response.usage?.total_tokens; 

	try {
		const parsedObject = JSON.parse(response.choices[0].message.content as string);
		// Extract programIds from the 'programs' array
		const programIds: number[] = parsedObject.programs.map((obj: { programId: string }) => parseInt(obj.programId, 10));
		if(testCounterForPrint++ == 5){
			parsedObject.programs.map((obj: { programId: string, wildcard: string }) => console.log("programId: " + obj.programId, "wildcard: " + obj.wildcard));
			console.log("\n" + "\n" + "\n");
		}

		return programIds;
	} catch (error) {
		console.error("Error parsing JSON:", error);
		return [];
	}
	
	
}

//This is the function that does calls recommendProgramFromInterest 
async function callOpenaiInParts(interestProfile: string, allPrograms: Program[]) {
	try {
		shuffleArray(allPrograms);
		const arrayLength = allPrograms.length;
		const partition = Math.ceil(arrayLength / 4);

		const promiseArray = Array.from({ length: 4 }, async (_, i) => {
			const startIndex = i * partition;
			const endIndex = Math.min((i + 1) * partition, arrayLength);
			const slicedPrograms = allPrograms.slice(startIndex, endIndex);
			const partialProgramString = turnProgramToPrompt(slicedPrograms);
			const content: string = `Det här är mina intressen: \n ${interestProfile} \n och det här är beskrivning på utbildningsprogram \n ${partialProgramString} \n Jag vill att du väljer tio utbildningsprogram som matchar min intressen strikt. Du ska bara svara med programId, lämna wildcard fältet tomt`;
			return recommendProgramFromInterest(content);
		});
		const results = await Promise.all(promiseArray);
		let programIds: number[] = [];

		results.forEach((result) => {
			if (result) {
				programIds = programIds.concat(result);
			}
		});

		const selectedProgram = getProgramsFromId(programIds, allPrograms);
		const finalProgramsId = finalCallToAi(interestProfile, selectedProgram);

		return finalProgramsId;
	} catch (error) {
		console.error("Error occurred:", error);
	}
}
//Final call to ai with message to rank and maybe remove not relevant programs
async function finalCallToAi(interestProfile: string, selectedProgram: Program[]){
	try{
	const programAsString: string = turnProgramToPrompt(selectedProgram);
	//const content: string = `${interestProfile}  \n och det här är beskrivningen på alla utbildningsprogram jag kan välja mellan  ${programAsString}. Du ska rekommendera åtminstone 10 utbildningar. Rangordna så att det mest relevanta utbildningsprogramet är först. Jag vill att du motiverar först varför du valde programmet och sen skriver in program id. Det ä viktigt att utbildningarna matchar mina intressen väldigt strikt. I slutet vill jag att du även skriver vilken procentuell matchning utbildningen är med mina intressen skriv det i slutet av motiveringen`;
	const content: string = `${interestProfile}  \n och det här är beskrivningen på alla utbildningsprogram jag kan välja mellan  ${programAsString}. Du ska rekommendera åtminstone 10 utbildningar. Rangordna så att det mest relevanta utbildningsprogramet är först. Jag vill att du svarar med programId. Om det finns program som matchar mina intressen måttligt sätt wildcard fältet till true. Du måste rekommendera åtminstone ett wildcard och som mest tre wildcards.`;

	//("whole content string final: " + content);
	
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
