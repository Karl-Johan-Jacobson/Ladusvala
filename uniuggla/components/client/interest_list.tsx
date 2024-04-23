"use client";

import Interest from "@/types/interest";
import InterestListItem from "./interest_list_item";
import CustomInterestListItem from "./custom_interest_list_item";
import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import React from "react";

interface InterestProps {
	handleRecommendationButtonClick: () => void;
}

const InterestList: React.FC<InterestProps & { interest: Interest[] }> = ({ handleRecommendationButtonClick, interest }) => {
	const router = useRouter();
	//initializing hooks
	const [displayedInterests, setDisplayedInterests] = useState<Interest[]>(interest.filter((interest, index) => index < 4));
	const [allInterests, setAllInterests] = useState<Interest[]>(interest);
	const [selectedInterestIds, setSelectedInterestIds] = useState<string[]>([]);
	const [customInterest, setCustomInterest] = useState<string>("");
	const [customInterestList, setCustomInterestList] = useState<Interest[]>([]);

	//Adds the selected interest id to a list handler
	const addInterest = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const randId = uuidv4();
		setCustomInterestList([
			...customInterestList,
			{
				interestId: randId,
				interestTitle: customInterest,
				interestDescription: customInterest + " description",
			},
		]);
		setCustomInterest("");
		setSelectedInterestIds([...selectedInterestIds, randId]);
	};

	const shuffle = () => {
		// Copy of the displayed interests that can be modified
		const temp: Interest[] = [...displayedInterests];

		let displayIndex = 0; // Index of the displayed interest
		while (displayIndex < 4) {
			let newIndex = Math.floor(Math.random() * allInterests.length); // Index of the new interest

			// Check if the interest at displayIndex is selected
			if (selectedInterestIds.includes(displayedInterests[displayIndex].interestId)) {
				displayIndex++; // Goto the next display interest and start over
				continue;
			}

			// Find a new interest (index) that wasn't previously displayed and that hasn't already been added
			while (displayedInterests.includes(allInterests[newIndex]) || temp.includes(allInterests[newIndex])) {
				newIndex = Math.floor(Math.random() * allInterests.length);
			}

			temp[displayIndex++] = allInterests[newIndex];
		}
		setDisplayedInterests([...temp]);
	};

	const handleToggle = (isToggled: boolean, id: string) => {
		if (isToggled) {
			// Remove the interest from selectedInterestList
			setSelectedInterestIds(selectedInterestIds.filter((interestId) => interestId !== id));
		} else {
			// Adds the interest to selectedInterestList
			setSelectedInterestIds([...selectedInterestIds, id]);
		}
		return !isToggled;
	};

	const handleRemoveCustom = (isToggled: boolean, id: string) => {
		if (!isToggled) {
			// Remove the interest from customInterestList
			const updatedCustomInterestList = customInterestList.filter((interest) => interest.interestId !== id);
			setCustomInterestList(updatedCustomInterestList);

			// Remove the interest from selectedInterestIds if present
			const updatedSelectedInterestIds = selectedInterestIds.filter((interestId) => interestId !== id);
			setSelectedInterestIds(updatedSelectedInterestIds);
		}
	};

	//Sets the input value from the input field as the customInput value to be stored
	const handleUpdate = (event: ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;
		setCustomInterest(query);
	};

	console.log(selectedInterestIds);

	//returns a mapped list of interests, using the interestId as key
	return (
		<div className="wrapper interestWrapper interest" style={{ paddingTop: "10vw" }}>
			<div className="" style={{ marginTop: "0vw" }}>
				<p className="bot question">Välj intressen!</p>
			</div>
			<div className="">
				{displayedInterests.map((interest) => (
					<InterestListItem onToggle={handleToggle} interest={interest} key={interest.interestId} />
				))}
				<button onClick={shuffle} className="">
					Refresh
				</button>
				<div className="">
					{customInterestList.map((interest) => (
						<CustomInterestListItem onToggle={handleRemoveCustom} interest={interest} key={interest.interestId} />
					))}
				</div>
				<form className="" onSubmit={addInterest}>
					<input type="text" value={customInterest} onChange={handleUpdate} required className="" />
					<button type="submit" className="">
						Add interest
					</button>
				</form>
			</div>
			<div>
				<button onClick={handleRecommendationButtonClick} className="recommendationButton">
					Recommendation
				</button>
			</div>
		</div>
	);
};

export default InterestList;
