import React from "react";
import { modifyTopPadding, modifyTopPaddingRelative } from "@/app/utils";
interface WelcomeProps {
	handleNoButtonClick: () => void;
	handleYesButtonClick: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ handleNoButtonClick, handleYesButtonClick }) => {
	
	return (
		<div className="wrapper welcomeWrapper">
			<p className="bot titleTypewriter welcomeText" style={{ paddingTop: "15vh" }}></p>
			<div className="answers" style={{ marginTop: "5vw", opacity: "0" }}>
				<button className="yesButton answerButton" onClick={handleYesButtonClick}>
					<p className="user">Ja</p>
				</button>
				<button className="noButton answerButton" onClick={handleNoButtonClick}>
					<p className="user">Nej</p>
				</button>
			</div>
		</div>
	);
};

export default Welcome;
