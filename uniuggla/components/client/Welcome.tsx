import React, { RefObject } from "react";
import { modifyTopPadding, modifyTopPaddingRelative } from "@/app/utils";
interface WelcomeProps {
	yesPageRef: RefObject<HTMLDivElement> | null;
	handleNoButtonClick: () => void;
	handleYesButtonClick: () => void;
}

export default function Welcome({ yesPageRef, handleNoButtonClick, handleYesButtonClick }: WelcomeProps) {

	const handleYesClick = () => {
		yesPageRef?.current?.scrollIntoView();
	}

	const handleNoClick = () => {
		// next link to about
	}
	

	return (
		<div className="wrapper welcomeWrapper">
			<p className="bot titleTypewriter welcomeText" style={{ paddingTop: "15vh" }}></p>
			<div className="answers" style={{ marginTop: "5vw", opacity: "0" }}>
				<button className="yesButton answerButton" onClick={handleYesClick}>
					<p className="user">Ja</p>
				</button>
				<button className="noButton answerButton" onClick={handleNoClick}>
					<p className="user">Nej</p>
				</button>
			</div>
		</div>
	);
};
