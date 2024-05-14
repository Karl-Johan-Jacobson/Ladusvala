"use client";

import { useEffect, useState } from "react";
import Course from "@/types/course";
import CourseItem from "@/components/client/CourseItem";
import CourseInput from "@/components/client/CourseInput";
import {
  calculateScore,
  assertEligibility,
  GRADE_VALUES,
  POINTS_FULL_PROGRAM,
} from "./countUtils";
import { TypewriterForTitle } from "@/components/client/TypeWriter";

export default function Count() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showInstruction, setShowInstruction] = useState<boolean>(false);
  const totalPoints: number = courses.reduce(
    (acc, course) => (acc += course.points),
    0
  );

  useEffect(() => {
    const typeDelay = TypewriterForTitle(
      "Här kan du räkna ut ditt meritvärde",
      "pointsCounterText",
      true
    );
    setTimeout(() => {
      setShowInstruction(true);
    }, typeDelay);
  }, []);

  const addCourse = (name: string, pointsString: string, grade: string) => {
    try {
      // Verify that the points are of the number type
      const points = parseInt(pointsString);

      // Verify that a valid grade has been submitted
      const gradeUpper = grade.toUpperCase();
      if (!GRADE_VALUES.includes(gradeUpper)) {
        throw new Error(`${grade} is not a supported grade`);
      }

      setCourses([
        ...courses,
        { name: name, points: points, grade: gradeUpper },
      ]);
    } catch (error: any) {
      console.error(error);
    }
  };

  const removeCourse = (courseIndex: number) => {
    if (0 <= courseIndex || courseIndex < courses.length) {
      setCourses(courses.filter((_course, index) => index !== courseIndex));
    } else {
      throw new Error(
        `An error occured when trying to remove course with index: ${courseIndex} from course array with length ${courses.length}`
      );
    }
  };

  return (
    <div className="pointCalculatorWrapper">
      <p
        className="titleTypewriter pointsCounterText"
        style={{ top: "0", height: "1.5em" }}
      ></p>
      <div className={`pointsInstruction ${showInstruction ? "show" : ""}`}>
        <hr />
        <span>Fyll i namnet på en kurs, dess poäng samt betyget du fick.</span>
        <hr />
      </div>
      <div className="pointsCalculatorHeader">
        <div className="pointsInformation">
          <p className="purple">{`Antal lästa poäng: ${totalPoints}/${POINTS_FULL_PROGRAM}`}</p>
          <p className={assertEligibility(courses) ? "purple" : "green"}>
            {`Grundläggande behörighet: ${
              assertEligibility(courses) ? "UPPFYLLES" : "SAKNAS"
            }`}
          </p>
          <p
            className={totalPoints >= POINTS_FULL_PROGRAM ? "purple" : "green"}
          >{`Beräknad meritpoäng: ${calculateScore(courses)}`}</p>
        </div>
        <CourseInput addCourse={addCourse} />
      </div>
      <div className="coursesWrapper">
        {courses.map((course, index) => (
          <CourseItem
            course={course}
            index={index}
            removeCourse={removeCourse}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
