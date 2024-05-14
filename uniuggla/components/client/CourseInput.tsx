"use client";

import { ChangeEvent, FormEvent, useState } from "react";

interface CourseInputProps {
  addCourse: (name: string, points: string, grade: string) => void;
}

export default function CourseInput({ addCourse }: CourseInputProps) {
  const [name, setName] = useState<string>("");
  const [points, setPoints] = useState<string>("");
  const [grade, setGrade] = useState<string>("");

  const updateName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const updatePoints = (event: ChangeEvent<HTMLInputElement>) => {
    setPoints(event.target.value);
  };

  const updateGrade = (event: ChangeEvent<HTMLInputElement>) => {
    setGrade(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addCourse(name, points, grade);
    setName("");
    setPoints("");
    setGrade("");
  };

  return (
    <form onSubmit={handleSubmit} className="courseForm">
      <input
        value={name}
        type="text"
        onChange={updateName}
        placeholder="Kursnamn"
        required
        className="courseInput"
      />
      <input
        value={points}
        type="number"
        onChange={updatePoints}
        placeholder="Poäng"
        required
        className="courseInput"
      />
      <input
        value={grade}
        type="text"
        onChange={updateGrade}
        placeholder="Betyg"
        required
        className="courseInput"
      />
      <button type="submit" className="addCourseBtn">
        {typeof window !== "undefined" ? (
          window.innerWidth > 480 ? (
            <span>Lägg till</span>
          ) : null
        ) : null}
        <img src="../../plus-square.svg" alt="" />
      </button>
    </form>
  );
}
