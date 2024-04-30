"use server";
import * as fs from "fs";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import type Interest from "../types/interest";
import type Program from "../types/program";
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
  }
  //console.log(generatedString+'\n');

  //console.log(generatedString+'\n');

  return generatedString;
}

//This function will take the selected interests from user and call ai to
//get a recommendation, it returns the programID as an array.
async function recommendProgramFromInterest(
  programString: string,
  interestString: string
) {
  // Generate content for AI based on interests and programs
  let content: string = `These are my interest: ${interestString} and these are all available programs ${programString}. I want you to choose 5 programs that are based on my interest. It's important that they are relevent to my interest however the fifth recommendation should be a wildcard and be loosely based on my interests. You should only answer with the programID.`;

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

  // save the answer to a varible to find the IDs
  const text = completion.choices[0].message.content as string;
  console.log("TOTAL TOKEN USAGE: " + completion.usage?.total_tokens);
  // Use the exec method of the regex to find matches in the text
  const regex = /\d+/g;

  let idFromRespArray: string[] = []; // this will now hold all the IDs of programs extracted from the ai response.

  const numbers = text.match(regex); // extract numbers from the string
  // Check if numbers is defined
  if (numbers !== null) {
    numbers.forEach((num) => {
      if (num.length === 5) {
        // check if the length of the sequence is exactly 5, matches our chosen numbering of programs.
        idFromRespArray.push(num); // push the sequence of IDs into the idFromRespArray array
      }
    });
  } // send id's to func which can display proper program info from them.

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

  //DEBUG PURPOSE
  //console.log(idFromRespArray);
  //console.log(completion.choices[0].message.content);
  //console.log(numbers);
  return idFromRespArray;
}

const filePath: string = "demoPrograms.json";

// programDesciption name will be fixed when actual file is used.
export type ProgramNameAndId = {
  programTitle_sv: string;
  programPoints: string;
  programDesciption_sv: string;
  programLink: string;
  programId: number;
};

export async function fetchAllProgramsJson(): Promise<ProgramNameAndId[]> {
  return new Promise((resolve, reject) => {
    //Reads JSON file
    fs.readFile(
      filePath,
      "utf8",
      (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
          reject(err);
          return;
        }
        let counter = 10000;
        try {
          const jsonArray = JSON.parse(data) as any[]; // Parse as array of any type
          const allPrograms: ProgramNameAndId[] = jsonArray.map((item) => ({
            programTitle_sv: item.programTitle_sv,
            programPoints: item.programPoints,
            programDesciption_sv: item.programDesciption_sv,
            programLink: item.programLink,
            programId: counter++, // This will be set through scrapers, will be present within programs.json. Assuming programId is a string and needs to be converted to a number
          }));
          /*console.log("-----START OF PROGRAM SECTION------");
          console.log(allPrograms);
          console.log("-----END OF PROGRAM SECTION------");*/

          resolve(allPrograms);
          return allPrograms; // can use resolve(allPrograms) if errors occur. -> is much slower
        } catch (parseError) {
          reject(parseError);
        }
      }
    );
  });
}

export default async function callOpenaiInParts(interestString: string) {
  try {
    const programs = await fetchAllProgramsJson();
    //console.log("programs");

    //console.log(programs);
    //console.log("programs");

    const arrayLength = programs.length;
    const partition = Math.ceil(arrayLength / 5); // Round up to ensure all items are included
    //const test = turnProgramToPrompt(programs);
    //console.log("test");

    //console.log(test);

    let programIds: string[] = []; // Will hold all program ids from the 5 calls to openAI. Use to make new call.
    for (let i = 0; i < 5; i++) {
      // Make 5 calls to openAI to split context.
      const startIndex = i * partition;
      const endIndex = Math.min((i + 1) * partition, arrayLength); // Ensure endIndex does not exceed array length

      const slicedPrograms = programs.slice(startIndex, endIndex);
      const partialProgramString = turnProgramToPrompt(slicedPrograms);

      programIds = programIds.concat(
        await recommendProgramFromInterest(
          partialProgramString,
          interestString
        )
      ); // programIds from recommendProgramFromInterest is added to programIds
      console.log(`Program IDs from ${i} partition: `, programIds);
    }
    console.log(`Program IDs from all partitions: `, programIds);
    return programIds;
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

