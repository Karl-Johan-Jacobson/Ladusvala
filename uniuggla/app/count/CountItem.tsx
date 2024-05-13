/*"use client";

import { ChangeEvent, FormEvent, useState } from "react";

interface RefreshProps {
	nr: number;
	corse: string;
	points: string;
	grade: string;
	id: string;
	handleButtonClickSubmit: string;
	imgSource: string;
	altText: string;
	onSubmit: (input: string) => void; // Function to run when button is clicked, passed from parent
}

export default function CounttListItem({ nr, corse, points, grade, id, imgSource, altText, onSubmit }: RefreshProps) {
	const [inputValue, setInputValue] = useState<string>("");

	const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleClick = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(inputValue);
		setInputValue("");
	};

	return (
		<div className="gradeBox gradeBox"{nr}>
			<p className="courseNameGrade gradeStyle">Kurs:<br />{corse}</p>
			<p className="coursePointsGrade gradeStyle">Poäng:<br />{points}</p>
			<p className="gradeGrade gradeStyle">Betyg:<br />{grade}</p>
			<div className="buttonInputWrapper">
				<button className="buttonInput" id={id} type="submit" onClick={handleClick}>
					<img className="buttonInputImg" src={imgSource} alt={altText} />
				</button>
			</div>
		</div>
	);
}
*/
