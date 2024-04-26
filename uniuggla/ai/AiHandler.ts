"use server";
import * as fs from "fs";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import type Interest from "../types/interest";
import type Program from "../types/program";
//IF YOU GET this error TS18028, just ignore. and run js file anyway -KJ

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  //apiKey: "", // DO NOT PUSH THIS PLEASE
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
export default async function recommendProgramFromInterest(interestString: string) {
  //fetch all programs
 const programs: ProgramNameAndId[] = await fetchAllProgramsJson();
 // transform the result into a string after the data is fetched
 const programString: string = turnProgramToPrompt(programs);

  //Generate the question to ai to answer
  //They are three version, least token to most token
  let content : string = `These are my interest: ${interestString} and these are all available programs ${programString}. I want you to choose 5 programs that are based on my interest. It's important that they are relevent to my interest. You should only answer with the programID.`
  //let content: string = `These are my interest: ${interestString} and these are all available degrees ${programString}. Choose four of these degrees that matches my interest and then choose one wild card loosely based on the interests, make sure to mark your wildcard. Answer in bullet points with the exact interestTitles of the degrees, the bullet points should start with a dot and not numbers. Answer in swedish. You should answer in the format [Degree, ID = {number}]. Lastly end with a question asking the user if he/she think one of these degrees are interesting.`;
  //let content: string = `These are my interest: ${interestString} and these are all available programs one on each line: ${programString}. Choose four of these programs that matches my interest and then choose one wild card loosely based on the interests, (in total 5 program recommendations) make sure to put the wildcard last. Your answer should start by presenting the programId, followd by one sentence why you choose that degree. You must answer in swedish and write a new line after every degree. Lastly end with a new line and the question "Vill du veta mer om någon av dessa utbildingarna? - UniUGpt"`;

  //make a prompt format
  let questionToAi: ChatCompletionMessageParam = {
    role: "user",
    content: content,
  };

  //make the HTTP request to ai and save the results
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are student counselor." },
      questionToAi,
    ],
    model: "gpt-3.5-turbo",
  });


  // save the answer to a varible to find the IDs
  const text = completion.choices[0].message.content as string;
  console.log("TOTAL TOKEN USAGE: "+completion.usage?.total_tokens);
  console.log("TOTAL TOKEN USAGE: "+completion.usage?.total_tokens);
  // Use the exec method of the regex to find matches in the text
  const regex = /\d+/g;

  let idFromRespArray: string[] = []; // this will now hold all the IDs of programs extracted from the ai response.

  const numbers = text.match(regex);  // extract numbers from the string
console.log(numbers);
  // Check if numbers is defined
  if (numbers !== null) {
    numbers.forEach((num) => {
      if (num.length === 5) { // check if the length of the sequence is exactly 5, matches our chosen numbering of programs.
        idFromRespArray.push(num); // push the sequence of IDs into the idFromRespArray array
      }
    });
  } // send id's to func which can display proper program info from them.

  // Append to file to check if hallucinations occur
  const contentToWrite = idFromRespArray.join('\n') + '\n' + completion.choices[0].message.content;
  fs.appendFile('hallucinationTest.txt', contentToWrite, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log('Content has been written to output.txt');
  });
  
  

  
  //DEBUG PURPOSE
  console.log(idFromRespArray);
  console.log(idFromRespArray);
  console.log(completion.choices[0].message.content);
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
            programId: counter++ // This will be set through scrapers, will be present within programs.json. Assuming programId is a string and needs to be converted to a number
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