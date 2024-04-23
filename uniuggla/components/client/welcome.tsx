import React from "react";

interface WelcomeProps {
	handleNoButtonClick: () => void;
	handleYesButtonClick: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ handleNoButtonClick, handleYesButtonClick }) => {
	return (
		<div className="wrapper welcomeWrapper welcome" style={{ paddingTop: "10vw" }}>
			<div className="typewriter typewriter_greeting greetingDiv">
				<p className="bot greeting"></p>
			</div>
			<div className="typewriter typewriter_question questionDiv" style={{ marginTop: "0vw" }}>
				<p className="bot question"></p>
			</div>
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
