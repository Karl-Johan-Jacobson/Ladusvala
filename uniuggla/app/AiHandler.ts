import OpenAI from "openai";
import { ChatCompletionMessageParam, } from "openai/resources/index.mjs";

//import readLine from "readline"; //used for test from terminal cases. 


// DONT COMMIT THIS, THE API KEY







//Remeber to handle errors, for example "no choices available" -KJ
//When called user input should already been append to array
let messagesArray: ChatCompletionMessageParam[] = [
  {"role": "system", "content": "You are a helpful assistant."},
  {"role": "user", "content": "Who won the world series in 2020?"},
  {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
  {"role": "user", "content": "Where was it played?"}
];


//get answer from user. Can add a string as argument to get user input and append to 
//user's messageArray 
async function userAskAiAndGetAnswer(userMessagesArray: ChatCompletionMessageParam[]) {

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
  console.log(userMessagesArray)

  return userMessagesArray;
}



//Take in two arguments. Take selected interest and all programs
//Make an user call to chat gpt
async function recommendProgramFromInterest(){


}





//Test function for using the stream function. Not really usefull i think -KJ
/*
async function StreamAiAnswer() {
  const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messagesArray,
      stream: true,
      max_tokens: 200,
  });
  for await (const chunk of stream) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
  //console.log("test");
  return;
}


//Used for terminal input and output
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Test function to ask from terminal to AI and push to array. Used only in testing -KJ
async function askAndAppend()
{
  let question = "Vad är din fråga";

  rl.question(question, async (name) => {
    rl.close();
    messagesArray.push({"role": "user", "content": name});
    test = await testApiCall();
    messagesArray.push({"role": "assistant", "content": test.message.content});
    console.log(test);
    console.log(messagesArray);
    question = test.message.content;
    
  })
}
*/
