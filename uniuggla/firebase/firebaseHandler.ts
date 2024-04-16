// Import the functions you need from the SDKs you need
import * as dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  DocumentReference,
  query,
  where,
  doc,
} from "firebase/firestore";


dotenv.config();
import * as fs from "fs";
//import csvParser from "csv-parser";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchInterests() {
  try {
    const interestsRef = collection(db, "interestSelector"); // Collection reference in interestsRef
    const interestSnapshot = await getDocs(interestsRef); // Query snapshot of
    const interestList = interestSnapshot.docs.map((doc) => doc.data()); // contains all fields of Docs under "interests" collection.

    console.log("Interests:", interestList);
  } catch (error) {
    console.error("Error fetching interests:", error);
    throw error;
  }
}
console.log(process.env.REACT_APP_API_KEY);
fetchInterests();


import { parse } from "csv-parse"; // Using parse instead of parser, works.
const csvParser = parse({
  delimiter: ";",
});
/*
async function uploadData(){
    const test = "test"
    const interestsRef = query(collection(db, "interests"), where("interestDescription","==","test"));
    const snapshot = await getDocs(interestsRef);
    const docToUpdate = snapshot.docs[0];
    console.log("SNAPSHOT.DOCS:"+snapshot.docs)

    const docRef = doc(db, "interests",docToUpdate.id); 

    await setDoc(docRef, {"interestDescription": "test2"}, {merge:true});
    const interestList = snapshot.docs.map(doc => doc.data())

}*/


/* Functions to upload entries to interestSelector. Called by "readCVSAndUpload("file.cvs");"
/*
var ID = 1;
async function uploadToFirestore(
  interestTitle: string,
  interestDescription: string
): Promise<void> {
  try {
    // Get the current count of documents in the "interests" collection
    const interestsRef = collection(db, "interestSelector"); // Collection reference in interestsRef
    const snapshot = await getDocs(interestsRef); // Query snapshot of
    const interestId = ID++; // Increment the count by 1 for the new document

    // Create a new document with the provided data
    await setDoc(doc(interestsRef), {
      interestTitle: interestTitle,
      interestDescription: interestDescription,
      interestId: interestId,
    });

    console.log("Document uploaded successfully.");
  } catch (error) {
    console.error("Error uploading document:", error);
  }
}

// Read data from CSV file and upload to Firestore
function readCSVAndUpload(filename: string): void {
  fs.createReadStream(filename, { encoding: "utf-8" })
    .pipe(csvParser) // Remove .on({ separator: ';' })
    .on("data", (row: any) => {
      const [interestTitle, interestDescription] = row;
      uploadToFirestore(interestTitle, interestDescription);
    })
    .on("end", () => {
      console.log("CSV file successfully processed.");
    })
    .on("error", (error: any) => {
      console.error("Error processing CSV file:", error);
    });
}
readCSVAndUpload("interests.csv");*/




//fetchInterests();
//uploadData();
/* Functions to upload entries to courseSelector. Called by "readCVSAndUpload("file.cvs");"
async function uploadToFirestore(programId: number, programUniversity_sv: string, programTitle_sv: string, programDescription_sv: string, programPoints: string, programYears: string, programRequirements_sv: string, programAiDescription_sv: string, programPlace_sv: string, programDegree_sv: string): Promise<void> {
    try {
      // Get the current count of documents in the "interests" collection
      const interestsRef = collection(db, "courseSelector"); // Collection reference in interestsRef
      const snapshot = await getDocs(interestsRef); // Query snapshot of 
      const interestId = ID++; // Increment the count by 1 for the new document
  
      // Create a new document with the provided data
      await setDoc(doc(interestsRef),{
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
      });
  
      console.log('Document uploaded successfully.');
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  }
  // Read data from CSV file and upload to Firestore
// Read data from CSV file and upload to Firestore
function readCSVAndUpload(filename: string): void {
    fs.createReadStream(filename, { encoding: 'utf-8' })
      .pipe(csvParser) // Remove .on({ separator: ';' })
      .on('data', (row: any) => {
        // Assuming CSV columns are "interestTitle" and "interestDescription"
        const [programId,programUniversity_sv, programTitle_sv,programDescription_sv,programPoints,programYears,programRequirements_sv,programAiDescription_sv,programPlace_sv,programDegree_sv] = row;
        uploadToFirestore(programId,programUniversity_sv,programTitle_sv,programDescription_sv,programPoints,programYears,programRequirements_sv,programAiDescription_sv,programPlace_sv,programDegree_sv);
      })
      .on('end', () => {
        console.log('CSV file successfully processed.');
      })
      .on('error', (error: any) => {
        console.error('Error processing CSV file:', error);
      });
  }
  */
