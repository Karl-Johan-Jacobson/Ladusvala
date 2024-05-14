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
          <p className="green">
            {`Grundläggande behörighet: ${
              assertEligibility() ? "UPPFYLLES" : "SAKNAS"
            }`}
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="tooltip"
              >
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#9ECB98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.08984 9.00008C9.32495 8.33175 9.789 7.76819 10.3998 7.40921C11.0106 7.05024 11.7287 6.91902 12.427 7.03879C13.1253 7.15857 13.7587 7.52161 14.2149 8.06361C14.6712 8.60561 14.9209 9.2916 14.9198 10.0001C14.9198 12.0001 11.9198 13.0001 11.9198 13.0001" stroke="#9ECB98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 17H12.01" stroke="#9ECB98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span className="tooltiptext">Ligma sugma fugma</span>
            </span>
          </p>
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
