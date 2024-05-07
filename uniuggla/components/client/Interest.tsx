"use client";

import { ChangeEvent, FormEvent, useState, MouseEvent } from "react";
import InterestType from "@/types/interest";
import InterestItem from "./InterestItem";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { RandomBlob } from "../server/Blob";
import path from "path";
import RefreshButton from "./RefreshButton";
import TextInterestInput from "./TextInterestInput";
let NUMBER_OF_INTERESTS = 11;

if (window.innerWidth <= 480) {
  NUMBER_OF_INTERESTS = 10;
}

export { NUMBER_OF_INTERESTS };

interface InterestProps {
	interests: InterestType[];
	handleRecommendationButtonClick: (interest: string[]) => void;
}

const Interest: React.FC<InterestProps> = ({ interests, handleRecommendationButtonClick }) => {
	const [selectedInterests, setSelectedInterests] = useState<InterestType[]>([]);
	const [notSelected, setNotSelected] = useState<InterestType[]>(interests.filter((interest, index) => index < NUMBER_OF_INTERESTS));
	const [customInterest, setCustomInterest] = useState<string>("");

	// Set 'find my dream education' button as locked unless 4 interests are selected
	let dreamEducationButtonClass = "dreamEducationButton";
	if (selectedInterests.length >= 4 && selectedInterests.length <= 11) {
		dreamEducationButtonClass += " dreamEducationButton";
	} else {
		dreamEducationButtonClass += " locked";
	}

	const updateLists = (selectedInterest: InterestType) => {
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
		setSelectedInterests(selectedInterests.filter((interest) => interest !== selectedInterest));
	};

	const addCustomInterest = (customInterest: string) => {
		// Creates a randomized id for the new interest
		const randId = uuidv4();
		// Create an interest "object"
		const interest: InterestType = {
			interestId: randId,
			interestTitle: customInterest,
			interestDescription: "No interest description for custom interests (user-added interests)",
		};
		// Adds it to the list of selected interests
		setSelectedInterests([...selectedInterests, interest]);
	};

	const handleUpdate = (event: ChangeEvent<HTMLInputElement>) => {
		setCustomInterest(event.target.value);
	};

	// Method that refreshes the displayed interests
	const refresh = () => {
		// Copy of the non-selected interests that can be modified
		const newNonSelected: InterestType[] = [...notSelected];

		for (let displayIndex = 0; displayIndex < NUMBER_OF_INTERESTS; displayIndex++) {
			let newIndex = Math.floor(Math.random() * interests.length); // Index of the new interest

			// Find a new interest (index) that wasn't previously displayed and that hasn't already been added
			while (
				selectedInterests.includes(interests[newIndex]) || // Selected interests
				notSelected.includes(interests[newIndex]) || // Previously shown interests
				newNonSelected.includes(interests[newIndex]) // New interests
			) {
				newIndex = Math.floor(Math.random() * interests.length);
			}

			newNonSelected[displayIndex] = interests[newIndex];
		}
		setNotSelected([...newNonSelected]);
	};

	async function handleRecommend() {
		if (selectedInterests.length >= 4 && selectedInterests.length <= 11) {
			handleRecommendationButtonClick(selectedInterests.map((interest) => interest.interestTitle));
		} else {
		}
		//Say something to user, that they have to select interests
	}

	const placeholderInterest = { interestId: "placeholder", interestTitle: "", interestDescription: "placeholder" };

	const filledPlaceholderInterests = [...selectedInterests, ...Array(11 - selectedInterests.length).fill(placeholderInterest)];

	const placeholderInterestRows = filledPlaceholderInterests.length > 6 ? [filledPlaceholderInterests.slice(0, 6), filledPlaceholderInterests.slice(6, 11)] : [filledPlaceholderInterests];

	// Group the notSelected interests into rows
	const interestRows = [notSelected.slice(0, 5), notSelected.slice(5, 11)];
	let selectedInterestRows;
	if (window.innerWidth > 480) {
	  selectedInterestRows =
		selectedInterests.length >= 6
		  ? [selectedInterests.slice(0, 6), selectedInterests.slice(6, 11)]
		  : [[...selectedInterests]];
	} else {
	  selectedInterestRows =
		selectedInterests.length >= 6
		  ? [selectedInterests.slice(0, 6), selectedInterests.slice(6, 12)]
		  : [[...selectedInterests]];
	}
	console.log(selectedInterests);

	return (
		<div className="wrapper interestWrapper interest">
			<div className = "InterestTypeWriterAnim">
			<p className="bot titleTypewriter interestText" style={{ paddingTop: "10vh" }}></p>
			</div>
			<div className="chooseInterestWrapper">
			<div className="selectedInterestTitle">
				<hr />
				<span>Dina intressen</span>
				<hr />
			</div>
			<div className="selectedInterestList">
        {window.innerWidth > 480
          ? selectedInterestRows.map((row, rowIndex) => (
              <div className={`interestRow selectedRow${rowIndex + 1}`}>
                {row.map((interest) => (
                  <InterestItem
                    updateParent={handleDeselect}
                    interest={interest}
                    mounted={true}
                    isSelected={true}
                    key={interest.interestId}
                  />
                ))}
              </div>
            ))
          : /*If phone - Use this*/
            selectedInterestRows.map((row, rowIndex) => (
              <div className={`interestColumn `}>
                {row.map((interest) => (
                  <InterestItem
                    updateParent={handleDeselect}
                    interest={interest}
                    mounted={true}
                    isSelected={true}
                    key={interest.interestId}
                  />
                ))}
              </div>
            ))}
      </div>
			<div className="notSelectedInterestTitle">
				<hr />
				<span>Välj dina intressen</span>
				<hr />
			</div>
			<div className="notSelectedInterestList">
        {window.innerWidth > 480 /*IF-STATEMENT*/
          ? // Render this block if window width is greater than 480
            interestRows.map((row, rowIndex) => (
              <div className={`interestRow row${rowIndex + 1}`} key={rowIndex}>
                {row.map((interest) => (
                  <InterestItem
                    updateParent={updateLists}
                    interest={interest}
                    mounted={true}
                    isSelected={false}
                    key={interest.interestId}
                  />
                ))}
              </div>
            ))
          : // Render this block if window width is less than or equal to 480
            interestRows.map((row, rowIndex) => (
              <div className="interestColumn" key={rowIndex}>
                {row.map((interest) => (
                  <InterestItem
                    updateParent={updateLists}
                    interest={interest}
                    mounted={true}
                    isSelected={false}
                    key={interest.interestId}
                  />
                ))}
              </div>
            ))}
      </div>
			<div className="interestInputWrapper">
				<TextInterestInput imgSource="../../plus.svg" altText="Läggtill" onSubmit={addCustomInterest} />
				<RefreshButton imgSource="../../refresh.svg" altText="Nya intressen" refresh={refresh} />
			</div>
			<div className="recommendationButtonWrapper" style={{ display: "flex", alignItems: "center" }}>
				<hr />
				<button className={dreamEducationButtonClass} onClick={handleRecommend}>
					<p className="user"> &gt;&gt; Hitta min drömutbildning &lt;&lt; </p>
				</button>
				<hr />
			</div>
		</div>
		</div>
	);
};

export default Interest;
