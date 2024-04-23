"use client";

import { ChangeEvent, FormEvent, useState, MouseEvent } from "react";
import InterestType from "@/types/interest";
import InterestItem from "./InterestItem";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
export const NUMBER_OF_INTERESTS = 9;

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

	async function handleRecommend (){
		if (selectedInterests.length >= 4) 
		{
			handleRecommendationButtonClick(selectedInterests.map((interest) => interest.interestTitle));

		}
		else {}
			//Say something to user, that they have to select interests
		
	};

	return (
		<div className="wrapper interestWrapper interest" style={{ paddingTop: "10vw" }}>
			<div className="typewriter typewriter_greeting greetingDiv">
				<p className="bot greeting"></p>
			</div>
			<div className="typewriter typewriter_question questionDiv" style={{ marginTop: "0vw" }}>
				<p className="bot question"></p>
			</div>
			<div className="selectedInterest
		">
				{selectedInterests.map((interest) => (
					<InterestItem onSelect={handleDeselect} interest={interest} isSelected={true} key={interest.interestId} />
				))}
			</div>
			<div className="notSelectedInterest
		">
				{notSelected.map((interest) => (
					<InterestItem onSelect={handleSelect} interest={interest} isSelected={false} key={interest.interestId} />
				))}
			</div>
			<div className="customInterestForm">
				<form onSubmit={addCustomInterest}>
					<input type="text" value={customInterest} onChange={handleUpdate} required className="" />
					<button type="submit" className="">
						Add interest
					</button>
				</form>
				<button onClick={shuffle} className="">
					Refresh
				</button>
				<div>
					<button className="recommendationButton answerButton" onClick={handleRecommend}>
						<p className="user">Recommendation</p>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Interest;
