import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import type Interest from "../types/interest";
import * as dotenv from "dotenv";
import {
  fetchAllPrograms,
  fetchAllInterests,
} from "../firebase/firebaseHandler";
import type Program from "../types/program";
dotenv.config();

//IF YOU GET this error TS18028, just ignore. and run js file anyway -KJ

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
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
    generatedString += `name: ${selectedInterests[i].name}\n`;
  }

  return generatedString;
}

//Take in one argument, all the programs form database
//Function only used to turn type Program to a string

function turnProgramToPrompt(allPrograms: Program[]): string {
  let generatedString: string = "";

  for (let i = 0; i < allPrograms.length; i++) {
    generatedString += `Degree: ${allPrograms[i].porgramTitle_sv}, ID = ${allPrograms[i].programId}\n`;
  }

  return generatedString;
}

//This function will take the selected interests from user and call ai to
//get a recommendation, it returns the programID as an array.
//export default async function recommendProgramFromInterest(selectedInterests: Interest[]) this is the release version
export default async function recommendProgramFromInterest() {
  //turn interests to a string
  //const interestString: string = turnInterestToPrompt(selectedInterests); This must be uncomment for Release mode
  //fetch from database
  //const allPrograms: Program[] = await fetchAllPrograms(); This must be uncomment for Release mode
  //turn all programs to a string
  const programString: string = turnProgramToPrompt(somePrograms);
  const interestString: string = turnInterestToPrompt(interestOfEconomy);

  //Generate the question to ai to answer
  //let content: string = `These are my interest: ${interestString} and these are all available degrees ${programString}. Choose four of these degrees that matches my interest and then choose one wild card loosely based on the interests, make sure to mark your wildcard. Answer in bullet points with the exact names of the degrees, the bullet points should start with a dot and not numbers. Answer in swedish. You should answer in the format [Degree, ID = {number}]. Lastly end with a question asking the user if he/she think one of these degrees are interesting.`;
  let content: string = `These are my interest: ${interestString} and these are all available degrees ${programString}. Choose four of these degrees that matches my interest and then choose one wild card loosely based on the interests, make sure to mark your wildcard. Your answer should first contain the exact degree name in capslock, followd by one sentence why you choose that degree. You must answer in swedish`;

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
  // Use the exec method of the regex to find matches in the text
  const regex = /\d+/g;

  let stringNumber: string[] = [];
  // Extract numbers from the string
  const numbers = text.match(regex);

  //check if numbers is defined
  if (numbers != undefined) {
    //cast the number of type RegExpMatch to string
    const stringNumber: string[] = numbers.map((num) => {
      return num as string;
    });
  }

  //DEBUG PURPOSE
  console.log(completion.choices[0].message.content);
  //console.log(numbers);
  return text;
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
    name: "Teknik",
    id: 7,
    description: "",
  },
  {
    name: "Lärare",
    id: 7,
    description: "",
  },
  {
    name: "Medicin",
    id: 7,
    description: "",
  },
  {
    name: "Bilar",
    id: 7,
    description: "",
  },
  {
    name: "kemi",
    id: 7,
    description: "",
  },
  {
    name: "Biologi ",
    id: 7,
    description: "",
  },
  {
    name: "Matematik",
    id: 7,
    description: "",
  },
];
const interestOfEconomy: Interest[] = [
  {
    name: "Aktier",
    id: 7,
    description: "",
  },
  {
    name: "Ekonomi",
    id: 7,
    description: "",
  },
  {
    name: "Personal ansvar",
    id: 7,
    description: "",
  },
  {
    name: "fastigheter",
    id: 7,
    description: "",
  },
  {
    name: "Snygga hus",
    id: 7,
    description: "",
  },
  {
    name: "Gillar inte matematik",
    id: 7,
    description: "",
  },
  {
    name: "Redovisning",
    id: 7,
    description: "",
  },
];

//recommendProgramFromInterest();
