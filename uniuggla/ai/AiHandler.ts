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

//Remeber to handle errors, for example "no choices available" -KJ
//When called user input should already been append to array

//USE for testing function userAskAiAndGetAnswer
/*
let messagesArray: ChatCompletionMessageParam[] = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "Who won the world series in 2020?" },
  {
    role: "assistant",
    content: "The Los Angeles Dodgers won the World Series in 2020.",
  },
  { role: "user", content: "Where was it played?" },
];
*/

//get answer from user. Can add a string as argument to get user input and append to
//user's messageArray
async function userAskAiAndGetAnswer(
  userMessagesArray: ChatCompletionMessageParam[] //the type is OPENAI's own type. Must be used
) {
  //Sends the HTTP request to open ai and saves the responds
  const completion = await openai.chat.completions.create({
    messages: userMessagesArray,
    model: "gpt-3.5-turbo",
    max_tokens: 400, //can change, used in testing for token minimization
  });

  //Append what the ai answered.
  userMessagesArray.push({
    role: "assistant",
    content: completion.choices[0].message.content,
  });



  //DEBUG
  //console.log(userMessagesArray);

  return userMessagesArray;
}

//Take in one argument, the interests that user selected
//Function only used to turn type Interest to a string

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
//export default async function recommendProgramFromInterest(selectedInterests: Interest[]) this is the release version
export default async function recommendProgramFromInterest(interestString: string) {
  //turn interests to a string
  //const interestString: string = turnInterestToPrompt(selectedInterests); This must be uncomment for Release mode
  //fetch from database
  //const allPrograms: Program[] = await fetchAllPrograms(); This must be uncomment for Release mode
  //turn all programs to a string
 // await the async call to get the result
 const programs: ProgramNameAndId[] = await fetchAllProgramsJson();
 // transform the result into a string after the data is fetched
 const programString: string = turnProgramToPrompt(programs);
 //const interestString: string = turnInterestToPrompt(interestOfEngineerAndMedicin); 


  //Generate the question to ai to answer
  let content : string = `These are my interest: ${interestString} and these are all available programs ${programString}. I want you to choose 5 programs that are based on my interest. It's important that they are relevent to my interest. You should only answer with the programID.`
  //let content: string = `These are my interest: ${interestString} and these are all available degrees ${programString}. Choose four of these degrees that matches my interest and then choose one wild card loosely based on the interests, make sure to mark your wildcard. Answer in bullet points with the exact interestTitles of the degrees, the bullet points should start with a dot and not numbers. Answer in swedish. You should answer in the format [Degree, ID = {number}]. Lastly end with a question asking the user if he/she think one of these degrees are interesting.`;
  //let content: string = `These are my interest: ${interestString} and these are all available programs one on each line: ${programString}. Choose four of these programs that matches my interest and then choose one wild card loosely based on the interests, (in total 5 program recommendations) make sure to put the wildcard last. Your answer should start by presenting the programId, followd by one sentence why you choose that degree. You must answer in swedish and write a new line after every degree. Lastly end with a new line and the question "Vill du veta mer om någon av dessa utbildingarna? - UniUGpt"`;

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
//test program for letting ai recommend program

const somePrograms: Program[] = [
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "48", //here
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Tandläkarprogrammet", //here
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "47", //here
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Tandhygienistprogrammet", //here
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "46", //here
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Sjuksköterskeprogrammet", //here
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "44", //here
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Röntgensjuksköterskeprogrammet", //here
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "43", //here
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Psykologprogrammet", //here
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "42", //here
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Optikerprogrammet", //here
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "38", //here
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Fysioterapeutprogrammet", //here
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "31", //here
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Teknisk matematik, civilingenjör", //here
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "30", //here
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Teknisk kemi, civilingenjör", //here
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "28", //here
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Teknik och ekonomi, högskoleingenjör", //here
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "1", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Arkitektutbildning", // Behövs
    programYears: "",
  },

  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "2", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Bioteknik, civilingenjör", // Behövs
    programYears: "",
  },

  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "3", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Byggteknik och design, högskoleingenjör", // Behövs
    programYears: "",
  },

  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "4", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Civilingenjör och lärare", // Behövs
    programYears: "",
  },

  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "5", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Datateknik, civilingenjör", // Behövs
    programYears: "",
  },

  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "8", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Design och produktframtagning, civilingenjör", // Behövs
    programYears: "",
  },

  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "9", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Elektronik och datorteknik, högskoleingenjör", // Behövs
    programYears: "",
  },

  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "12", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Energi och miljö, civilingenjör", // Behövs
    programYears: "",
  },

  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "13", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Farkostteknik, civilingenjör", // Behövs
    programYears: "",
  },

  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "14", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Fastighet och finans, kandidatutbildning", // Behövs
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "16", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Industriell ekonomi, civilingenjör", // Behövs
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "18", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Industriell teknik och hållbarhet, civilingenjör", // Behövs
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "20", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Informationsteknik, civilingenjör", // Behövs
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "21", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Kemiteknik, högskoleingenjör", // Behövs
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "22", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Maskinteknik, civilingenjör", // Behövs
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "23", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Materialdesign, civilingenjör", // Behövs
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "25", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Medicinsk teknik, civilingenjör", // Behövs
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "27", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Samhällsbyggnad, civilingenjör", // Behövs
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "29", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Teknisk fysik, civilingenjör", // Behövs
    programYears: "",
  },
  {
    programAiDescription_sv: "",
    programDegree_sv: "",
    programDescription_sv: "",
    programId: "34", // Behövs
    programLink: "",
    programPlace_sv: "",
    programPoints: "",
    programRequirements_sv: "",
    porgramTitle_sv: "Öppen ingång, civilingenjör", // Behövs
    programYears: "",
  },
];

const interestOfEngineerAndMedicin: Interest[] = [
  {
    interestTitle: "Teknik",
    interestId: "7",
    interestDescription: "",
  },
  {
    interestTitle: "Lärare",
    interestId: "7",
    interestDescription: "",
  },
  {
    interestTitle: "Medicin",
    interestId: "7",
    interestDescription: "",
  },
  {
    interestTitle: "Bilar",
    interestId: "7",
    interestDescription: "",
  },
  {
    interestTitle: "kemi",
    interestId: "7",
    interestDescription: "",
  },
  {
    interestTitle: "Biologi ",
    interestId: "7",
    interestDescription: "",
  },
  {
    interestTitle: "Matematik",
    interestId: "7",
    interestDescription: "",
  },
];
const interestOfEconomy: Interest[] = [
  {
    interestTitle: "Aktier",
    interestId: "7",
    interestDescription: "",
  },
  {
    interestTitle: "Ekonomi",
    interestId: "7",
    interestDescription: "",
  },
  {
    interestTitle: "Personal ansvar",
    interestId: "7",
    interestDescription: "",
  },
  {
    interestTitle: "fastigheter",
    interestId: "7",
    interestDescription: "",
  },
  {
    interestTitle: "Snygga hus",
    interestId: "7",
    interestDescription: "",
  },
  {
    interestTitle: "Gillar inte matematik",
    interestId: "7",
    interestDescription: "",
  },
  {
    interestTitle: "Redovisning",
    interestId: "7",
    interestDescription: "",
  },
];
