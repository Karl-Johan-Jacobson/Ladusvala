//import {recommendProgramFromInterest} from "@/ai/AiHandler";
import { fetchAllProgramsJson, ProgramNameAndId } from "@/ai/AiHandler";
import recommendProgramFromInterest from "@/ai/AiHandler";
import { useRouter } from "next/router";

export function addClass(newClass: string, htmlClass: string): void {
	var elements = document.querySelectorAll("." + htmlClass);
	elements.forEach(function (element) {
		(element as HTMLElement).classList.add(newClass);
	});
}

export function removeClass(oldClass: string, htmlClass: string): void {
	var elements = document.querySelectorAll("." + htmlClass);
	elements.forEach(function (element) {
		(element as HTMLElement).classList.remove(oldClass);
	});
}

export function modifyOverflow(Atribute: string, htmlClass: string): void {
	var elements = document.querySelectorAll("." + htmlClass);
	elements.forEach(function (element) {
		(element as HTMLElement).style.overflow = Atribute;
	});
}

export function scrollToId(id: string): void {
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView();
	} else {
		console.error(`Element with ID '${id}' not found.`);
	}
}

export async function fetchJsonTurnItToProgram() {}

export function aiTypeAnswer(programs: ProgramNameAndId[], htmlClass: string): void {
	const container = document.querySelector("." + htmlClass);

	if (!container) {
		console.error(`Container element with class '${htmlClass}' not found.`);
		return;
	}
	for (let i = 0; i < programs.length; i++) {
		const program = programs[i];
		const recommendedBox = document.createElement("div");
		recommendedBox.className = "recommendedBox";

		const recommendedHead = document.createElement("div");
		recommendedHead.className = "recommendedHead";
		recommendedBox.appendChild(recommendedHead);

		const title = document.createElement("p");
		title.className = "tilteReq";
		title.textContent = program.programTitle_sv;
		recommendedHead.appendChild(title);

		const school = document.createElement("p");
		school.className = "schoolReq descriptionReq";
		//school.textContent = program.school;
		school.textContent = "LÄROSÄTE: " + "Kungliga Tekniska Högskolan";
		recommendedHead.appendChild(school);

		const degree = document.createElement("p");
		degree.className = "degreeReq descriptionReq";
		//degree.textContent = program.;
		degree.textContent = "EXAMEN: " + "Civilingenjör, Kandidat, Master";
		recommendedHead.appendChild(degree);

		const points = document.createElement("p");
		points.className = "pointsReq descriptionReq";
		points.textContent = program.programPoints + " HP";
		recommendedHead.appendChild(points);

		const years = document.createElement("p");
		years.className = "yearsReq descriptionReq";

		const numberOfYears: string = ((program.programPoints as unknown as number) / 60) as unknown as string;
		years.textContent = numberOfYears + " ÅR";
		recommendedHead.appendChild(years);

		const button = document.createElement("button");
		button.addEventListener("click", () => {
			const element = document.querySelector(`.recommendedDescription${i}`);
			const buttonText = button.children[1];
			console.log(buttonText);
			if (element.classList.contains("hide") && buttonText) {
				removeClass("hide", `recommendedDescription${i}`);
				removeClass("expandArrow", `arrow${i}`);
				addClass("contractArrow", `arrow${i}`);
				buttonText.textContent = "Visa mindre";
			} else {
				addClass("hide", `recommendedDescription${i}`);
				removeClass("contractArrow", `arrow${i}`);
				addClass("expandArrow", `arrow${i}`);
				buttonText.textContent = "Visa mer";
			}
		});
		button.className = "showDescription";
		recommendedHead.appendChild(button);

		const expandArrow = document.createElement("img");
		expandArrow.className = `arrow${i} expandArrow`;
		expandArrow.src = "../../arrow.svg";
		expandArrow.alt = "";
		button.appendChild(expandArrow);

		const buttonText = document.createElement("p");
		buttonText.textContent = "Visa mer";
		button.appendChild(buttonText);

		const recommendedDescription = document.createElement("div");
		recommendedDescription.className = `recommendedDescription recommendedDescription${i} hide`;
		recommendedDescription.textContent = program.programDesciption_sv;
		recommendedBox.appendChild(recommendedDescription);

		var elementToRemove = container.querySelector(".aiAnswer");
		if (elementToRemove && elementToRemove.parentNode) {
			elementToRemove.parentNode.removeChild(elementToRemove);
		}

		container.appendChild(recommendedBox);
	}
}

export function handleYesButtonClick(): void {
	modifyOverflow("visible", "main");
	removeClass("hide", "interestContainer");
	scrollToId("interestContainer");
	setTimeout(() => {
		addClass("hide", "welcomeContainer");
		modifyOverflow("hidden", "main");
	}, 500);
}

export async function aiResponse(interests: string): Promise<void> {
	const aiAnswer: string[] = await recommendProgramFromInterest(interests);
	const allPrograms: ProgramNameAndId[] = await fetchAllProgramsJson();

	const aiAnswerAsNumber: number[] = aiAnswer.map((item) => {
		return item as unknown as number;
	});
	var selectedPrograms: ProgramNameAndId[] = [];

	for (var i = 0, n = 0; i < allPrograms.length; i++) {
		for (var j = 0; j < aiAnswerAsNumber.length; j++) {
			if (allPrograms[i].programId == aiAnswerAsNumber[j]) {
				console.log(allPrograms[i].programTitle_sv);
				selectedPrograms[n++] = allPrograms[i];
			}
		}
	}

	aiTypeAnswer(selectedPrograms, "recommendedWrapper");

	//USED for testing

	/*
	for(var i = 0; i < programs.length; i++)
		{
			for(var j = 0; j < aiAnswerAsNumber.length; j++)
				{
					if(programs[i].programId == aiAnswerAsNumber[j])
						{
							console.log(programs[i].programTitle_sv)
						}

				}
		}
		*/
	//Turn the programs to recommendedBoxes
}

export async function handleRecommendationButtonClick(interestArr: string[]): Promise<void> {
	var interests: string = "";
	interestArr.map((item) => {
		interests += "interest: " + item + "\n";
	});
	console.log(interests);
	aiResponse(interests);

	modifyOverflow("visible", "main");
	removeClass("hide", "recommendationContainer");
	scrollToId("recommendationContainer");
	setTimeout(() => {
		addClass("hide", "interestContainer");
		modifyOverflow("hidden", "main");
	}, 500);
}

export const modifyTopPadding = (newTopPadding: string, htmlClass: string) => {
	var elements = document.querySelectorAll("." + htmlClass);
	elements.forEach(function (element) {
		(element as HTMLElement).style.paddingTop = newTopPadding;
	});
};

export const modifyTopPaddingRelative = (relativePaddingtop: string, htmlClass: string) => {
	var elements = document.querySelectorAll("." + htmlClass);
	elements.forEach(function (element) {
		var currentPaddingTop = window.getComputedStyle(element).paddingTop;
		var newPaddingTop = "calc(" + currentPaddingTop + " + " + relativePaddingtop + ")";
		(element as HTMLElement).style.paddingTop = newPaddingTop;
	});
};
