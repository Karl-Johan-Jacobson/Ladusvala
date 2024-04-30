"use client";

import { ChangeEvent, FormEvent, useState } from "react";

export default function CustomInterestInput({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (input: string) => void;
}) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={"customInterestForm"}>
      <input
        placeholder="Skriv ett intresse ..."
        type="text"
        value={inputValue}
        onChange={handleValueChange}
        required
        className="customInterestField"
      />
      <button
        title="Add interest!"
        type="submit"
        className="customInterestButton"
      >
        {children}
      </button>
    </form>
  );
}