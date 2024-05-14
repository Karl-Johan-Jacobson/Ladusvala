import * as fs from "fs";

const filePath: string = "./programs.json";

export async function fetchAllProgramsJson(): Promise<void> {
	return new Promise((resolve, reject) => {
		// Reads JSON file
		fs.readFile(filePath, "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
			if (err) {
				reject(err);
				return;
			}

			try {
				const jsonArray = JSON.parse(data) as any[]; // Parse as array of any type
				const newJsonArray = jsonArray.map((item) => {
					// Add or manipulate properties here
					const newItem = { ...item }; // Create a new object to avoid modifying the original item
					newItem.degree = ""; // Initialize degree property

					// Check if programTitle_sv includes "kandidat" or "master" and update degree accordingly
					const titleRegex = /(kandidat|master)(program)?(met)?/gi;
					const match = titleRegex.exec(newItem.programTitle_sv);
					if (match) {
						newItem.degree = match[1]; // Fill degree with the matched word
					}

					// Store modified programTitle_sv without removing substrings
					const modifiedTitle_sv = newItem.programTitle_sv.replace(/kandidat(program)?(met)?/gi, "").replace(/master(program)?(met)?/gi, "");

					// Remove certain substrings from programDescription_sv
					newItem.programDescription_sv = newItem.programDescription_sv.replace(/kandidat(program)?(met)?/gi, "").replace(/master(program)?(met)?/gi, "");

					return { ...newItem, programTitle_sv: modifiedTitle_sv };
				});

				const newData = JSON.stringify(newJsonArray, null, 2); // Convert the new array to JSON string
				const newFilePath = "./modified_programs.json"; // Specify the new file path for the modified data
				// Write the modified data to a new file
				fs.writeFile(newFilePath, newData, "utf8", (err) => {
					if (err) {
						reject(err);
						return;
					}
					resolve();
				});
			} catch (error) {
				reject(error);
			}
		});
	});
}

// Example usage
fetchAllProgramsJson()
	.then(() => {
	})
	.catch((error) => {
		console.error("Error creating modified programs JSON file:", error);
	});
