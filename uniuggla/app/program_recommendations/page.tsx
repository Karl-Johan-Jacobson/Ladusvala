'use client'

import { useState } from "react";
import { NextPage } from "next";
import "../globals.css";
import recommendProgramFromInterest from "@/ai/AiHandler";


//Page for DEMO to show that ai can recommend programs
const ProgramRecommendations = ({searchParams}: {
		searchParams: {
			interests: string[]
		}
	}) => {
	const text = "UniU-GPT";
	//Used to updated ai messages on the screen
	const [message, setMessage] = useState<string>("");

	//ai answer that will be updated 
	let aiAnswer : string = "";

	//activate the typewriter
	//Make request to AI when button is clicked
	async function handleButton () {
		console.log("Clicked");
		setMessage("Loading ...");
		aiAnswer = await recommendProgramFromInterest(searchParams.interests)
		setMessage(aiAnswer);
	};

	//HTML code
	return (
		<main style={{marginTop: '10vw'}}>
			<p className="styles">{text}</p>
			<div className="userInputScreen"> 
				<div className="userInput">
					{message.split('\n').map((line, index) => (
						<p key={index}>
							{line}
							<br />
							</p>
					))}
				</div>
			</div>
			<button className="button" onClick={handleButton}>Get recommendations!</button>
		</main>
	);
};

export default ProgramRecommendations;
