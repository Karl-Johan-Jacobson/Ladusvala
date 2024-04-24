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
      <div className="everyThingElse">
        <div className="customInterestForm">
          <form onSubmit={addCustomInterest} className="form">
            <input placeholder="Skriv ett intresse ..." type="text" value={customInterest} onChange={handleUpdate} required className="addInterestField" />
            <button title="Add interest!" type="submit" className="addInterestButton">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#DFFDE0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
                <path d="M12 5v14M5 12h14" />
              </svg>
        </button>
        </form>
          <button className="recommendationButton answerButton" onClick={handleRecommend}>
            <p className="user"> &gt;&gt; Hitta min drömutbildning &lt;&lt; </p>
          </button>
        </div>
        <button onClick={shuffle} className="shuffleButton iconButton">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="">
            <defs>
              <linearGradient id="iconGradient" gradientTransform="rotate(90)">
                <stop offset="0%" stop-color="#9ECB98" />
                <stop offset="100%" stop-color="#7DA577" />
              </linearGradient>
            </defs>
            <path 
              fill="url(#iconGradient)" 
              d="M40.8,-51.2C56.6,-44.8,75.5,-37.7,84.2,-24.2C92.9,-10.7,91.3,9.2,82.3,23.6C73.3,37.9,56.8,46.7,41.8,56.6C26.9,66.5,13.4,77.4,-1.7,79.8C-16.8,82.1,-33.7,75.8,-47,65.4C-60.3,55,-70.1,40.5,-75.7,24.4C-81.2,8.2,-82.5,-9.5,-76.9,-24.5C-71.4,-39.5,-59,-51.9,-45,-58.9C-31.1,-65.9,-15.5,-67.5,-1.5,-65.5C12.6,-63.4,25.1,-57.6,40.8,-51.2Z"
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
