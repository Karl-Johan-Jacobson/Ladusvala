import Course from "@/types/course";

interface CourseItemProps {
  course: Course;
  index: number;
  removeCourse: (index: number) => void;
}

export default function CourseItem({
  course,
  index,
  removeCourse,
}: CourseItemProps) {
  function handleClick() {
    removeCourse(index);
  }

  return (
    <div className="courseBox">
      <div className="gradeStyle name">
        <p className="title">Kurs:</p>
        <p className="content">{course.name}</p>
      </div>
      <div className="gradeStyle points">
        <p className="title">Poäng:</p>
        <p className="content">{course.points}</p>
      </div>
      <div className="gradeStyle grade">
        <p className="title">Betyg:</p>
        <p className="content">{course.grade}</p>
      </div>
      <button className="courseRemoveButton" onClick={handleClick}>
        <svg width="24" height="24" viewBox="0 0 24 24" className="removeIcon">
          <path
            d="M15 9.00004L9 15M15 15L9 9.00004M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
            stroke="#4F1EB0"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
