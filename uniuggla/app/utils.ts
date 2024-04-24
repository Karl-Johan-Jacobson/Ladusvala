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

/*
export async function aiTypeAnswer(id: string[], htmlClass: string): void {
	for (var i = 0; i < program.length; i++) {
		//do HTML here
		
		<div className="recommendedBox program.title">
			<div className="recommendedHead">
				<p className="tilteReq">program.title</p>
				<p className="schoolReq descriptionReq"> program.school</p>
				<p className="degreeReq descriptionReq">program.degree</p>
				<p className="pointsReq descriptionReq">program.points</p>
				<p className="yearsReq descriptionReq">program.years</p>
				<button className="showDescription">
					<img className="expandArrow" src="../../arrow.svg" alt="" />
					<p>Visa beskriving</p>
				</button>
			</div>
			<div className="recommendedDescription">
			</div>
		</div>
		
	}

	//Placera dessa under recommendedWrapper

	var elements = document.querySelectorAll("." + htmlClass);
	elements.forEach(function (element) {
		//(element as HTMLElement).style.overflow = Atribute;
	});

	//
}
*/

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
	const programs : ProgramNameAndId[] = await fetchAllProgramsJson();
	console.log(programs);
	console.log(aiAnswer);

	const aiAnswerAsNumber : number[] = aiAnswer.map((item) => {
		return item as unknown as number
	})
	

	
	//USED for testing 
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
	//Turn the programs to recommendedBoxes 
}

export async function handleRecommendationButtonClick(interestArr: string[]): Promise<void> {
	var interests: string = "";
	interestArr.map((item) => {
		interests += "interest: " + item + "\n";
	});
	console.log(interests)
	//aiResponse(interests);
	

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
