"use server";

import OpenAI from "openai";
import { ChatCompletion, ChatCompletionMessageParam } from "openai/resources/index.mjs";
import Program from "@/types/program";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs";
import ProgramRecommendation from "@/types/ProgramRecommendation";
import { turnInterestToPrompt, getProgramFromId, getProgramsFromId, shuffleArray, turnProgramToPrompt, fetchAllProgramsJson } from "./AiUtils";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});


var testTotalTokensForPrint = 0;
//The only function called from frontend
//returns the ai selected programs or throws an error
export async function getRecommendations(selectedInterest: string[]): Promise<ProgramRecommendation[]> {
	try {
		//console.log("array : " + selectedInterest);
		const startTime = Date.now();
		// Setup
		const allPrograms: Program[] = fetchAllProgramsJson();
		const interestAsString: string = turnInterestToPrompt(selectedInterest);
		const interestProfile = await getProfile(interestAsString);

		const endTime = Date.now();
		const duration = endTime - startTime;
		console.log(`Time taken first call ${duration} milliseconds`);
		//console.log("string: " + interestAsString);
		//get id number form ai, if ai fails, set as an empty array
		const startTime2 = Date.now();

		// Get id:s of recommended programs
		const idNumbers: number[] | undefined = await callOpenaiInParts(interestProfile, allPrograms);

		const endTime2 = Date.now();
		const duration2 = endTime2 - startTime2;
		console.log(`Time taken concurrent call: ${duration2} milliseconds`);
		//get the programs for last call
		const startTime4 = Date.now();

		// Map id:s to their program, 50 programs
		const selectedPrograms: Program[] = getProgramsFromId(idNumbers || [], allPrograms);

		const endTime4 = Date.now();
		const duration4 = endTime4 - startTime4;
		console.log(`Time taken to get id: ${duration4} milliseconds`);

		const startTime3 = Date.now();

		//get the final recommendations
		const finalPrograms: ProgramRecommendation[] | undefined = await finalCallToAi(interestProfile, selectedPrograms);
		const endTime3 = Date.now();
		const duration3 = endTime3 - startTime3;

		//take away finalPrograms from selectedPrograms
		//choose three wildcards from the remaining selectedPrograms

		console.log(`Time taken final call: ${duration3} milliseconds`);
		if (finalPrograms) {

			//remove the finalprograms from the selectedprograms
			const remainingPrograms: Program[] = selectedPrograms.filter((program) => {
				return !finalPrograms.some((finalProgram) => finalProgram.program.programId === program.programId);
			});
			//Shuffle the array to avoid taking the same school everytime. 
			shuffleArray(remainingPrograms);
			//take the first three programs from the remaining programs(shuffled)
			const firstThreePrograms: Program[] = remainingPrograms.slice(0, 3);

			// Convert randomPrograms to ProgramRecommendation type and append to finalPrograms
			finalPrograms.push(
				...firstThreePrograms.map((program) => {
					return {
						program: program,
						wildcard: true,
					};
				})
			);
			//shuffle a last time to not make the wildcards appear at the end
			shuffleArray(finalPrograms);
			console.log("Total tokens: " + testTotalTokensForPrint);
			return finalPrograms;
		} else {
			throw new Error("Error occurred Ai can not filter the final results");
		}
	} catch (error) {
		console.error("Error occurred:", error);
		throw new Error("Error occurred Ai can not get recommendations");
	}
}

async function getProfile(interestAsString: string): Promise<string> {
	const content = `Det här är mina intressen \n ${interestAsString} \n Jag vill att du beskriver min intresse profil i några meningar.`;
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

	if (response.usage?.total_tokens) testTotalTokensForPrint += response.usage?.total_tokens;

	return response.choices[0].message.content ? response.choices[0].message.content : "";
}

//format the message to ai, takes in a string argument which is the message to ai
function createChatCompletionMessage(content: string): ChatCompletionCreateParamsBase {
	const questionToAi: ChatCompletionMessageParam = {
		role: "user",
		content: content,
	};

	const systemMessage: ChatCompletionMessageParam = {
		role: "system",
		content:
			"Du är en studievägledare som ska rekommendera de bäst utbildningsprogram utifrån mina intressen, du lägger ingen värdering i studentens intressen. Det är viktigt att utbildningarna matchar mina intressen strikt. Du ska svara med JSON object, med ett fält programId. Du måste svara med formatet [programs: [{programId: string}]].",
	};

	const completionMessage: ChatCompletionCreateParamsBase = {
		messages: [systemMessage, questionToAi],
		model: "gpt-3.5-turbo",
		response_format: { type: "json_object" },
	};

	return completionMessage;
}

//This function is called concurrently for the first part
async function recommendProgramFromInterest(content: string) {
	// Generate content for AI based on interests and programs
	const messageToAi: ChatCompletionCreateParamsBase = createChatCompletionMessage(content);
	//make the http call
	const completion = await openai.chat.completions.create(messageToAi);
	//cast the respone to correct type
	const response = completion as ChatCompletion;

	console.log(response.choices[0].message.content)
	if (response.usage?.total_tokens) testTotalTokensForPrint += response.usage?.total_tokens;

	try {
		const parsedObject = JSON.parse(response.choices[0].message.content as string);
		// Extract programIds from the 'programs' array

		const programIdsAndWildcards: { programId: number; wildcard: boolean }[] = parsedObject.programs.map((obj: { programId: string; wildcard: string }) => ({
			programId: parseInt(obj.programId, 10),
			wildcard: false,
		}));
		return programIdsAndWildcards;
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
		const partition = Math.ceil(arrayLength / 5);
		const promiseArray = Array.from({ length: 5 }, async (_, i) => {
			const startIndex = i * partition;
			const endIndex = Math.min((i + 1) * partition, arrayLength);
			const slicedPrograms = allPrograms.slice(startIndex, endIndex);
			const partialProgramString = turnProgramToPrompt(slicedPrograms);
			const content: string = `Det här är mina intressen: \n ${interestProfile} \n och det här är beskrivning på utbildningsprogram \n ${partialProgramString} \n Jag vill att du väljer tio utbildningsprogram som matchar min intressen strikt. Du ska bara svara med programId`;
			return recommendProgramFromInterest(content);
		});
		const result = await Promise.all(promiseArray);
		let programIds: number[] = [];
		programIds = result.flat().map((obj: { programId: number; wildcard: boolean }) => {
			return obj.programId;
		});

		return programIds;
	} catch (error) {
		console.error("Error occurred:", error);
	}
}
//Final call to ai with message to rank and maybe remove not relevant programs
async function finalCallToAi(interestProfile: string, selectedPrograms: Program[]): Promise<ProgramRecommendation[] | undefined> {
	try {
		const programAsString: string = turnProgramToPrompt(selectedPrograms);
		const content: string = `${interestProfile}  \n och det här är beskrivningen på alla utbildningsprogram jag kan välja mellan  ${programAsString}. Du ska rekommendera åtminstone 10 utbildningar. Rangordna så att det mest relevanta utbildningsprogramet är först. Jag vill att du svarar med programId. Du måste svara med JSON`;
		//("whole content string final: " + content);
		const finalProgramsIdAndWildcards: { programId: number; wildcard: boolean }[] = (await recommendProgramFromInterest(content)) || [];
		//console.log("final numbers: " + finalProgramsId);

		return finalProgramsIdAndWildcards.map(({ programId, wildcard }: { programId: number; wildcard: boolean }) => {
			return {
				program: getProgramFromId(programId, selectedPrograms),
				wildcard: wildcard,
			};
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}
}
