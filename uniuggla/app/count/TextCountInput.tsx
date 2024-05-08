"use client";

import { ChangeEvent, FormEvent, useState } from "react";

interface RefreshProps {
	inputType: string;
	inputPattern: string;
	inputPlaceholder: string;
	imgSource: string;
	altText: string;
	onSubmit: (input: string) => void; // Function to run when button is clicked, passed from parent
}

export default function TextCountInput({ inputType, inputPattern, inputPlaceholder, imgSource, altText, onSubmit }: RefreshProps) {
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
		<div className="textInputWrapper">
			<input type={inputType} pattern={inputPattern} placeholder={inputPlaceholder} value={inputValue} onChange={handleValueChange} required className="textInput" />
			<button title="Add interest!" type="submit" className="textButton">
				<img className="textButtonImg" src={imgSource} alt={altText} />
			</button>
		</div>
	);
}
