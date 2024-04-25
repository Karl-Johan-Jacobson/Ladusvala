"use client";

import { ChangeEvent, FormEvent, useState, MouseEvent } from "react";
import InterestType from "@/types/interest";
import InterestItem from "./InterestItem";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { RandomBlob }  from "../Blob";
export const NUMBER_OF_INTERESTS = 12;

interface InterestProps {
	interests: InterestType[];
	handleRecommendationButtonClick: (interest: string[]) => void;
}

const Interest: React.FC<InterestProps> = ({ interests, handleRecommendationButtonClick }) => {
	const [selectedInterests, setSelectedInterests] = useState<InterestType[]>([]);
	const [notSelected, setNotSelected] = useState<InterestType[]>(interests.filter((interest, index) => index < NUMBER_OF_INTERESTS));
	const [customInterest, setCustomInterest] = useState<string>("");


	const updateLists = (selectedInterest: InterestType, isMounted: boolean) => {
		if (isMounted) {
      // This will be true after the fade-in animation has run
      return;
    }

		// Find index of interest to "remove" from non-selected interests
		let index = 0;
		while (notSelected[index] !== selectedInterest) {
			index++;
		}

		// Find index of an interest that isn't currently being displayed
		let freeIndex = Math.floor(Math.random() * interests.length); // Index of the new interest
		while (notSelected.includes(interests[freeIndex]) || selectedInterests.includes(interests[freeIndex])) {
			freeIndex = Math.floor(Math.random() * interests.length);
		}

		// Insert a new interest at the same index as the removed one
		const temp = [
			...notSelected.slice(0, index),
			interests[freeIndex],
			...notSelected.slice(index + 1), // Remove the selected interest
		];
		setNotSelected([...temp]);

		// Adds the interest to selectedInterest
		setSelectedInterests([...selectedInterests, selectedInterest]);
	};

	const handleDeselect = (selectedInterest: InterestType, isMounted: boolean) => {
		// Remove from selected interest
    setSelectedInterests(
      selectedInterests.filter((interest) => interest !== selectedInterest)
    );
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

	const handleUpdate = (event: ChangeEvent<HTMLInputElement>) => {
		setCustomInterest(event.target.value);
	};

	const shuffle = () => {
		// Copy of the non-selected interests that can be modified
		const temp: InterestType[] = [...notSelected];

		let displayIndex = 0; // Index of the displayed interest
		while (displayIndex < NUMBER_OF_INTERESTS) {
			let newIndex = Math.floor(Math.random() * interests.length); // Index of the new interest

			// Check if the interest at displayIndex is selected
			if (selectedInterests.includes(notSelected[displayIndex])) {
				displayIndex++; // Goto the next display interest and start over
				continue;
			}

			// Find a new interest (index) that wasn't previously displayed and that hasn't already been added
			while (notSelected.includes(interests[newIndex]) || temp.includes(interests[newIndex])) {
				newIndex = Math.floor(Math.random() * interests.length);
			}
			temp[displayIndex++] = interests[newIndex];
		}
		setNotSelected([...temp]);
	};

	async function handleRecommend() {
		if (selectedInterests.length >= 4) {
			handleRecommendationButtonClick(selectedInterests.map((interest) => interest.interestTitle));
		} else {

		}
		//Say something to user, that they have to select interests
	}

  console.log(selectedInterests);

	return (
		<div className="wrapper interestWrapper interest">
			<p className="bot titleTypewriter interestText" style={{ paddingTop: "15vh" }}></p>
			<div className="selectedInterestList">
				{selectedInterests.map((interest) => (
					<InterestItem updateParent={handleDeselect} interest={interest} mounted={true} isSelected={true} key={interest.interestId} />
				))}
			</div>
			<div className="notSelectedInterestList">
				{notSelected.map((interest) => (
					<InterestItem updateParent={updateLists} interest={interest} mounted={true} isSelected={false} key={interest.interestId} />
				))}
			</div>
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
            <path fill="url(#iconGradient)" transform="translate(100 100)">
            <animate attributeName="d"
                dur="10000ms"
                repeatCount="indefinite"
                values="
                M34.9,-55.1C44.6,-48.1,51.4,-37.3,60.3,-25.3C69.2,-13.4,80.1,-0.1,79.5,12.2C78.9,24.5,66.8,36,55.4,46.5C43.9,56.9,33.1,66.5,20.5,70.6C7.8,74.7,-6.7,73.4,-18.7,67.9C-30.7,62.4,-40.2,52.7,-51.8,42.9C-63.3,33.1,-77,23,-82.3,9.6C-87.7,-3.8,-84.9,-20.6,-76.7,-33.6C-68.6,-46.6,-55.1,-55.7,-41.5,-60.9C-27.8,-66.1,-13.9,-67.3,-0.6,-66.3C12.6,-65.3,25.2,-62.1,34.9,-55.1Z;
                  M48.4,-76.5C61.9,-66.7,71.3,-51.8,77.6,-36C83.9,-20.3,86.9,-3.7,84.5,12C82,27.7,73.9,42.4,63.6,56C53.2,69.7,40.5,82.2,25.2,87.6C9.8,92.9,-8.2,91.1,-23.7,84.7C-39.2,78.3,-52.2,67.4,-64.3,54.9C-76.4,42.4,-87.5,28.3,-90.6,12.5C-93.7,-3.3,-88.9,-20.9,-79.5,-34.2C-70.1,-47.5,-56.2,-56.6,-42.2,-66.2C-28.2,-75.8,-14.1,-85.9,1.7,-88.5C17.5,-91.1,35,-86.4,48.4,-76.5Z;
                  M41.9,-66.3C53.7,-57.6,62.2,-45,70.2,-31C78.1,-17.1,85.4,-1.9,84.8,13.3C84.3,28.4,75.9,43.5,64.2,53.9C52.5,64.4,37.4,70.3,21.6,76.2C5.7,82.1,-10.9,88,-24.1,83.5C-37.3,79,-47,64.1,-57.9,50.7C-68.8,37.2,-80.9,25.3,-86.1,10.4C-91.2,-4.5,-89.5,-22.3,-80.8,-35.1C-72.2,-47.9,-56.5,-55.7,-41.8,-63.1C-27.2,-70.5,-13.6,-77.5,0.7,-78.7C15,-79.8,30.1,-75,41.9,-66.3Z;
                  M37.1,-55.4C50.6,-49,66,-43.1,70.5,-32.4C75,-21.8,68.6,-6.4,65.9,9.1C63.1,24.7,63.9,40.4,57.1,51C50.3,61.7,35.8,67.2,21.9,68.6C7.9,70.1,-5.6,67.5,-19.2,64.1C-32.9,60.7,-46.8,56.6,-56.6,47.7C-66.4,38.8,-72.1,25,-76.5,9.6C-81,-5.9,-84.3,-22.9,-77.2,-34C-70.2,-45.1,-52.8,-50.2,-38.3,-56.1C-23.7,-62,-11.8,-68.7,0,-68.6C11.8,-68.6,23.5,-61.7,37.1,-55.4Z;
                  M44.8,-68C58.1,-61.1,69,-48.8,76.3,-34.4C83.6,-20,87.4,-3.4,83.4,10.7C79.4,24.9,67.6,36.7,55.4,44.6C43.2,52.6,30.5,56.7,16.8,63.6C3.1,70.5,-11.6,80.2,-23.6,77.8C-35.6,75.5,-44.9,61.2,-56.4,48.6C-67.9,35.9,-81.6,24.8,-86.7,10.5C-91.7,-3.8,-88.2,-21.2,-79.3,-34.3C-70.4,-47.4,-56,-56.1,-41.9,-62.7C-27.8,-69.2,-13.9,-73.5,0.9,-75C15.7,-76.4,31.4,-74.9,44.8,-68Z;
                  M34.9,-55.1C44.6,-48.1,51.4,-37.3,60.3,-25.3C69.2,-13.4,80.1,-0.1,79.5,12.2C78.9,24.5,66.8,36,55.4,46.5C43.9,56.9,33.1,66.5,20.5,70.6C7.8,74.7,-6.7,73.4,-18.7,67.9C-30.7,62.4,-40.2,52.7,-51.8,42.9C-63.3,33.1,-77,23,-82.3,9.6C-87.7,-3.8,-84.9,-20.6,-76.7,-33.6C-68.6,-46.6,-55.1,-55.7,-41.5,-60.9C-27.8,-66.1,-13.9,-67.3,-0.6,-66.3C12.6,-65.3,25.2,-62.1,34.9,-55.1Z;
                  "
                >
              </animate>
            </path>
          </svg>
          <span className="iconText">Ge mig nya intressen</span>
        </button>
    </div>
	);
};

export default Interest;
