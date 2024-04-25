"use server";
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
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
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
var fs_1 = require("fs");
var openai_1 = require("openai");
//IF YOU GET this error TS18028, just ignore. and run js file anyway -KJ
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
                    //DEBUG
                    //console.log(userMessagesArray);
                    return [2 /*return*/, userMessagesArray];
            }
        });
    });
}
//Take in one argument, the interests that user selected
//Function only used to turn type Interest to a string
function turnInterestToPrompt(selectedInterests) {
    var generatedString = "";
    for (var i = 0; i < selectedInterests.length; i++) {
        generatedString += "name: ".concat(selectedInterests[i].interestTitle, "\n");
    }
    return generatedString;
}
//Take in one argument, all the programs form database
//Function only used to turn type Program to a string
function turnProgramToPrompt(allPrograms) {
    var generatedString = "";
    for (var i = 0; i < allPrograms.length; i++) {
        //generatedString += `Degree: ${allPrograms[i].porgramTitle_sv}, ID = ${allPrograms[i].programId}\n`; //USED IN RELEASE
        generatedString += "Degree: ".concat(allPrograms[i].porgramTitle_sv, "\n");
    }
    return generatedString;
}
//This function will take the selected interests from user and call ai to
//get a recommendation, it returns the programID as an array.
//export default async function recommendProgramFromInterest(selectedInterests: Interest[]) this is the release version
function recommendProgramFromInterest() {
    return __awaiter(this, void 0, void 0, function () {
        var programString, interestString, content, questionToAi, completion, text, regex, stringNumber, numbers, stringNumber_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    programString = turnProgramToPrompt(somePrograms);
                    interestString = turnInterestToPrompt(interestOfEngineerAndMedicin);
                    content = "These are my interest: ".concat(interestString, " and these are all available degrees ").concat(programString, ". Choose four of these degrees that matches my interest and then choose one wild card loosely based on the interests, make sure to mark your wildcard. Your answer should first contain the exact degree name in capslock, followd by one sentence why you choose that degree. You must answer in swedish and write a new line after every degree. Lastly end with a new line  and the question \"Vill du veta mer om n\u00E5gon av dessa utbildingarna? - UniUGpt\"");
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
                case 1:
                    completion = _a.sent();
                    text = completion.choices[0].message.content;
                    regex = /\d+/g;
                    stringNumber = [];
                    numbers = text.match(regex);
                    //check if numbers is defined
                    if (numbers != undefined) {
                        stringNumber_1 = numbers.map(function (num) {
                            return num;
                        });
                    }
                    //DEBUG PURPOSE
                    console.log(completion.choices[0].message.content);
                    //console.log(numbers);
                    return [2 /*return*/, text];
            }
        });
    });
}
exports.default = recommendProgramFromInterest;
var filePath = '@/uniuggla/webScrapers/manuelScraping.json';
function fetchAllProgramsJson() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                fs_1.default.readFile(filePath, 'utf8', function (err, data) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    var counter = 10000;
                    try {
                        var jsonArray = JSON.parse(data); // Parse as array of any type
                        var allPrograms = jsonArray.map(function (item) {
                            return ({
                                programTitle_sv: item.programTitle_sv,
                                programPoints: item.programPoints,
                                programDescription_sv: item.programDescription_sv,
                                programLink: item.programLink,
                                id: counter++ // Assuming programId is a string and needs to be converted to a number
                            });
                        });
                        console.log(allPrograms);
                        resolve(allPrograms);
                    }
                    catch (parseError) {
                        reject(parseError);
                    }
                });
            })];
        });
    });
}
fetchAllProgramsJson();
//test program for letting ai recommend program
var somePrograms = [
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
var interestOfEngineerAndMedicin = [
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
var interestOfEconomy = [
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
