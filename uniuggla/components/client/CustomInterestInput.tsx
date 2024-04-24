"use client"

import { ChangeEvent, FormEvent, useState } from "react";

export const CustomInterestInput = ({addInterest}: {addInterest: (event: FormEvent<HTMLFormElement>) => void}) => {
  const [customInterest, setCustomInterest] = useState<string>("");

  const handleUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomInterest(event.target.value);
  }

  return (
    <form className="" onSubmit={addInterest}>
      <input type="text" value={customInterest} onChange={handleUpdate} required className=""/>
      <button type="submit" className="">Add interest</button>
    </form>
  )
}