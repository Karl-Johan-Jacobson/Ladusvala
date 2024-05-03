import * as fs from "fs";

//const filePath: string = '@/uniuggla/webScrapers/manuelScraping.json';
const filePath: string = "manuelScraping.json";
// programDesciption name will be fixed when actual file is used.
type ProgramNameAndId = { programTitle_sv: string; programPoints: string; programDescription_sv: string; programLink: string };
async function fetchAllProgramsJson(): Promise<ProgramNameAndId[]> {
	return new Promise((resolve, reject) => {
		//Reads JSON file
		fs.readFile(filePath, "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
			if (err) {
				reject(err);
				return;
			}
			// let counter: number = 10001;
			try {
				const jsonArray = JSON.parse(data) as any[]; // Parse as array of any type
				const allPrograms: ProgramNameAndId[] = jsonArray.map((item) => ({
					programTitle_sv: item.programTitle_sv,
					programPoints: item.programPoints,
					programDescription_sv: item.programDescription_sv,
					programLink: item.programLink,
					// id: counter++ // This will be set through scrapers, will be present within programs.json. Assuming programId is a string and needs to be converted to a number
				}));
				console.log(allPrograms);
				return allPrograms; // can use resolve(allPrograms) if errors occur. -> is much slower
			} catch (parseError) {
				reject(parseError);
			}
		});
	});
}

async function testRet() {
	const test = await fetchAllProgramsJson();
	console.log(test);
}
testRet();
