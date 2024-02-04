import React from "react";
import ExerciseCard from "./ExerciseCard";

const ExerciseList = ({ exercises }) => {
  return (
    <div>
      {exercises &&
        exercises.map((exercise, index) => (
          <div className="mb-4" key={index}>
            <ExerciseCard exercise={exercise} openable={true} />
          </div>
        ))}
    </div>
  );
};

export default ExerciseList;
