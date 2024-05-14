import Program from "@/types/program";
import programsJson from "@/public/dataset/programs.json"

export function shuffleArray<T>(array: T[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

export function getProgramFromId(programId: number, selectedPrograms: Program[]): Program {
	const program: Program[] = selectedPrograms.filter((program) => programId === program.programId)

	if (program) {
		return program[0];
	}
	throw Error("No program found with id: " + programId)
}

//get programs based on the id numbers sent int
export function getProgramsFromId(idNumber: number[], allPrograms: Program[]): Program[] {
	return allPrograms.filter((program) => {
		return idNumber.includes(program.programId);
	});
}

// Turns all the interests into a prompt for the ai
export function turnInterestToPrompt(interests: string[]): string {
	return interests.reduce((result, interest, index) => {
		return result + "intressen " + index + ": " + interest + "\n";
	}, "");
}

// Turns all the programs into a prompt for the ai
export function turnProgramToPrompt(programs: Program[]): string {
	return programs.reduce((accumulator, program) => {
		return accumulator + `{program beskrivning: ${program.aiPrompt}, ProgramId: ${program.programId}},\n`;
	}, "");
}

export function fetchAllProgramsJson(): Program[] {
  return programsJson.map((item) => ({
    programId: item.programId,
    programTitle_sv: item.programTitle_sv,
    programPoints: item.programPoints,
    programDescription_sv: item.programDescription_sv,
    programLink: item.programLink,
    schoolName: item.schoolName,
    aiPrompt: item.aiPrompt,
    degree: item.degree !== null && item.degree !== undefined ? item.degree : "",
  }));
}

