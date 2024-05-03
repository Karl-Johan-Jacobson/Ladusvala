"use server";
import * as fs from "fs";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import type Interest from "../types/interest";
import programsJson from "@/public/dataset/programs.json";
//IF YOU GET this error TS18028, just ignore. and run js file anyway -KJ

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // DO NOT PUSH
});

//Take in one argument, the interests that user selected
//Function only used to turn type Interest to a string
//NOT IN USED, but may be later
function turnInterestToPrompt(selectedInterests: Interest[]): string {
  let generatedString: string = "";

  for (let i = 0; i < selectedInterests.length; i++) {
    generatedString += `name: ${selectedInterests[i].interestTitle}\n`;
  }

  return generatedString;
}

//Take in one argument, all the programs form database
//Function only used to turn type Program to a string

function turnProgramToPrompt(allPrograms: ProgramNameAndId[]): string {
  let generatedString: string = "";

  for (let i = 0; i < allPrograms.length; i++) {
    //generatedString += `Degree: ${allPrograms[i].porgramTitle_sv}, ID = ${allPrograms[i].programId}\n`; //USED IN RELEASE
    generatedString += `Program title: ${allPrograms[i].programTitle_sv}, ProgramId: ${allPrograms[i].programId}\n, `;
    generatedString += `Program title: ${allPrograms[i].programTitle_sv}, ProgramId: ${allPrograms[i].programId}\n, `;
  }
  return generatedString;
}

//This function will take the selected interests from user and call ai to
//get a recommendation, it returns the programID as an array.
async function recommendProgramFromInterest(
  programString: string,
  interestString: string
) {
  // Generate content for AI based on interests and programs
  let content: string = `These are my interest: ${interestString} and these are all available programs ${programString}. I want you to choose 10 programs that are based on my interest. It's important that they are relevent to my interest however the fifth recommendation should be a wildcard and be loosely based on my interests. You should only answer with the programID and there should not be any other numbers in your answers. Do not answer in numbered bulletpoints`;

  // Make a prompt format
  const questionToAi: ChatCompletionMessageParam = {
    role: "user",
    content: content,
  };

  // Make the HTTP request to AI and save the results
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a student counselor." },
      questionToAi,
    ],
    model: "gpt-3.5-turbo",
  });

  //console.log(completion)
  // save the answer to a varible to find the IDs
  const text = completion.choices[0].message.content as string;
  console.log(text);
  console.log("TOTAL TOKEN USAGE: " + completion.usage?.total_tokens);
  // Use the exec method of the regex to find matches in the text
  const regex = /\d+/g;
  let idFromRespArray: string[] = []; // this will now hold all the IDs of programs extracted from the ai response.
  
  const numbers = text.match(regex); // extract numbers from the string
  // Check if numbers is defined
  console.log("numbers: "+numbers);
  if (numbers !== null) {
    numbers.forEach((num) => {

      if(num.length == 5){
        // check if the length of the sequence is exactly 5, matches our chosen numbering of programs.
        idFromRespArray.push(num); // push the sequence of IDs into the idFromRespArray array
			}
    });
  } // send id's to func which can display proper program info from them.
  console.log("idFromRespArray: "+ idFromRespArray)
  // Append to file to check if hallucinations occur
  const contentToWrite =
    "\n" +
    "NEW ENTRY" +
    "\n" +
    idFromRespArray.join("\n") +
    "\n" +
    completion.choices[0].message.content;
  fs.appendFile("hallucinationTest.txt", contentToWrite, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    console.log("Content has been written to hallucinationTest.txt");
  });
  console.log(idFromRespArray);
  return idFromRespArray;
}

const filePath: string = "public/dataset/programs.json";
// programDesciption name will be fixed when actual file is used.
export type ProgramNameAndId = {
  programTitle_sv: string;
  programPoints: string;
  programDescription_sv: string;
  programLink: string;
  programId: number;
  schoolName: string,
  aiPrompt: string,
  degree: string,
};



export async function fetchAllProgramsJson(): Promise<ProgramNameAndId[]> {

  return new Promise((resolve, reject) => {
    //Reads JSON file
      
        try {
          const allPrograms: ProgramNameAndId[] = programsJson.map((item) => ({
            programTitle_sv: item.programTitle_sv,
            programPoints: item.programPoints,
            programDescription_sv: item.programDescription_sv,
            programLink: item.programLink,
            programId: item.programId,
            schoolName: item.schoolName,
            aiPrompt: item.aiPrompt,
            degree: item.degree !== null && item.degree !== undefined ? item.degree : '',          }));
          resolve(allPrograms);
          return allPrograms; // can use resolve(allPrograms) if errors occur. -> is much slower
        } catch (parseError) {
          reject(parseError);
        }
      }
    );
  }


