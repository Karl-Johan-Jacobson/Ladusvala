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
exports.fetchAllPrograms = exports.fetchAllInterests = void 0;
// 3rd-party libraries
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var fs = require("fs");
var csv_parse_1 = require("csv-parse");
var dotenv = require("dotenv"); // Import and config for .env file
dotenv.config();
// Firebase credentials
var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Connect to firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
var db = (0, firestore_1.getFirestore)(app);
// Returns a list of all interests (and their fields)
function fetchAllInterests() {
    return __awaiter(this, void 0, void 0, function () {
        var interestsRef, interestSnapshot, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    interestsRef = (0, firestore_1.collection)(db, "interestSelector");
                    return [4 /*yield*/, (0, firestore_1.getDocs)(interestsRef)];
                case 1:
                    interestSnapshot = _a.sent();
                    return [2 /*return*/, interestSnapshot.docs.map(function (doc) { return doc.data(); })]; // List of all docs. with their data (fields)
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching interests:", error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.fetchAllInterests = fetchAllInterests;
function fetchAllPrograms() {
    return __awaiter(this, void 0, void 0, function () {
        var interestsRef, interestSnapshot, tempList, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    interestsRef = (0, firestore_1.collection)(db, "courseSelector");
                    return [4 /*yield*/, (0, firestore_1.getDocs)(interestsRef)];
                case 1:
                    interestSnapshot = _a.sent();
                    tempList = interestSnapshot.docs.map(function (doc) { return doc.data(); });
                    return [2 /*return*/, tempList.map(function (temp) {
                            var program = {
                                programAiDescription_sv: temp.programAiDescription_sv,
                                programDegree_sv: temp.programDegree_sv,
                                programDescription_sv: temp.programDescription_sv,
                                programId: temp.programId,
                                programLink: temp.programLink,
                                programPlace_sv: temp.programPlace_sv,
                                programPoints: temp.programPoints,
                                programRequirements_sv: temp.programRequirements_sv,
                                porgramTitle_sv: temp.programTitle_sv,
                                programYears: temp.programYears,
                            };
                            return program;
                        })];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error fetching interests:", error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.fetchAllPrograms = fetchAllPrograms;
/*----------------------------------For uploading data to the database-----------------------------------*/
function uploadData() {
    return __awaiter(this, void 0, void 0, function () {
        var test, interestsRef, snapshot, docToUpdate, docRef, interestList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    test = "test";
                    interestsRef = (0, firestore_1.query)((0, firestore_1.collection)(db, "interestSelector"), (0, firestore_1.where)("interestDescription", "==", "test"));
                    return [4 /*yield*/, (0, firestore_1.getDocs)(interestsRef)];
                case 1:
                    snapshot = _a.sent();
                    docToUpdate = snapshot.docs[0];
                    console.log("SNAPSHOT.DOCS:" + snapshot.docs);
                    docRef = (0, firestore_1.doc)(db, "interestSelector", docToUpdate.id);
                    return [4 /*yield*/, (0, firestore_1.setDoc)(docRef, { interestDescription: "test2" }, { merge: true })];
                case 2:
                    _a.sent();
                    interestList = snapshot.docs.map(function (doc) { return doc.data(); });
                    return [2 /*return*/];
            }
        });
    });
}
// Functions to upload entries to interestSelector. Called by "readCVSAndUpload("file.cvs");"
var ID = 1;
function uploadToFirestore(interestTitle, interestDescription) {
    return __awaiter(this, void 0, void 0, function () {
        var interestsRef, snapshot, interestId, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    interestsRef = (0, firestore_1.collection)(db, "interestSelector");
                    return [4 /*yield*/, (0, firestore_1.getDocs)(interestsRef)];
                case 1:
                    snapshot = _a.sent();
                    interestId = ID++;
                    // Create a new document with the provided data
                    return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(interestsRef), {
                            interestTitle: interestTitle,
                            interestDescription: interestDescription,
                            interestId: interestId,
                        })];
                case 2:
                    // Create a new document with the provided data
                    _a.sent();
                    console.log("Document uploaded successfully.");
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error uploading document:", error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Parser object
var csvParser = (0, csv_parse_1.parse)({
    delimiter: ";",
});
// Read data from CSV file and upload to Firestore
function readCSVAndUploadInterest(filename) {
    fs.createReadStream(filename, { encoding: "utf-8" })
        .pipe(csvParser) // Remove .on({ separator: ';' })
        .on("data", function (row) {
        var interestTitle = row[0], interestDescription = row[1];
        uploadToFirestore(interestTitle, interestDescription);
    })
        .on("end", function () {
        console.log("CSV file successfully processed.");
    })
        .on("error", function (error) {
        console.error("Error processing CSV file:", error);
    });
}
// Functions to upload entries to courseSelector. Called by "readCVSAndUpload("file.cvs");"
function uploadCourseToFirestore(programId, programUniversity_sv, programTitle_sv, programDescription_sv, programPoints, programYears, programRequirements_sv, programAiDescription_sv, programPlace_sv, programDegree_sv) {
    return __awaiter(this, void 0, void 0, function () {
        var interestsRef, snapshot, interestId, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    interestsRef = (0, firestore_1.collection)(db, "courseSelector");
                    return [4 /*yield*/, (0, firestore_1.getDocs)(interestsRef)];
                case 1:
                    snapshot = _a.sent();
                    interestId = ID++;
                    // Create a new document with the provided data
                    return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(interestsRef), {
                            programUniversity_sv: programUniversity_sv,
                            programTitle_sv: programTitle_sv,
                            programDescription_sv: programDescription_sv,
                            programPoints: programPoints,
                            programYears: programYears,
                            programRequirements_sv: programRequirements_sv,
                            programAiDescription_sv: programAiDescription_sv,
                            programPlace_sv: programPlace_sv,
                            programDegree_sv: programDegree_sv,
                            programId: programId,
                        })];
                case 2:
                    // Create a new document with the provided data
                    _a.sent();
                    console.log("Document uploaded successfully.");
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error("Error uploading document:", error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Read data from CSV file and upload to Firestore
// Read data from CSV file and upload to Firestore
function readCSVAndUploadCourses(filename) {
    fs.createReadStream(filename, { encoding: "utf-8" })
        .pipe(csvParser) // Remove .on({ separator: ';' })
        .on("data", function (row) {
        // Assuming CSV columns are "interestTitle" and "interestDescription"
        var programId = row[0], programUniversity_sv = row[1], programTitle_sv = row[2], programDescription_sv = row[3], programPoints = row[4], programYears = row[5], programRequirements_sv = row[6], programAiDescription_sv = row[7], programPlace_sv = row[8], programDegree_sv = row[9];
        uploadCourseToFirestore(programId, programUniversity_sv, programTitle_sv, programDescription_sv, programPoints, programYears, programRequirements_sv, programAiDescription_sv, programPlace_sv, programDegree_sv);
    })
        .on("end", function () {
        console.log("CSV file successfully processed.");
    })
        .on("error", function (error) {
        console.error("Error processing CSV file:", error);
    });
}
