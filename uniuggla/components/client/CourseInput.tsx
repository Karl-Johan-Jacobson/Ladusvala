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
        {window.innerWidth > 480 ? <span>Lägg till</span> : null}
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path
            d="M17.4167 2.75H4.58333C3.57081 2.75 2.75 3.57081 2.75 4.58333V17.4167C2.75 18.4292 3.57081 19.25 4.58333 19.25H17.4167C18.4292 19.25 19.25 18.4292 19.25 17.4167V4.58333C19.25 3.57081 18.4292 2.75 17.4167 2.75Z"
            stroke="#C6F0C3"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 7.33325V14.6666"
            stroke="#C6F0C3"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.3335 11H14.6668"
            stroke="#C6F0C3"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </form>
  );
}
