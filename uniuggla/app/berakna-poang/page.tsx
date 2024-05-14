"use client";

import { useState } from "react";
import Course from "@/types/course";
import CourseItem from "@/components/client/CourseItem";
import CourseInput from "@/components/client/CourseInput";
import { calculateScore } from "./countUtils";

const GRADE_VALUES: string[] = ["A", "B", "C", "D", "E", "F"];

export default function Count() {
  const [courses, setCourses] = useState<Course[]>([]);
  const totalPoints: number = courses.reduce(
    (acc, course) => (acc += course.points),
    0
  );

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

  const assertEligibility = () => {
    // TODO Implement functionality to verify eligibility
    return courses.length > 2;
  };

  return (
    <div className="pointCalculatorWrapper">
      <div className="pointsCalculatorHeader">
        <div className="pointsInformation">
          <p className="pruple">{`Antal lästa poäng: ${totalPoints}/2400`}</p>
          <p className="green">{`Grundläggande behörighet: ${
            assertEligibility() ? "UPPFYLLES" : "SAKNAS"
          }`}</p>
          <p className="green">{`Beräknad meritpoäng: ${calculateScore(
            courses
          )}`}</p>
        </div>
        <CourseInput addCourse={addCourse} />
      </div>
      <div className="coursesWrapper">
        {courses.map((course, index) => (
          <CourseItem
            course={course}
            index={index}
            removeCourse={removeCourse}
          />
        ))}
      </div>
    </div>
  );
}