export async function mediumFunctionJson(): Promise<ProgramNameAndId[]>  {
  return await fetchAllProgramsJson();
  
}
export default async function callOpenaiInParts(interestString: string) {
  try {
    const programs = await fetchAllProgramsJson();
    console.log("Before length"+programs.length);
    shuffleArray(programs)
    console.log("after length "+programs.length);
    const arrayLength = programs.length;
    const partition = Math.ceil(arrayLength / 5);
    
    const numbersArr: number[] = programs.map((item) => {
      return item.programId
    });
    console.log(numbersArr);

   
    let programIds: string[] = [];

    // Create an array of promises that run recommendProgramFromInterest concurrently
    
    const promiseArray = Array.from({ length: 5 }, async (_, i) => {
      const startIndex = i * partition;
      const endIndex = Math.min((i + 1) * partition, arrayLength);
      const slicedPrograms = programs.slice(startIndex, endIndex);
      const partialProgramString = turnProgramToPrompt(slicedPrograms);
      return recommendProgramFromInterest(partialProgramString, interestString);
    });
    
    // Wait for all promises to resolve
    const startTime = Date.now();
    const results = await Promise.all(promiseArray);
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.log(`Time taken: ${duration} milliseconds`);

    // Concatenate the results
    results.forEach(result => {
      programIds = programIds.concat(result);
    });

    console.log(`Program IDs from all partitions: `, programIds);
    return programIds;
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}






export async function filterTheResultsFromAi(
  programIDString: string[],
  interestString: string
) {

  const programs = await fetchAllProgramsJson();
  const programIdNumber : number[] = programIDString.map((num) => {
    return num as unknown as number;
  });
  
  let selectedPrograms : ProgramNameAndId[] = [];

	for (var i = 0, n = 0; i < programs.length; i++) {
		for (var j = 0; j < programIdNumber.length; j++) {
			if (programs[i].programId == programIdNumber[j]) {
				selectedPrograms[n++] = programs[i];
			}
		}
	}

  const programString = turnProgramToPrompt(selectedPrograms);
  // Generate content for AI based on interests and programs
  let content: string = `These are my interest: ${interestString} and these are all available programs ${programString}. I want you to choose which programs are most relevant for me. You should rank them where the first is the most relevant program. You should only answer with the program id and you motivation. You should atleast choose 10 programs`;

  // Make a prompt format
  const questionToAi: ChatCompletionMessageParam = {
    role: "user",
    content: content,
  };

  // Make the HTTP request to AI and save the results
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a student counselor. Your answers should be formated exactly in this way [programId: number, reason: motivation] where number is the number motivation is your reasoning." },
      questionToAi,
    ],
    model: "gpt-3.5-turbo",
  });

  //console.log(completion)
  // save the answer to a varible to find the IDs
  const text = completion.choices[0].message.content as string;
  console.log(text);
  console.log("TOTAL TOKEN USAGE: " + completion.usage?.total_tokens);
  // Use the exec method of the regex to find matches in the text
  const regex = /\d+/g;
  let idFromRespArray: string[] = []; // this will now hold all the IDs of programs extracted from the ai response.
  
  const numbers = text.match(regex); // extract numbers from the string
  // Check if numbers is defined
  console.log("numbers: "+numbers);
  if (numbers !== null) {
    numbers.forEach((num) => {

      if(num.length == 5){
        // check if the length of the sequence is exactly 5, matches our chosen numbering of programs.
        idFromRespArray.push(num); // push the sequence of IDs into the idFromRespArray array
      }
    });
  } // send id's to func which can display proper program info from them.
  console.log("idFromRespArray: "+ idFromRespArray)
  // Append to file to check if hallucinations occur
  const contentToWrite =
    "\n" +
    "NEW ENTRY" +
    "\n" +
    idFromRespArray.join("\n") +
    "\n" +
    completion.choices[0].message.content;
  fs.appendFile("hallucinationTest.txt", contentToWrite, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    console.log("Content has been written to hallucinationTest.txt");
  });
  console.log(idFromRespArray);
  return idFromRespArray;
}
