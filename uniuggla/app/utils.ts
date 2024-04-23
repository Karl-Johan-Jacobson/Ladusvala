import recommendProgramFromInterest from "@/ai/AiHandler";
import { typewriterTest } from "@/components/client/TypeWriter";
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

export function aiTypeAnswer(textToType: string, htmlClass: string): void {
	const elements = document.getElementsByClassName(htmlClass);
	const element = elements[0] as HTMLElement;
	element.innerHTML = textToType;
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


export async function aiResponse(interest: string[]): Promise<void> {
	const aiAnswer: string = await recommendProgramFromInterest(interest);
    aiTypeAnswer(aiAnswer, "aiAnswer");

}

export async function handleRecommendationButtonClick(interest: string[]): Promise<void> {
	//aiResponse(interest);
    typewriterTest();
	modifyOverflow("visible", "main");
	removeClass("hide", "recommendationContainer");
	scrollToId("recommendationContainer");
	setTimeout(() => {
		addClass("hide", "interestContainer");
		modifyOverflow("hidden", "main");
	}, 500);
}
