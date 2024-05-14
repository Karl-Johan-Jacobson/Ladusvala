"use client"

import React, { RefObject, useEffect, useState } from "react";
import { TypewriterForTitle } from "@/components/client/TypeWriter";
import { addClass, modifyOverflow, removeClass } from "@/app/utils";
import Link from "next/link";

interface WelcomeProps {
	yesPageRef: RefObject<HTMLDivElement> | null;
}

export default function Welcome({ yesPageRef }: WelcomeProps) {
	const [showButtons, setShowButtons] = useState<boolean>(false);
	if (typeof window !== 'undefined'){
		// Starting animation
		useEffect(() => {
			let titelText: string;
			if (window.innerWidth > 480) {
				titelText = "Hej!<br />Är du redo att hitta din drömutbildning?";
			} else {
				titelText = "Hej!<br />Är du redo att hitta<br />din drömutbildning?";
			}

			// Funciton for iniatal js animations
			var typeWriterDelay = TypewriterForTitle(titelText, "welcomeText", false, false);

			const extraButtonDelay = 300;
			setTimeout(() => {
				setShowButtons(true);
			}, typeWriterDelay + extraButtonDelay);
		}, []);

		const handleYesClick = () => {
			TypewriterForTitle("Berätta vad du har för intressen, så föreslår<br />jag ett par program som kan passa dig! :)", "interestText");
			modifyOverflow("visible", "main");
			removeClass("hide", "interestContainer");
			yesPageRef?.current?.scrollIntoView();
			setTimeout(() => {
				addClass("hide", "welcomeContainer");
				modifyOverflow("hidden", "main");
			}, 500);
		}

		return (
			<div className="wrapper welcomeWrapper">
				<p className="titleTypewriter welcomeText" style={{ paddingTop: "10vh", top: "0", height: "1.5em"}}></p>
				<div className={`answers ${showButtons ? "show" : ""}`}>
					<button className="answerButton" onClick={handleYesClick}>
						<p className="user">Ja</p>
					</button>
					<button className="answerButton" >
						<Link href="/about" className="noButtonLink">
							<p className="user">Nej</p>
						</Link>
					</button>
				</div>
			</div>
		);
	}
};
