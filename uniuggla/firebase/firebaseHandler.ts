// 3rd-party libraries
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import * as fs from "fs";
import { parse } from "csv-parse";
import * as dotenv from "dotenv"; // Import and config for .env file
import Interest from "../types/interest";
import Program from "../types/program";
dotenv.config();

// Firebase credentials
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Connect to firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Returns a list of all interests (and their fields)
export async function fetchAllInterests(): Promise<Interest[]>{
  try {
    const interestsRef = collection(db, "interestSelector"); // Reference to the interestSelector collection
    const interestSnapshot = await getDocs(interestsRef); // Query snapshot of the docs. in the collection
    const tempInterestList = interestSnapshot.docs.map((doc) => doc.data());

    return tempInterestList.map((temp) => {
      const interest: Interest = {
        interestId: temp.interestId,
        interestTitle: temp.interestTitle,
        interestDescription : temp.interestDescription,
      }
      return interest;
    })
  } catch (error) {
    console.error("Error fetching interests:", error);
    throw error;
  }
}

/*export async function fetchInterest(id: number): Promise<Interest>{
  try {
    const interestRef = db.collection("interestSelector").doc(""); // Reference to the interestSelector collection
    const interestSnapshot = await interestRef.get(); // Query snapshot of the docs. in the collection
    const tempInterestList = interestSnapshot.docs.map((doc) => doc.data());

    return tempInterestList.map((temp) => {
      const interest: Interest = {
        interestDescription : temp.interestDescription,
        interestId: temp.interestId,
        interestTitle: temp.interestTitle,
      }
      return interest;
    })
  } catch (error) {
    console.error("Error fetching interests:", error);
    throw error;
  }
}*/

/*----------------------------------For uploading data to the database-----------------------------------*/

export async function fetchAllPrograms(): Promise<Program[]>{
  try {

    const interestsRef = collection(db, "courseSelector"); // Reference to the interestSelector collection
    const interestSnapshot = await getDocs(interestsRef); // Query snapshot of the docs. in the collection

    const tempList = interestSnapshot.docs.map((doc) => doc.data());
    
    return tempList.map((temp) => {
      const program: Program = {
        programAiDescription_sv : temp.programAiDescription_sv,
        programDegree_sv: temp.programDegree_sv,
        programDescription_sv: temp.programDescription_sv,
        programId: temp.programId,
        programLink: temp.programLink,
        programPlace_sv: temp.programPlace_sv,
        programPoints: temp.programPoints,
        programRequirements_sv: temp.programRequirements_sv,
        porgramTitle_sv: temp.programTitle_sv,
        programYears: temp.programYears,
      }
      return program;
    })
  } catch (error) {
    console.error("Error fetching interests:", error);
    throw error;
  }
}
/*----------------------------------For uploading data to the database-----------------------------------*/
async function uploadData() {
  const test = "test";
  const interestsRef = query(
    collection(db, "interestSelector"),
    where("interestDescription", "==", "test")
  );
  const snapshot = await getDocs(interestsRef);
  const docToUpdate = snapshot.docs[0];
  console.log("SNAPSHOT.DOCS:" + snapshot.docs);

  const docRef = doc(db, "interestSelector", docToUpdate.id);

  await setDoc(docRef, { interestDescription: "test2" }, { merge: true });
  const interestList = snapshot.docs.map((doc) => doc.data());
}

// Functions to upload entries to interestSelector. Called by "readCVSAndUpload("file.cvs");"

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

// Parser object
const csvParser = parse({
  delimiter: ";",
});

// Read data from CSV file and upload to Firestore
function readCSVAndUploadInterest(filename: string): void {
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

// Functions to upload entries to courseSelector. Called by "readCVSAndUpload("file.cvs");"
async function uploadCourseToFirestore(
  programId: number,
  programUniversity_sv: string,
  programTitle_sv: string,
  programDescription_sv: string,
  programPoints: string,
  programYears: string,
  programRequirements_sv: string,
  programAiDescription_sv: string,
  programPlace_sv: string,
  programDegree_sv: string
): Promise<void> {
  try {
    // Get the current count of documents in the "interests" collection
    const interestsRef = collection(db, "courseSelector"); // Collection reference in interestsRef
    const snapshot = await getDocs(interestsRef); // Query snapshot of
    const interestId = ID++; // Increment the count by 1 for the new document

    // Create a new document with the provided data
    await setDoc(doc(interestsRef), {
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

    console.log("Document uploaded successfully.");
  } catch (error) {
    console.error("Error uploading document:", error);
  }
}

// Read data from CSV file and upload to Firestore
// Read data from CSV file and upload to Firestore
function readCSVAndUploadCourses(filename: string): void {
  fs.createReadStream(filename, { encoding: "utf-8" })
    .pipe(csvParser) // Remove .on({ separator: ';' })
    .on("data", (row: any) => {
      // Assuming CSV columns are "interestTitle" and "interestDescription"
      const [
        programId,
        programUniversity_sv,
        programTitle_sv,
        programDescription_sv,
        programPoints,
        programYears,
        programRequirements_sv,
        programAiDescription_sv,
        programPlace_sv,
        programDegree_sv,
      ] = row;
      uploadCourseToFirestore(
        programId,
        programUniversity_sv,
        programTitle_sv,
        programDescription_sv,
        programPoints,
        programYears,
        programRequirements_sv,
        programAiDescription_sv,
        programPlace_sv,
        programDegree_sv
      );
    })
    .on("end", () => {
      console.log("CSV file successfully processed.");
    })
    .on("error", (error: any) => {
      console.error("Error processing CSV file:", error);
    });
}
