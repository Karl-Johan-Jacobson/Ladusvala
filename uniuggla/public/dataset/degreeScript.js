import fs from "fs";

// Path to your JSON file
const filePath = "./programs_safe.json";

const transform = {
	logoped: "Logoped",
	lärar: "Lärar",
	läkar: "Läkar",
	kandidat: "Kandidat",
	ämneslärar: "Lärar",
	yrkeslärarutbildning: "Yrkeslärar",
	yrkeslärarprogrammet: "Yrkeslärar",
	psykolog: "Psykolog",
	socionom: "Kandidat",
	audionom: "Audionom",
	biomedicin: "Kandidat",
	civilingenjör: "Civilingenjörs",
	högskoleingenjör: "Högskoleingenjörs",
	arbetsterapeut: "Arbetsterapeut",
	fysioterapeut: "Fysioterapeut",
	röntgensjuksköterska: "Röntgensjuksköterske",
	jurist: "Jurist",
	arkitekt: "Arkitekt",
	civilekonom: "Civilekonom",
	högskoleexamen: "Högskole",
	tandhygienist: "Tandhygienist",
	tandläkar: "Tandläkar",
	sjöingenjör: "Sjöingenjör",
	sjökapten: "Sjökapten",
	vetarprogrammet: "Kandidat",
	sjuksköterske: "Sjuksköterske",
	sjukhusfysiker: "Master",
	sjukhusfysikerprogrammet: "Sjukhusfysiker",
};
const noDegree = {
  saknar: null,
  obehörig: null
}

function addDegree(items, transform) {
	return items.map((item) => {
		let degree = null;
		for (const keyword in transform) {
			if (item.programTitle_sv && item.programTitle_sv.toLowerCase().includes(keyword.toLowerCase())) {
				if (degree === null) {
					degree = transform[keyword];
				} else {
					degree += ", " + transform[keyword];
				}
				break;
			}
		}
		for (const keyword in transform) {
			if (item.programDescription_sv && item.programDescription_sv.toLowerCase().includes(keyword.toLowerCase())) {
				if (degree === null) {
					degree = transform[keyword];
				} else {
					degree += ", " + transform[keyword];
				}
				break;
			}
		}
		if (degree === null && item.programPoints === "180") {
			degree = "Kandidat";
		}
		if (degree === null && item.programPoints === "120") {
			degree = "Kandidat";
		}
    for (const keyword in noDegree) {
      if (item.programTitle_sv && item.programTitle_sv.toLowerCase().includes(keyword.toLowerCase())) {
        degree = null;
      }
    }
		// Rename programDescription_sv to programDescription_sv
		const { programDescription_sv, ...rest } = item;
		return {
			programTitle_sv: rest.programTitle_sv,
			programPoints: rest.programPoints,
			programDescription_sv: programDescription_sv,
			programLink: rest.programLink,
			schoolName: rest.schoolName,
			programId: rest.programId,
			aiPrompt: rest.aiPrompt,
			degree: degree,
		};
	});
}

// Read the JSON file, process the data, and write it back to a new file
fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	let programs = JSON.parse(data);
	const updatedPrograms = addDegree(programs, transform);
	const outputPath = "./programs_safe_updated.json";

	fs.writeFile(outputPath, JSON.stringify(updatedPrograms, null, 2), "utf8", (writeErr) => {
		if (writeErr) {
			console.error("Error writing to output file:", writeErr);
			return;
		}
		console.log(`Updated programs with degree information written to file: ${outputPath}`);
	});
});
