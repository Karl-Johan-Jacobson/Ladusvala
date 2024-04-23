import React from "react";

interface RecomendationProps {}

const Recomendation: React.FC<RecomendationProps> = () => {
	
	/*
		const [message, setMessage] = useState<string>("")
		async function handleGetRecommendationButtonClick() {
		console.log("Clicked");
		setMessage("Loading ...");
		aiAnswer = await recommendProgramFromInterest();
		setMessage(aiAnswer);
	}
	*/
	return (
		<div id="recommmendation" className="wrapper recommmendationWrapper recommmendation" style={{ paddingTop: "10vw" }}>
			<div className="typewriter typewriter_greeting greetingDiv">
				<p className="bot greeting"></p>
			</div>
			<div className="typewriter typewriter_question questionDiv" style={{ marginTop: "0vw" }}>
				<p className="bot question"></p>
			</div>
		</div>
	);
};

export default Recomendation;
