"use client";

import { ChangeEvent, FormEvent, useState, MouseEvent } from "react";
import InterestType from "@/types/interest";
import InterestItem from "./InterestItem";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
export const NUMBER_OF_INTERESTS = 10;

interface InterestProps {
	handleRecommendationButtonClick: (interest: string[]) => void;
}

const Interest: React.FC<InterestProps & { interest: InterestType[] }> = ({ handleRecommendationButtonClick, interest }) => {
	const [selectedInterests, setSelectedInterests] = useState<InterestType[]>([]);
	const [notSelected, setNotSelected] = useState<InterestType[]>(interest.filter((interest, index) => index < NUMBER_OF_INTERESTS));
	const [allInterests, setAllInterests] = useState<InterestType[]>(interest);
	const [customInterest, setCustomInterest] = useState<string>("");

	const handleSelect = (selectedInterest: InterestType) => {
		// Find index of interest to "remove" from non-selected interests
		let index = 0;
		while (notSelected[index] !== selectedInterest) {
			index++;
		}

		// Find index of an interest that isn't currently being displayed
		let freeIndex = Math.floor(Math.random() * allInterests.length); // Index of the new interest
		while (notSelected.includes(allInterests[freeIndex]) || selectedInterests.includes(allInterests[freeIndex])) {
			freeIndex = Math.floor(Math.random() * allInterests.length);
		}

		// Insert a new interest at the same index as the removed one
		const temp = [
			...notSelected.slice(0, index),
			allInterests[freeIndex],
			...notSelected.slice(index + 1), // Remove the selected interest
		];
		setNotSelected([...temp]);

		// Adds the interest to selectedInterest

		setSelectedInterests([...selectedInterests, selectedInterest]);
	};

	const handleDeselect = (selectedInterest: InterestType) => {
		// Remove from selected interest
		setSelectedInterests(selectedInterests.filter((interest) => interest !== selectedInterest));
	};

	const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		setCustomInterest(event.target.value);
	};

	const addCustomInterest = (event: FormEvent<HTMLFormElement>) => {
		// Take an input
		event.preventDefault();
		// Creates a randomized id for the new interest
		const randId = uuidv4();
		// Create an interest "object"
		const interest: InterestType = {
			interestId: randId,
			interestTitle: customInterest,
			interestDescription: "No interest description for custom interests (user added interests)",
		};
		// Reset the input field
		setCustomInterest("");
		// Adds it to the list of selected interests
		setSelectedInterests([...selectedInterests, interest]);
	};

	const shuffle = () => {
		// Copy of the non-selected interests that can be modified
		const temp: InterestType[] = [...notSelected];

		let displayIndex = 0; // Index of the displayed interest
		while (displayIndex < NUMBER_OF_INTERESTS) {
			let newIndex = Math.floor(Math.random() * allInterests.length); // Index of the new interest

			// Check if the interest at displayIndex is selected
			if (selectedInterests.includes(notSelected[displayIndex])) {
				displayIndex++; // Goto the next display interest and start over
				continue;
			}

			// Find a new interest (index) that wasn't previously displayed and that hasn't already been added
			while (notSelected.includes(allInterests[newIndex]) || temp.includes(allInterests[newIndex])) {
				newIndex = Math.floor(Math.random() * allInterests.length);
			}
			temp[displayIndex++] = allInterests[newIndex];
		}
		setNotSelected([...temp]);
	};

	const handleUpdate = (event: ChangeEvent<HTMLInputElement>) => {
		setCustomInterest(event.target.value);
	};

	async function handleRecommend() {
		if (selectedInterests.length >= 4) {
			handleRecommendationButtonClick(selectedInterests.map((interest) => interest.interestTitle));
		} else {
		}
		//Say something to user, that they have to select interests
	}

	return (
		<div className="wrapper interestWrapper interest">
			<p className="bot titleTypewriter interestText" style={{ paddingTop: "15vh" }}></p>
			<div className="selectedInterestList">
				{selectedInterests.map((interest) => (
					<InterestItem onSelect={handleDeselect} interest={interest} isSelected={true} key={interest.interestId} />
				))}
			</div>
			<div className="notSelectedInterestList">
				{notSelected.map((interest) => (
					<InterestItem onSelect={handleSelect} interest={interest} isSelected={false} key={interest.interestId} />
				))}
			</div>
			<div className="customInterestForm">
				<form onSubmit={addCustomInterest} className="form">
					<input placeholder="Skriv ett intresse ..." type="text" value={customInterest} onChange={handleUpdate} required className="addInterestField" />
					<button type="submit" className="addInterestButton">
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#DFFDE0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
							<path d="M12 5v14M5 12h14" />
						</svg>
					</button>
				</form>
				<button className="recommendationButton answerButton" onClick={handleRecommend}>
					<p className="user"> &gt;&gt; Hitta min drömutbildning &lt;&lt; </p>
				</button>
				<button onClick={shuffle} className="shuffleButton iconButton">
					<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
						<path
							fill="#9ECB98"
							d="M51.3,-58.6C66.3,-48.4,78.4,-32.2,81.6,-14.3C84.8,3.5,79.2,23,69.7,40.8C60.1,58.7,46.6,74.8,29,82.5C11.3,90.1,-10.4,89.3,-26.2,80.1C-42,70.9,-51.8,53.2,-61.7,35.8C-71.7,18.3,-81.7,1.1,-80.9,-16.2C-80.2,-33.4,-68.6,-50.7,-53.3,-60.8C-38,-70.9,-19,-74,-0.4,-73.5C18.1,-72.9,36.2,-68.8,51.3,-58.6Z"
							transform="translate(100 100)"
						/>
					</svg>
					<span className="iconText">Ge mig nya intressen</span>
				</button>
			</div>
		</div>
	);
};

export default Interest;
