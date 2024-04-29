"use client";

import { ChangeEvent, FormEvent, useState, MouseEvent } from "react";
import InterestType from "@/types/interest";
import InterestItem from "./InterestItem";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { RandomBlob }  from "../server/Blob";
export const NUMBER_OF_INTERESTS = 11;

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
    while (
      notSelected.includes(interests[freeIndex]) ||
      selectedInterests.includes(interests[freeIndex])
    ) {
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

  const handleDeselect = (
    selectedInterest: InterestType,
    isMounted: boolean
  ) => {
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
      interestDescription:
        "No interest description for custom interests (user added interests)",
    };
    // Reset the input field
    setCustomInterest("");
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

    for (
      let displayIndex = 0;
      displayIndex < NUMBER_OF_INTERESTS;
      displayIndex++
    ) {
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
      handleRecommendationButtonClick(
        selectedInterests.map((interest) => interest.interestTitle)
      );
    } else {
      
    }
    //Say something to user, that they have to select interests
  }


// Group the notSelected interests into rows
  const interestRows = [notSelected.slice(0, 5), notSelected.slice(5, 11)];
  const selectedInterestRows = selectedInterests.length >= 6 
  ? [selectedInterests.slice(0, 6), selectedInterests.slice(6, 11)]
  : [[...selectedInterests]];

  return (
    <div className="wrapper interestWrapper interest">
      <p className="bot titleTypewriter interestText" style={{ paddingTop: "10vh" }}></p>
      <div className="selectedInterestTitle">
        <hr />
        <span>Selected Interests</span>
        <hr />
      </div>
      <div className="selectedInterestList">
        {selectedInterestRows.map((row, rowIndex) => (
          <div className={`interestRow selectedRow${rowIndex + 1}`}>
            {row.map((interest) => (
              <InterestItem updateParent={handleDeselect} interest={interest} mounted={true} isSelected={true} key={interest.interestId} />
            ))}
          </div>
        ))}
      </div>
      <div className="notSelectedInterestTitle">
        <hr />
        <span>Select your interests!</span>
        <hr />
      </div>
      <div className="notSelectedInterestList">
        {interestRows.map((row, rowIndex) => (
          <div className={`interestRow row${rowIndex + 1}`}>
            {row.map((interest) => (
              <InterestItem updateParent={updateLists} interest={interest} mounted={true} isSelected={false} key={interest.interestId} />
            ))}
          </div>
        ))}
      </div>
      <div className="interestControl">
        <form onSubmit={addCustomInterest} className="form">
          <input placeholder="Skriv ett intresse ..." type="text" value={customInterest} onChange={handleUpdate} required className="addInterestField" />
          <button title="Add interest!" type="submit" className="addInterestButton">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#DFFDE0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </form>
        <button onClick={refresh} className="shuffleButton">
          <span className="iconText">Ge mig nya intressen</span>
        </button>
        <button className="recommendationButton answerButton" onClick={handleRecommend}>
            <p className="user"> &gt;&gt; Hitta min drömutbildning &lt;&lt; </p>
        </button>
      </div>
    </div>
  );
};

export default Interest;
