"use client"

import React, { RefObject, useEffect, useState } from "react";
import { TypewriterForTitle } from "@/components/client/TypeWriter";
import { addClass, modifyOverflow, modifyTopPadding, modifyTopPaddingRelative, removeClass } from "@/app/utils";
import Link from "next/link";

interface WelcomeProps {
	yesPageRef: RefObject<HTMLDivElement> | null;
}

export default function Welcome({ yesPageRef }: WelcomeProps) {
	const [showButtons, setShowButtons] = useState<boolean>(false);

	// Starting animation
	useEffect(() => {
		// Funciton for iniatal js animations
		var typeWriterDelay = TypewriterForTitle("Hej!<br />Är du redo att hitta din drömutbildning?", "welcomeText");
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

	const SHOW_BUTTONS_DELAY = 3000;
	const timeoutId = setTimeout(() => {
		setShowButtons(true);
	}, SHOW_BUTTONS_DELAY);

	return (
		<div className="wrapper welcomeWrapper">
			<p className="bot titleTypewriter welcomeText"></p>
			<div className={`answers ${showButtons ? "show" : ""}`}>
				<button className="answerButton" onClick={handleYesClick}>
					<p className="user">Ja</p>
				</button>
				<Link href="/about">
					<button className="answerButton" >
						<p className="user">Nej</p>
					</button>
				</Link>
			</div>
		</div>
	);
};
