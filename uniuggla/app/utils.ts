//import {recommendProgramFromInterest} from "@/ai/AiHandler";
import { fetchAllProgramsJson, ProgramNameAndId } from "@/ai/AiHandler";
import recommendProgramFromInterest from "@/ai/AiHandler";
import { TypewriterForTitle } from "@/components/client/TypeWriter";
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

export function aiTypeAnswer(programs: ProgramNameAndId[], htmlClass: string): void {

	//create a contianer where every box will be in
	const container = document.querySelector("." + htmlClass);
	//null check
	if (!container) {
		console.error(`Container element with class '${htmlClass}' not found.`);
		return;
	}
	//loop to make one box at a time
	for (let i = 0; i < programs.length; i++) {
		//take one program from selected programs array
		const program = programs[i];
		//create a div to wrap everything
		const recommendedBox = document.createElement("div");
		recommendedBox.className = `recommendedBox recommendedBox${i}`;
		container.appendChild(recommendedBox);
		//create a head
		const recommendedHead = document.createElement("div");
		recommendedHead.className = "recommendedHead";
		recommendedBox.appendChild(recommendedHead);
		//create a p element to write title
		const title = document.createElement("p");
		title.className = "tilteReq";
		title.textContent = program.programTitle_sv;
		recommendedHead.appendChild(title);
		//create a p element to write school
		const school = document.createElement("p");
		school.className = "schoolReq descriptionReq";
		//school.textContent = program.school;
		school.textContent = "LÄROSÄTE: " + "Kungliga Tekniska Högskolan";
		recommendedHead.appendChild(school);
		//create a p elemnt to write degree in 
		const degree = document.createElement("p");
		degree.className = "degreeReq descriptionReq";
		//degree.textContent = program.;
		degree.textContent = "EXAMEN: " + "Civilingenjör, Kandidat, Master";
		recommendedHead.appendChild(degree);
		//create a ...
		const points = document.createElement("p");
		points.className = "pointsReq descriptionReq";
		points.textContent = program.programPoints + " HP";
		recommendedHead.appendChild(points);
		//create a ...
		const years = document.createElement("p");
		years.className = "yearsReq descriptionReq";
		//to display year it had to be casted to a number to make division possible and then to string again, (shit code, but it works)
		const numberOfYears: string = ((program.programPoints as unknown as number) / 60) as unknown as string;
		years.textContent = numberOfYears + " ÅR";
		recommendedHead.appendChild(years);
		//create the div for the show more info
		const reqDescriptionBox = document.createElement("div");	
		reqDescriptionBox.className = `reqDescriptionBox reqDescriptionBox${i} hide`;
		recommendedBox.appendChild(reqDescriptionBox);
		//create the link
		const reqDescriptionLink = document.createElement("a");
		reqDescriptionLink.className = ` reqDescription reqDescriptionLink reqDescriptionLink${i}`;
		reqDescriptionLink.textContent = "Till programmets hemsida";
		reqDescriptionLink.target = "_blank";
		reqDescriptionLink.href = program.programLink;

		reqDescriptionBox.appendChild(reqDescriptionLink);

		//create a p ...
		const reqDescriptionTitle = document.createElement("p");
		reqDescriptionTitle.className = `reqDescription reqDescriptionTitle reqDescriptionTitle${i}`;
		reqDescriptionTitle.textContent = "Programbeskrivning:";
		reqDescriptionBox.appendChild(reqDescriptionTitle);
		//create a ...
		const reqDescriptionDescription = document.createElement("p");
		reqDescriptionDescription.className = `reqDescriptionDescription reqDescriptionDescription${i}`;
		reqDescriptionDescription.textContent = program.programDesciption_sv;
		reqDescriptionBox.appendChild(reqDescriptionDescription);
		
		const recommendedFoot = document.createElement("div");
		recommendedFoot.className = `recommendedFoot`;
		recommendedBox.appendChild(recommendedFoot);

		//Down below is button logic for the "show more/less" arrow
		const button = document.createElement("button");
		//listen for user click
		button.addEventListener("click", () => {
			const element = document.querySelector(`.reqDescriptionBox${i}`);
			const buttonText = button.children[1];
			console.log(buttonText);
			//if button is being pressed it should expand
			if (element.classList.contains("hide") && buttonText) {
				removeClass("hide", `reqDescriptionBox${i}`);
				removeClass("expandArrow", `arrow${i}`);
				addClass("contractArrow", `arrow${i}`);
			} 
			//if button is pressed again it should contract
			else {
				addClass("hide", `reqDescriptionBox${i}`);
				removeClass("contractArrow", `arrow${i}`);
				addClass("expandArrow", `arrow${i}`);
			}
		});
		button.className = "showDescription";
		recommendedFoot.appendChild(button);
		//create the arrow image
		const expandArrow = document.createElement("img");
		expandArrow.className = `arrow${i} expandArrow`;
		expandArrow.src = "../../arrow.svg";
		expandArrow.alt = "";
		button.appendChild(expandArrow);

		const buttonText = document.createElement("p");
		button.appendChild(buttonText);
		//write the show more description
		const recommendedDescription = document.createElement("div");
		recommendedDescription.className = `recommendedDescription recommendedDescription${i} hide`;
		recommendedDescription.textContent = program.programDesciption_sv;
		recommendedBox.appendChild(recommendedDescription);

		//Remove the loading string from page.
		var elementToRemove = container.querySelector(".aiAnswer");
		if (elementToRemove && elementToRemove.parentNode) {
			elementToRemove.parentNode.removeChild(elementToRemove);
		}
	}
}

export function handleYesButtonClick(): void {
	TypewriterForTitle("Berätta vad du har för intressen, så föreslår jag ett par program som kan passar dig! :)", "interestText");
	modifyOverflow("visible", "main");
	removeClass("hide", "interestContainer");
	scrollToId("interestContainer");
	setTimeout(() => {
		addClass("hide", "welcomeContainer");
		modifyOverflow("hidden", "main");
	}, 500);
}

export async function aiResponse(interests: string): Promise<void> {

	//Send all interest to AiHandler and await response
	const aiAnswer: string[] = await recommendProgramFromInterest(interests);
	//fetch all programs 
	const allPrograms: ProgramNameAndId[] = await fetchAllProgramsJson();

	//convert aiAnswer to numbers so id can be matched
	const aiAnswerAsNumber: number[] = aiAnswer.map((item) => {
		return item as unknown as number;
	});
	//create an empty array to store the selected programs
	var selectedPrograms: ProgramNameAndId[] = [];

	//loop through all programs to find the selected programs 
	for (var i = 0, n = 0; i < allPrograms.length; i++) {
		for (var j = 0; j < aiAnswerAsNumber.length; j++) {
			if (allPrograms[i].programId == aiAnswerAsNumber[j]) {
				console.log(allPrograms[i].programTitle_sv);
				selectedPrograms[n++] = allPrograms[i];
			}
		}
	}

	//send the programs to generate the recommendedboxes
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


//BUTTON WHEN THE USER HAVE SELECTED INTEREST AND WANTS RECOMMENDATIONS

export async function handleRecommendationButtonClick(interestArr: string[]): Promise<void> {
	//Turn interestArr to a string not array
	var interests: string = "";
	interestArr.map((item) => {
		interests += "interest: " + item + "\n";
	});
	console.log(interests);
	//send it to ai 
	aiResponse(interests);

	//Write out the title for recommendations page
	TypewriterForTitle("JAG ÄR AI OCH JAG REKOMMENDERAR THIS", "recommmendationText");

	//move to recommendations page
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
