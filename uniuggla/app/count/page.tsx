"use client";

import React, { useState } from "react";
import countAllGrades from "./countUtils";
import TextCountInput from "./CountItem";

interface RecommendationProps {}

const Recommendation: React.FC<RecommendationProps> = () => {
	const [courseName, setcourseName] = useState("");
	const [coursePoints, setcoursePoints] = useState("");
	const [grade, setgrade] = useState("");

	const handleSubmit = () => {
		countAllGrades(courseName, coursePoints, grade);
	};

	const handleButtonClickSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (courseName != "" && coursePoints != "" && grade != "") {
			handleSubmit();
		}

		setcourseName("");
		setcoursePoints("");
		setgrade("");
	};

	return (
		<section>
			<div id="recommendation" className="wrapper recommendationWrapper recommendation">
				<p className="bot titleTypewriter recommendationText" style={{ paddingTop: "15vh" }}></p>
				<form className="gradeInputWrapper">
					<div className="textInputWrapper">
						<input className="textInput" type="text" pattern="[A-Fa-f0-9]" placeholder="Engelska 5" value={courseName} onChange={(e) => setcourseName(e.target.value)} />
						<button className="textButton">
							<img className="textButtonImg" src="../../dropdown_arrow.svg" alt="" />
						</button>
					</div>
					<div className="textInputWrapper">
						<input className="textInput" type="number" pattern="[0-9]{4}" placeholder="100" value={coursePoints} onChange={(e) => setcoursePoints(e.target.value)} />
						<button className="textButton">
							<img className="textButtonImg" src="../../dropdown_arrow.svg" alt="" />
						</button>
					</div>
					<div className="textInputWrapper">
						<input className="textInput" type="text" pattern="[A-Fa-f]{1}" placeholder="C" value={grade} onChange={(e) => setgrade(e.target.value)} />
						<button className="textButton">
							<img className="textButtonImg" src="../../dropdown_arrow.svg" alt="" />
						</button>
					</div>
					<div className="buttonInputWrapper">
						<button className="buttonInput" type="submit" onClick={handleButtonClickSubmit}>
							<img className="buttonInputImg" src="../../dropdown_arrow.svg" alt="Submit" />
						</button>
					</div>
					<div className="pointWrapper">
						<p className="pointOutput">Kalkylerar...</p>
					</div>
				</form>
				<div className="gradeWrapper">
					<div className="loadingGIF">
						<img src="../../uniugglan.gif" alt="Waiting on recommendation." />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Recommendation;
