"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var openai_1 = require("openai");
var dotenv = require("dotenv");
var firebaseHandler_1 = require("../firebase/firebaseHandler");
dotenv.config();
var openai = new openai_1.default({
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
function userAskAiAndGetAnswer(userMessagesArray //the type is OPENAI's own type. Must be used
) {
    return __awaiter(this, void 0, void 0, function () {
        var completion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, openai.chat.completions.create({
                        messages: userMessagesArray,
                        model: "gpt-3.5-turbo",
                        max_tokens: 400, //can change, used in testing for token minimization
                    })];
                case 1:
                    completion = _a.sent();
                    //Append what the ai answered.
                    userMessagesArray.push({
                        role: "assistant",
                        content: completion.choices[0].message.content,
                    });
                    console.log(userMessagesArray);
                    return [2 /*return*/, userMessagesArray];
            }
        });
    });
}
//userAskAiAndGetAnswer(messagesArray);
//Take in two arguments. Take selected interest and all programs
//Make an user call to chat gpt
function turnInterestToPrompt(selectedInterests) {
    var generatedString = "";
    for (var i = 0; i < selectedInterests.length; i++) {
        generatedString += "name: ".concat(selectedInterests[i].name, "\n");
    }
    return generatedString;
}
function turnProgramToPrompt(allPrograms) {
    var generatedString = "";
    for (var i = 0; i < allPrograms.length; i++) {
        generatedString += "Degree: ".concat(allPrograms[i].programDegree_sv, ", ID = ").concat(allPrograms[i].programId, "\n");
    }
    return generatedString;
}
function recommendProgramFromInterest(selectedInterests) {
    return __awaiter(this, void 0, void 0, function () {
        var interestString, allPrograms, programString, content, questionToAi, completion, text, regex, numbers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    interestString = turnInterestToPrompt(selectedInterests);
                    return [4 /*yield*/, (0, firebaseHandler_1.fetchAllPrograms)()];
                case 1:
                    allPrograms = _a.sent();
                    programString = turnProgramToPrompt(allPrograms);
                    content = "These are my interest: ".concat(interestString, " and these are all available degrees ").concat(programString, ". Choose three of these degrees that matches my interest. Answer in bullet points with the exact names of the degrees, the bullet points should start with a dot and not numbers. Answer in swedish. You should answer in the format [Degree, ID = {number}]. Lastly end with a question asking the user if he/she think one of these degrees are interesting.");
                    questionToAi = {
                        role: "user",
                        content: content,
                    };
                    return [4 /*yield*/, openai.chat.completions.create({
                            messages: [
                                { role: "system", content: "You are student counselor." },
                                questionToAi,
                            ],
                            model: "gpt-3.5-turbo",
                        })];
                case 2:
                    completion = _a.sent();
                    text = completion.choices[0].message.content;
                    regex = /\d+/g;
                    numbers = text.match(regex);
                    //DEBUG PURPOSE
                    //console.log(completion.choices[0].message.content);
                    //console.log(numbers);
                    return [2 /*return*/, numbers];
            }
        });
    });
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
    description: "Gillar pengar",
  },
  {
    name: "Medicin",
    id: 7,
    description: "Gillar att räkna pengar",
  }
];
recommendProgramFromInterest(test);
*/
