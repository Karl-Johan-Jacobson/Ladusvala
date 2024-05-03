//import {recommendProgramFromInterest} from "@/ai/AiHandler";

import { fetchAllProgramsJson, ProgramNameAndId, filterTheResultsFromAi } from "@/ai/AiHandler";
import callOpenaiInParts from "@/ai/AiHandler";
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
	}
}

export function generateHiddenRecommendations(programs: ProgramNameAndId[], htmlClass: string, interestArr: string[], hiddenCounter: number): void {
	const container = document.querySelector("." + htmlClass);
	//null check
	if (!container) {
		return;
	}

	for (let i = hiddenCounter; i < hiddenCounter + 5; i++) {
		const program = programs[i];
		//create a div to wrap everything
		const recommendedBox = document.createElement("div");
		recommendedBox.className = `recommendedBox recommendedBox${i}`;
		if ((i + 1) % 5 == 0) {
			recommendedBox.className += " wildcard";
		}
		container.appendChild(recommendedBox);
		//create a head
		const recommendedHead = document.createElement("div");
		recommendedHead.className = "recommendedHead";
		recommendedBox.appendChild(recommendedHead);
		//create a p element to write title
		const title = document.createElement("p");
		title.className = "tilteReq";
		title.innerHTML = program.programTitle_sv;
		recommendedHead.appendChild(title);
		if ((i + 1) % 5 == 0) {
			const wildcardText = document.createElement("p");
			wildcardText.className = "wildcardText";
			wildcardText.innerHTML = "WILDCARD?";
			recommendedHead.appendChild(wildcardText);

			const wildcardBubble = document.createElement("p");
			wildcardBubble.className = "wildcardBubble";
			wildcardBubble.innerHTML = "Wildcard är en rekommendation som är löst baserat på dina intressen!";
			recommendedHead.appendChild(wildcardBubble);
		}
		//create a p element to write school
		const school = document.createElement("p");
		school.className = "schoolReq descriptionReq";
		//school.innerHTML = program.school;
		school.innerHTML = "LÄROSÄTE: " + program.schoolName;
		recommendedHead.appendChild(school);
		//create a p elemnt to write degree in
		if (program.degree != null) {
			const degree = document.createElement("p");
			degree.className = "degreeReq descriptionReq";
			degree.innerHTML = "EXAMEN: " + program.degree;
			recommendedHead.appendChild(degree);
		}
		//create a ...
		const points = document.createElement("p");
		points.className = "pointsReq descriptionReq";
		points.innerHTML = program.programPoints + " HP";
		recommendedHead.appendChild(points);
		//create a ...
		const years = document.createElement("p");
		years.className = "yearsReq descriptionReq";
		//to display year it had to be casted to a number to make division possible and then to string again, (shit code, but it works)
		const numberOfYears: string = formatNumber((program.programPoints as unknown as number));
		years.innerHTML = numberOfYears + " ÅR";
		recommendedHead.appendChild(years);
		//create the div for the show more info
		const reqDescriptionBox = document.createElement("div");
		reqDescriptionBox.className = `reqDescriptionBox reqDescriptionBox${i} hide`;
		recommendedBox.appendChild(reqDescriptionBox);
		//create the link
		const reqDescriptionLink = document.createElement("a");
		reqDescriptionLink.className = ` reqDescription reqDescriptionLink reqDescriptionLink${i}`;
		reqDescriptionLink.innerHTML = "Till programmets hemsida";
		reqDescriptionLink.target = "_blank";
		reqDescriptionLink.href = program.programLink;

		reqDescriptionBox.appendChild(reqDescriptionLink);

		//create a p ...
		const reqDescriptionTitle = document.createElement("p");
		reqDescriptionTitle.className = `reqDescription reqDescriptionTitle reqDescriptionTitle${i}`;
		reqDescriptionTitle.innerHTML = "Programbeskrivning:";
		reqDescriptionBox.appendChild(reqDescriptionTitle);
		//create a ...
		const reqDescriptionContent = document.createElement("p");
		reqDescriptionContent.className = `reqDescriptionContent reqDescriptionContent${i}`;
		reqDescriptionContent.innerHTML = program.programDescription_sv;
		reqDescriptionBox.appendChild(reqDescriptionContent);

		const recommendedFoot = document.createElement("div");
		recommendedFoot.className = `recommendedFoot`;
		recommendedBox.appendChild(recommendedFoot);

		//Down below is button logic for the "show more/less" arrow
		const button = document.createElement("button");
		//listen for user click
		button.addEventListener("click", () => {
			const element = document.querySelector(`.reqDescriptionBox${i}`);
			const buttonText = button.children[1];
			//if button is being pressed it should expand
			if (element?.classList.contains("hide") && buttonText) {
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
		expandArrow.className = `arrow arrow${i} expandArrow`;
		if ((i + 1) % 5 == 0) {
			expandArrow.src = "../../arrow_wildcard.svg";
		} else {
			expandArrow.src = "../../arrow.svg";
		}
		expandArrow.alt = "";
		button.appendChild(expandArrow);

		const buttonText = document.createElement("p");
		button.appendChild(buttonText);
		//write the show more description
		const recommendedDescription = document.createElement("div");
		recommendedDescription.className = `recommendedDescription recommendedDescription${i} hide`;
		recommendedDescription.innerHTML = program.programDescription_sv;
		recommendedBox.appendChild(recommendedDescription);
	}
}

export function aiTypeAnswer(programs: ProgramNameAndId[], htmlClass: string, interestArr: string[]): void {
	//create a contianer where every box will be in
	const container = document.querySelector("." + htmlClass);
	var hiddenCounter = 0;
	
	//null check
	if (!container) {
		return;
	}
	var interests: string = "";
	interestArr.map((item) => {
		interests += item + " ";
	});
	const interestBox = document.createElement("div");
	interestBox.className = `showInterestBox`;
	container.appendChild(interestBox);

	for (let i = 0; i < interestArr.length; i++) {
		const selectedInterests = document.createElement("p");
		selectedInterests.className = `interestReq`;
		selectedInterests.innerText = interestArr[i];
		interestBox.appendChild(selectedInterests);
	}

	//loop to make one box at a time
	for (let i = 0; i < programs.length; i++) {
		hiddenCounter++;

		//take one program from selected programs array
		const program = programs[i];
		//create a div to wrap everything
		const recommendedBox = document.createElement("div");
		recommendedBox.className = `recommendedBox recommendedBox${i}`;
		if ((i + 1) % 5 == 0) {
			recommendedBox.className += " wildcard";
		}
		container.appendChild(recommendedBox);
		//create a head
		const recommendedHead = document.createElement("div");
		recommendedHead.className = "recommendedHead";
		recommendedBox.appendChild(recommendedHead);
		//create a p element to write title
		const title = document.createElement("p");
		title.className = "tilteReq";
		title.innerHTML = program.programTitle_sv;
		recommendedHead.appendChild(title);
		if ((i + 1) % 5 == 0) {
			const wildcardText = document.createElement("p");
			wildcardText.className = "wildcardText";
			wildcardText.innerHTML = "WILDCARD?";
			recommendedHead.appendChild(wildcardText);

			const wildcardBubble = document.createElement("p");
			wildcardBubble.className = "wildcardBubble";
			wildcardBubble.innerHTML = "Wildcard är en rekommendation som är löst baserat på dina intressen!";
			recommendedHead.appendChild(wildcardBubble);
		}
		//create a p element to write school
		const school = document.createElement("p");
		school.className = "schoolReq descriptionReq";
		//school.innerHTML = program.school;
		school.innerHTML = "LÄROSÄTE: " + program.schoolName;
		recommendedHead.appendChild(school);
		//create a p elemnt to write degree in		
		if (program.degree != null) {
			const degree = document.createElement("p");
			degree.className = "degreeReq descriptionReq";
			degree.innerHTML = "EXAMEN: " + program.degree;
			recommendedHead.appendChild(degree);
		}
		//create a ...
		const points = document.createElement("p");
		points.className = "pointsReq descriptionReq";
		points.innerHTML = program.programPoints + " HP";
		recommendedHead.appendChild(points);
		//create a ...
		const years = document.createElement("p");
		years.className = "yearsReq descriptionReq";
		//to display year it had to be casted to a number to make division possible and then to string again, (shit code, but it works)
		const numberOfYears: string = formatNumber((program.programPoints as unknown as number));
		years.innerHTML = numberOfYears + " ÅR";
		recommendedHead.appendChild(years);
		//create the div for the show more info
		const reqDescriptionBox = document.createElement("div");
		reqDescriptionBox.className = `reqDescriptionBox reqDescriptionBox${i} hide`;
		recommendedBox.appendChild(reqDescriptionBox);
		//create the link
		const reqDescriptionLink = document.createElement("a");
		reqDescriptionLink.className = ` reqDescription reqDescriptionLink reqDescriptionLink${i}`;
		reqDescriptionLink.innerHTML = "Till programmets hemsida";
		reqDescriptionLink.target = "_blank";
		reqDescriptionLink.href = program.programLink;

		reqDescriptionBox.appendChild(reqDescriptionLink);

		//create a p ...
		const reqDescriptionTitle = document.createElement("p");
		reqDescriptionTitle.className = `reqDescription reqDescriptionTitle reqDescriptionTitle${i}`;
		reqDescriptionTitle.innerHTML = "Programbeskrivning:";
		reqDescriptionBox.appendChild(reqDescriptionTitle);
		//create a ...
		const reqDescriptionContent = document.createElement("p");
		reqDescriptionContent.className = `reqDescriptionContent reqDescriptionContent${i}`;
		reqDescriptionContent.innerHTML = program.programDescription_sv;
		reqDescriptionBox.appendChild(reqDescriptionContent);

		const recommendedFoot = document.createElement("div");
		recommendedFoot.className = `recommendedFoot`;
		recommendedBox.appendChild(recommendedFoot);

		//Down below is button logic for the "show more/less" arrow
		const button = document.createElement("button");
		//listen for user click
		button.addEventListener("click", () => {
			const element = document.querySelector(`.reqDescriptionBox${i}`);
			const buttonText = button.children[1];
			//if button is being pressed it should expand
			if (element?.classList.contains("hide") && buttonText) {
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
		expandArrow.className = `arrow arrow${i} expandArrow`;
		if ((i + 1) % 5 == 0) {
			expandArrow.src = "../../arrow_wildcard.svg";
		} else {
			expandArrow.src = "../../arrow.svg";
		}
		expandArrow.alt = "";
		button.appendChild(expandArrow);

		const buttonText = document.createElement("p");
		button.appendChild(buttonText);
		//write the show more description
		const recommendedDescription = document.createElement("div");
		recommendedDescription.className = `recommendedDescription recommendedDescription${i} hide`;
		recommendedDescription.innerHTML = program.programDescription_sv;
		recommendedBox.appendChild(recommendedDescription);

		//Remove the loading string from page.
		var elementToRemove = container.querySelector(".loadingGIF");
		if (elementToRemove && elementToRemove.parentNode) {
			elementToRemove.parentNode.removeChild(elementToRemove);
		}
	}

	//make button to show more recommendations, this is just a placeholder
	//button design will be created
	const showMoreRecommendations = document.createElement("div");
	showMoreRecommendations.className = `showMoreBox`;
	container.appendChild(showMoreRecommendations);

	const showMoreText = document.createElement("p");
	showMoreText.className = `interestReq showMoreButton`;
	showMoreText.innerText = "Tryck på mig för att vissa fler rekommendationer";
	showMoreRecommendations.appendChild(showMoreText);

	showMoreRecommendations.addEventListener("click", () => {
		if (hiddenCounter + 5 > programs.length) {
			var element = document.querySelector(".showMoreBox");
			var test = element?.firstChild;
			var e = test as unknown as HTMLElement;
			e.innerHTML = "Inga fler rekommendationer";
			return;
		} else {
			container.removeChild(showMoreRecommendations);
			generateHiddenRecommendations(programs, htmlClass, interestArr, hiddenCounter);
			container.appendChild(showMoreRecommendations);
			hiddenCounter += 5;
		}
	});
}

export function handleYesButtonClick(): void {
	TypewriterForTitle("Berätta vad du har för intressen, så föreslår<br />jag ett par program som kan passa dig! :)", "interestText");
	modifyOverflow("visible", "main");
	removeClass("hide", "interestContainer");
	scrollToId("interestContainer");
	setTimeout(() => {
		addClass("hide", "welcomeContainer");
		modifyOverflow("hidden", "main");
	}, 500);
}

export async function aiResponse(interests: string, interestArr: string[]): Promise<void> {
	//Send all interest to AiHandler and await response
	let notCompleteAiAnswer: string[] | undefined = await callOpenaiInParts(interests);
	let aiAnswer: string[] | undefined = []
	if(notCompleteAiAnswer)
		{
			aiAnswer = await filterTheResultsFromAi(notCompleteAiAnswer, interests);
		}
	
	//check if it is undefined, if it is just give it one id number.
	//add later to code that user will be informed something went wrong
	if (aiAnswer == undefined) {
		aiAnswer = ["0"];
	}

	//fetch all programs
	try{
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
				selectedPrograms[n++] = allPrograms[i];
			}
		}
	}
	console.log("SelectedPrograms:  " + selectedPrograms);
	//send the programs to generate the recommendedboxes

	aiTypeAnswer(selectedPrograms, "recommendedWrapper", interestArr);
}
catch(e){
	console.log(e);
}
}

export async function handleRecommendationButtonClick(interestArr: string[]): Promise<void> {
	//Turn interestArr to a string not array
	var interests: string = "";
	interestArr.map((item) => {
		interests += "interest: " + item + "\n";
	});
	//send it to ai
	aiResponse(interests, interestArr);

	//Write out the title for recommendations page
	TypewriterForTitle("Tack! Hmm... låt mig se vad jag kan hitta!", "recommmendationText", true);
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


function formatNumber(num: number): string {
	num = num / 60;
    const roundedNum = num.toFixed(2);
    return roundedNum.endsWith('.00') ? roundedNum.slice(0, -3) : roundedNum;
}
