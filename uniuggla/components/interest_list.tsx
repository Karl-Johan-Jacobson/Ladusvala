"use client"

import Interest from "@/types/interest";
import InterestListItem from "./interest_list_item";
import CustomInterestListItem from "./custom_interest_list_item";
import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function InterestList({ interest }: {interest: Interest[]}){
  //initializing hooks
  const [displayedInterests, setDisplayedInterests] = useState<Interest[]>(interest.filter((interest, index) => index < 10));
  const [allInterests, setAllInterests] = useState<Interest[]>(interest)
  const [selectedInterestIds, setSelectedInterestIds] = useState<string[]>([])
  const [customInterest, setCustomInterest] = useState<string>("");
  const [customInterestList, setCustomInterestList] = useState<Interest[]>([])

//Adds the selected interest id to a list handler
  const addInterest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const randId = uuidv4();
    setCustomInterestList([...customInterestList, {
      interestId: randId, 
      interestTitle: customInterest,
      interestDescription: customInterest + " description"}]);
    setCustomInterest("");
    setSelectedInterestIds([...selectedInterestIds, randId]);
  }

  const shuffle = () => {
    // Copy of the displayed interests that can be modified
    const temp: Interest[] = [...displayedInterests];

    let displayIndex = 0; // Index of the displayed interest
    while (displayIndex < 10) {
      let newIndex = Math.floor(Math.random() * (allInterests.length)); // Index of the new interest

      // Check if the interest at displayIndex is selected
      if (selectedInterestIds.includes(displayedInterests[displayIndex].interestId)) {
        displayIndex++; // Goto the next display interest and start over
        continue;
      }

      // Find a new interest (index) that wasn't previously displayed and that hasn't already been added
       while (displayedInterests.includes(allInterests[newIndex]) ||
        temp.includes(allInterests[newIndex])) {
        newIndex = Math.floor(Math.random() * (allInterests.length));
      }

      temp[displayIndex++] = allInterests[newIndex];
    }
    setDisplayedInterests([...temp]);
  }; 

  const handleToggle = (isToggled: boolean, id: string) => {
    if (isToggled){
      // Remove the interest from selectedInterestList
      setSelectedInterestIds(selectedInterestIds.filter((interestId) => interestId !== id));
    }else{
      // Adds the interest to selectedInterestList
      setSelectedInterestIds([...selectedInterestIds, id]);
    }
    return !isToggled;
  };

  const handleRemoveCustom = (isToggled: boolean, id: string) => {
    if (!isToggled) {
      // Remove the interest from customInterestList
      const updatedCustomInterestList = customInterestList.filter(interest => interest.interestId !== id);
      setCustomInterestList(updatedCustomInterestList);
  
      // Remove the interest from selectedInterestIds if present
      const updatedSelectedInterestIds = selectedInterestIds.filter(interestId => interestId !== id);
      setSelectedInterestIds(updatedSelectedInterestIds);
    }
  };

  //Sets the input value from the input field as the customInput value to be stored
  const handleUpdate = ( event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setCustomInterest(query);
  }

//returns a mapped list of interests, using the interestId as key
  return (
    <>
      <div className="mb-5">
      <form className="" onSubmit={addInterest}>
          <input type="text" value={customInterest} onChange={handleUpdate} required className="mt-5 ml-3 bg-purple-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>
          <button type="submit" className="mt-3 ml-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Add interest</button>
        </form>
        <div className="grid grid-cols-4 gap-4 ml-3 mt-3">
          {customInterestList.map((interest) => (
                <CustomInterestListItem onToggle={handleRemoveCustom} interest={interest} key={interest.interestId}/>
            ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 ml-3">
        {displayedInterests.map((interest) => (
          <InterestListItem onToggle={handleToggle} interest={interest} key={interest.interestId}/>)
        )}
        <button onClick={shuffle} className="w-24 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Refresh
          </button>
      </div>
    </>
  )
}