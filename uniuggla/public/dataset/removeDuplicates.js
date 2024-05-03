const fs = require("fs");

// Path to your JSON file
const filePath = "./programs.json";
let id = 0;
// Read the JSON file
fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	// Parse the JSON data
	let programs = JSON.parse(data);

	// Use a Map to track occurrences of programLinks
	const occurrenceMap = new Map();
	programs.forEach((program) => {
		if (occurrenceMap.has(program.programLink)) {
			let count = occurrenceMap.get(program.programLink);
			occurrenceMap.set(program.programLink, count + 1);
		} else {
			occurrenceMap.set(program.programLink, 1);
		}
	});

	// Filter out duplicates and gather them
	const filteredPrograms = programs.filter((program) => {
		if (occurrenceMap.get(program.programLink) > 1) {
			// Decrease count each time a duplicate is added
			occurrenceMap.set(program.programLink, occurrenceMap.get(program.programLink) - 1);
			return false; // Filter out duplicates
		}
		return true; // Keep non-duplicates
	});

	// Add "aiPrompt": "" to every JSON entry
	const filteredProgramsWithAiPrompt = filteredPrograms.map((program) => ({
		...program,
		aiPrompt: "",
		programId: id++, // Increment ID while writing to new file.
	}));

	// Write the filtered programs to a new JSON file
	const filteredFilePath = "./filtered_programs.json";
	fs.writeFile(filteredFilePath, JSON.stringify(filteredProgramsWithAiPrompt, null, 2), (err) => {
		if (err) {
			console.error("Error writing filtered file:", err);
			return;
		}
		console.log("Filtered programs have been written to", filteredFilePath);
	});
});
