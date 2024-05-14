import Course from "@/types/course";

const GRADE_VALUES: string[] = ["A", "B", "C", "D", "E", "F"];
const POINTS_FOR_EXAM: number = 2250;
const POINTS_FULL_PROGRAM: number = 2500;

const coursesForEligibility: string[][] = [
  ["s1", "svenska1", "svenskasomandraspråk1"],
  ["s2", "svenska2", "svenskasomandraspråk2"],
  ["s3", "svenska3", "svenskasomandraspråk3"],
  ["e5", "engelska5"],
  ["e6", "engelska6"],
  ["m1", "matematik1", "matte1", "matematik1a", "matte1a", "matematik1b", "matte1b", "matematik1c", "matte1c"]
];

export { GRADE_VALUES, POINTS_FOR_EXAM, POINTS_FULL_PROGRAM }

export const calculateScore = (courses: Course[]) => {
  if (courses.length === 0) {
    return 0;
  }

  const totalPoints = courses.reduce(
    (acc, course) => (acc += course.points),
    0
  );

  const num =
    courses.reduce((acc, course) => (acc += getCourseScore(course)), 0) /
    totalPoints;

  return (Math.round(num * 100) / 100).toFixed(2);
};

const getCourseScore = (course: Course) => {
  switch (course.grade) {
    case "A": {
      return 20 * course.points;
    }
    case "B": {
      return 17.5 * course.points;
    }
    case "C": {
      return 15 * course.points;
    }
    case "D": {
      return 12.5 * course.points;
    }
    case "E": {
      return 10 * course.points;
    }
    case "F": {
      return 0 * course.points;
    }
    default:
      throw new Error(`Invalid grade ${course.grade}`);
  }
};

export const getCoursesPoints = (courses: Course[]) => {
  return courses.reduce((acc, course) => acc += course.points, 0)
}

export const assertEligibility = (courses: Course[]) => {
  const passedCourses: Course[] = courses.filter((course) => course.grade !== "F");
  const formattedCourses = passedCourses.map((course) => course.name.toLowerCase().replaceAll(" ", ""));

  const eligibility = coursesForEligibility.reduce((acc, eligibleCourseType) => {
    const intersection = eligibleCourseType.filter((course) => formattedCourses.includes(course))
    return acc && intersection.length > 0;
  }, true)

  return eligibility && getCoursesPoints(passedCourses) >= POINTS_FOR_EXAM && getCoursesPoints(courses) >= POINTS_FULL_PROGRAM;
};

