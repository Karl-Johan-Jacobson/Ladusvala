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
  apiKey: process.env.OPENAI_API_KEY,
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
async function recommendProgramFromInterest(selectedInterests: Interest[]) {

  //turn interests to a string
  const interestString: string = turnInterestToPrompt(selectedInterests);

  //fetch from database
  const allPrograms: Program[] = await fetchAllPrograms();
  //turn all programs to a string
  const programString: string = turnProgramToPrompt(allPrograms);

  //Generate the question to ai to answer
  let content: string = `These are my interest: ${interestString} and these are all available degrees ${programString}. Choose four of these degrees that matches my interest and then choose one wild card loosely based on the interests, make sure to mark your wildcard. Answer in bullet points with the exact names of the degrees, the bullet points should start with a dot and not numbers. Answer in swedish. You should answer in the format [Degree, ID = {number}]. Lastly end with a question asking the user if he/she think one of these degrees are interesting.`;

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
  if(numbers != undefined)
    {
      //cast the number of type RegExpMatch to string 
      const stringNumber : string[] = numbers.map((num) => {
        return num as string;
      })
    }
  
  //DEBUG PURPOSE
  //console.log(completion.choices[0].message.content);
  //console.log(numbers);
  return stringNumber;
}

//test program for letting ai recommend program


/*

const test: Interest[] = [
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
    name: "Datorspel",
    id: 7,
    description: "",
  }
];

recommendProgramFromInterest(test);

*/