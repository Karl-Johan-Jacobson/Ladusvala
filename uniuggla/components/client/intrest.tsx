import React from "react";

interface WelcomeProps {
	handleNoButtonClick: () => void;
	handleYesButtonClick: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ handleNoButtonClick, handleYesButtonClick }) => {
	return (
		<div className="wrapper interestWrapper interest" style={{ paddingTop: "10vw" }}>
			<div className="typewriter typewriter_greeting greetingDiv">
				<p className="bot greeting"></p>
			</div>
			<div className="typewriter typewriter_question questionDiv" style={{ marginTop: "0vw" }}>
				<p className="bot question"></p>
			</div>
		</div>
	);
};

export default Welcome;
