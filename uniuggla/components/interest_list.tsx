"use client"

import Interest from "@/types/interest";
import InterestListItem from "./interest_list_item";
import { ChangeEvent, useEffect, useState } from "react";


export default function InterestList({ interest }: {interest: Interest[]}){
  const [interests, setInterests] = useState<Interest[]>(interest);
  const [selectedInterestIds, setSelectedInterestIds] = useState<number[]>([])
  const [customInterest, setCustomInterest] = useState<string>("");

//
  /*const handleCustom = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setCustomInterest(query);
  };*/

//Adds the selected interest id to a list handler
  const handleSelect = (id: number) => {
    // Add the selected interest to the list of selected interests
    setSelectedInterestIds([...selectedInterestIds, id]);
    console.log(selectedInterestIds)
  }


//returns a mapped list of interests, using the interestId as key
  return(
    <div className="">
      {interests.map((interest) => (
          <InterestListItem onSelect={handleSelect} interest={interest} key={interest.id}/>
      ))}
    </div>
  )
}