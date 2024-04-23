//imports interest list fronm database
import { InterestList } from "@/components/client/Interest";
//import { fetchAllInterests } from "@/firebase/firebaseHandler"

export default async function InterestsPage() {
	//const interests = await fetchAllInterests()
	const interests = [
		{ interestTitle: "Teknik", interestId: "1", interestDescription: "" },
		{ interestTitle: "Lärare", interestId: "2", interestDescription: "" },
		{ interestTitle: "Medicin", interestId: "3", interestDescription: "" },
		{ interestTitle: "Bilar", interestId: "4", interestDescription: "" },
		{ interestTitle: "Kemi", interestId: "5", interestDescription: "" },
		{ interestTitle: "Biologi", interestId: "6", interestDescription: "" },
		{ interestTitle: "Matematik", interestId: "7", interestDescription: "" },
		{ interestTitle: "Aktier", interestId: "8", interestDescription: "" },
		{ interestTitle: "Ekonomi", interestId: "9", interestDescription: "" },
		{ interestTitle: "Personal ansvar", interestId: "10", interestDescription: "" },
		{ interestTitle: "Fastigheter", interestId: "11", interestDescription: "" },
		{ interestTitle: "Snygga hus", interestId: "12", interestDescription: "" },
		{ interestTitle: "Gillar inte matematik", interestId: "13", interestDescription: "" },
		{ interestTitle: "Redovisning", interestId: "14", interestDescription: "" },
		{ interestTitle: "Dataanalys", interestId: "15", interestDescription: "" },
		{ interestTitle: "Spelutveckling", interestId: "16", interestDescription: "" },
		{ interestTitle: "Forskning", interestId: "17", interestDescription: "" },
		{ interestTitle: "Mjukvaruutveckling", interestId: "18", interestDescription: "" },
		{ interestTitle: "Gym", interestId: "19", interestDescription: "" },
		{ interestTitle: "Resor", interestId: "20", interestDescription: "" },
		{ interestTitle: "Språk", interestId: "21", interestDescription: "" },
		{ interestTitle: "Design", interestId: "22", interestDescription: "" },
		{ interestTitle: "Musik", interestId: "23", interestDescription: "" },
		{ interestTitle: "Måla", interestId: "24", interestDescription: "" },
		{ interestTitle: "Djur", interestId: "25", interestDescription: "" },
		{ interestTitle: "Trädgård", interestId: "26", interestDescription: "" },
		{ interestTitle: "Yoga", interestId: "27", interestDescription: "" },
		{ interestTitle: "Filosofi", interestId: "28", interestDescription: "" },
		{ interestTitle: "Film", interestId: "29", interestDescription: "" },
		{ interestTitle: "Foto", interestId: "30", interestDescription: "" },
		{ interestTitle: "Kaffe", interestId: "31", interestDescription: "" },
		{ interestTitle: "Te", interestId: "32", interestDescription: "" },
		{ interestTitle: "Skidåkning", interestId: "33", interestDescription: "" },
		{ interestTitle: "Klättring", interestId: "34", interestDescription: "" },
		{ interestTitle: "Cykling", interestId: "35", interestDescription: "" },
		{ interestTitle: "Simning", interestId: "36", interestDescription: "" },
		{ interestTitle: "Segling", interestId: "37", interestDescription: "" },
		{ interestTitle: "Dykning", interestId: "38", interestDescription: "" },
		{ interestTitle: "Kampsport", interestId: "39", interestDescription: "" },
		{ interestTitle: "Skateboarding", interestId: "40", interestDescription: "" },
		{ interestTitle: "Spela instrument", interestId: "41", interestDescription: "" },
		{ interestTitle: "Kocka", interestId: "42", interestDescription: "" },
		{ interestTitle: "Bakning", interestId: "43", interestDescription: "" },
		{ interestTitle: "Vin", interestId: "44", interestDescription: "" },
		{ interestTitle: "Whisky", interestId: "45", interestDescription: "" },
		{ interestTitle: "Öl", interestId: "46", interestDescription: "" },
		{ interestTitle: "Vinylskivor", interestId: "47", interestDescription: "" },
		{ interestTitle: "Vintage", interestId: "48", interestDescription: "" },
		{ interestTitle: "Antikviteter", interestId: "49", interestDescription: "" },
		{ interestTitle: "Smycken", interestId: "50", interestDescription: "" },
	];

	return (
		<>
			<InterestList interest={interests} />
		</>
	);
}
