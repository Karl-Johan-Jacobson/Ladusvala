"use client";

import { useState } from "react";
import InterestType from "@/types/interest";
import InterestItem from "./InterestItem";
import { v4 as uuidv4 } from "uuid";
import RefreshButton from "./RefreshButton";
import TextInterestInput from "./TextInterestInput";



interface InterestProps {
	interests: InterestType[];
	handleRecommendationButtonClick: (interest: string[]) => void;
}

export default function Interest({ interests, handleRecommendationButtonClick }: Readonly<InterestProps>) {
if (typeof window !== 'undefined') {
	// Function to get random elements from an array.
	function getRandom(arr: InterestType[], n: number) {
    let result = new Array(n);
    let len = arr.length;
    let taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
	}


	const NUMBER_OF_INTERESTS = window.innerWidth <= 480 ? 10 : 11;
	const coreInterests = interests.filter(interest => interest.coreSubject);
	const nonCoreInterests = interests.filter(interest => !interest.coreSubject);
	const initialInterests = [...getRandom(coreInterests,5), ...getRandom(nonCoreInterests,NUMBER_OF_INTERESTS-5)];
	const [selectedInterests, setSelectedInterests] = useState<InterestType[]>([]);
	const [notSelected, setNotSelected] = useState<InterestType[]>(initialInterests);

	// Set 'find my dream education' button as locked unless 4 interests are selected
	let dreamEducationButtonClass: string;
	if (window.innerWidth > 480) {
		dreamEducationButtonClass = "dreamEducationButton";
		if (selectedInterests.length < 4 || selectedInterests.length > 11) {
			dreamEducationButtonClass += " locked";
		}
	}
	else {
		dreamEducationButtonClass = "dreamEducationButtonInputWrapper";
		if (selectedInterests.length < 4 || selectedInterests.length > 10) {
			dreamEducationButtonClass += " locked";
		}
	}

	const updateLists = (selectedInterest: InterestType) => {
		if (selectedInterests.length === 11) {
			// Return if already selected 11 interests
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
		setSelectedInterests(selectedInterests.filter((interest) => interest !== selectedInterest));
	};

	const addCustomInterest = (customInterest: string) => {
		// Creates a randomized id for the new interest
		const randId = uuidv4();
		// Create an interest "object"
		const interest: InterestType = {
			interestId: randId,
			interestTitle: customInterest,
			coreSubject: false,
			interestDescription: "No interest description for custom interests (user-added interests)",
		};
		// Adds it to the list of selected interests
		setSelectedInterests([...selectedInterests, interest]);
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
			alert("Please select between 4 and 11 interests.");
		}
	}

	const placeholderInterest = { interestId: "placeholder", interestTitle: "", interestDescription: "placeholder" };
	const filledPlaceholderInterests = [...selectedInterests, ...Array(11 - selectedInterests.length).fill(placeholderInterest)];

	// Group the notSelected interests into rows
	const interestRows = [notSelected.slice(0, 5), notSelected.slice(5, 11)];
	let placeholderInterestRows;
	if (window.innerWidth > 480) {
		placeholderInterestRows = filledPlaceholderInterests.length > 6 ? [filledPlaceholderInterests.slice(0, 6), filledPlaceholderInterests.slice(6, 11)] : [filledPlaceholderInterests];
	} else {
		placeholderInterestRows = filledPlaceholderInterests.length > 5 ? [filledPlaceholderInterests.slice(0, 5), filledPlaceholderInterests.slice(5, 10)] : [filledPlaceholderInterests];
	}
	console.log(selectedInterests);

	return (
		<div className="wrapper interestWrapper interest">
			<p className="titleTypewriter interestText" style={{ paddingTop: "15vh", top: "0" ,height: "1.5em"}}></p>
			<div className="chooseInterestWrapper">
				<div className="selectedInterestTitle">
					<hr />
					<span>Dina intressen</span>
					<hr />
				</div>
				<div className="selectedInterestList">
					{window.innerWidth > 480?
						placeholderInterestRows.map((row, rowIndex) => (
								<div className={`interestRow selectedRow${rowIndex + 1}`}>
									{row.map(
										(interest) =>
											interest.interestId !== "placeholder" ? (
												<InterestItem
													updateParent={handleDeselect}
													interest={interest}
													isSelected={true}
													isDisabled={false}
													key={interest.interestId}
												/>
											) : (
												<div className="placeholderInterest">
													<p></p>
												</div>
											)
									)}
								</div>
						  ))
						: /*If phone - Use this*/
						placeholderInterestRows.map((row, rowIndex) => (
								<div className={`interestColumn selectedColumn${rowIndex + 1}`}>
						{row.map(
							(interest) =>
								interest.interestId !== "placeholder" ? (
									<InterestItem
										updateParent={handleDeselect}
										interest={interest}
										isSelected={true}
										isDisabled={false}
										key={interest.interestId}
									/>
								) : (
									<div className="placeholderInterest">
										<p></p>
									</div>
								)
						)}
					</div>
						  ))}
				</div>
				<div className="notSelectedInterestTitle">
					<hr />
					<span>Välj minst 4 intressen</span>
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
											isSelected={false}
											isDisabled={selectedInterests.length === 11}
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
											isSelected={false}
											isDisabled={selectedInterests.length === 11}
											key={interest.interestId}
										/>
									))}
								</div>
						  ))}
				</div>
				{window.innerWidth > 480 ? (
					<>
						<div className="interestInputWrapper">
							<TextInterestInput imgSource="../../plus.svg" altText="Lägg till" onSubmit={addCustomInterest} isDisabled={selectedInterests.length === 11}/>
							<RefreshButton imgSource="../../refresh.svg" altText="Nya intressen" refresh={refresh}/>
						</div>
						<div className="recommendationButtonWrapper">
							<hr />
							<button className={dreamEducationButtonClass} onClick={handleRecommend}>
								<p className="user"> &gt;&gt; Hitta min drömutbildning &lt;&lt; </p>
							</button>
							<hr />
						</div>
					</>
				) : (
					<div className="interestInputWrapper">
						<TextInterestInput imgSource="../../plus.svg" altText="Läggtill" onSubmit={addCustomInterest} isDisabled={selectedInterests.length === 11} />
						<RefreshButton imgSource="../../refresh.svg" altText="Nya intressen" refresh={refresh} />
						<div className={"buttonInputWrapper " + dreamEducationButtonClass}>
							<button onClick={handleRecommend} className="buttonInput" type="button">
								<img className="buttonInputImg" src="../../double_right_arrow.svg" alt="Få rekommendation" />
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
};
