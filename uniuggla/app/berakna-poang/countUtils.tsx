import Course from "@/types/course";

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
