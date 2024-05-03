import { average } from "firebase/firestore";

var totalgrades: number = 0;
var totalCoursePoints: number = 0;
var gradeBoxCounter: number = 0;
export default function countAllGrades(courseName: string, coursePointsAsString: string, grade: string) {
	//error handling to start with

	if (grade.length !== 1 || !/[A-Fa-f]/.test(grade)) {
		// Grade is either not a single character or not within A-F or a-f range
		return;
	}

	//turn coursepoints to an Integer
	const coursePointsAsNumber: number = parseInt(coursePointsAsString, 10);
	console.log("coursePointsAsNumber: " + coursePointsAsNumber);
	console.log("totalCoursePoints: " + totalCoursePoints);
	//increment global points counter
	totalCoursePoints += coursePointsAsNumber;
	//check the value from one grade and increment a totalgrades counter
	totalgrades += countOneGrade(grade, coursePointsAsNumber);
	console.log("Before totalCoursePoints:  " + totalCoursePoints);
	console.log("Before totalgrades: " + totalgrades);

	//generate a block that shows a box of the argument that is passed to the user
	generateHTMLBLock(courseName, coursePointsAsString, grade, coursePointsAsNumber);
	if (totalCoursePoints == 2400) {
		showGradeScoreToUser();
		return;
	}
}

function countOneGrade(grade: string, coursePointsAsNumber: number): number {
	const gradeLower: string = grade.toLowerCase();

	switch (gradeLower) {
		case "a": {
			return 20 * coursePointsAsNumber;
			break;
		}

		case "b": {
			return 17.5 * coursePointsAsNumber;
			break;
		}
		case "c": {
			return 15 * coursePointsAsNumber;
			break;
		}
		case "d": {
			return 12.5 * coursePointsAsNumber;
			break;
		}
		case "e": {
			return 10 * coursePointsAsNumber;
			break;
		}
		case "f": {
			return 0 * coursePointsAsNumber;
			break;
		}
		default:
			return 0;
			break;
	}
}

function showGradeScoreToUser() {
	const averageGradeScore: number = totalgrades / 2400;

	const container = document.querySelector(".pointWrapper");

	if (!container) {
		console.error(`Container element with class '.gradeWrapper' not found.`);
		return;
	}

	const placeHolder = container.firstChild;
	container.removeChild(placeHolder as ChildNode);

	const points = document.createElement("p");
	points.className = `pointOutput gradeStyle`;
	points.innerHTML = "BI Poäng: " + parseFloat(averageGradeScore.toFixed(2));
	container.appendChild(points);
}

function generateHTMLBLock(courseName: string, coursePointsAsString: string, grade: string, coursePointsAsNumber: number) {
	const container = document.querySelector(".gradeWrapper");

	if (!container) {
		console.error(`Container element with class '.gradeWrapper' not found.`);
		return;
	}

	if (gradeBoxCounter == 0) {
		const ugglan = container.firstChild;
		container.removeChild(ugglan as ChildNode);
	}

	const gradeBox = document.createElement("div");
	gradeBox.className = `gradeBox gradeBox${gradeBoxCounter}`;
	container.appendChild(gradeBox);

	const courseNameGrade = document.createElement("p");
	courseNameGrade.className = `courseNameGrade gradeStyle`;
	if (courseName.length < 17) {
		courseNameGrade.innerHTML = "Kurs:<br />" + courseName;
	} else {
		courseNameGrade.innerHTML = "Kurs:" + courseName;
	}

	gradeBox.appendChild(courseNameGrade);

	const coursePointsAsStringGrade = document.createElement("p");
	coursePointsAsStringGrade.className = `coursePointsGrade gradeStyle`;
	coursePointsAsStringGrade.innerHTML = "Poäng:<br />" + coursePointsAsString;

	gradeBox.appendChild(coursePointsAsStringGrade);

	const gradeGrade = document.createElement("p");
	gradeGrade.className = `gradeGrade gradeStyle`;
	gradeGrade.innerHTML = "Betyg:<br />" + grade.toUpperCase();
	gradeBox.appendChild(gradeGrade);

	const removeButton = document.createElement("button");
	removeButton.className = `remove`;
	removeButton.innerHTML = "Ta bort";
	removeButton.id = gradeBoxCounter as unknown as string;
	removeButton.onclick = function (event) {
		const targetElement = event.target as Element;
		const parentElement = targetElement.parentNode;
		if (parentElement) {
			parentElement.parentNode?.removeChild(parentElement);
		}

		totalgrades -= countOneGrade(grade, coursePointsAsNumber);
		totalCoursePoints -= coursePointsAsNumber;
	};
	console.log("After totalCoursePoints:  " + totalCoursePoints);
	gradeBox.appendChild(removeButton);

	gradeBoxCounter++;
}
