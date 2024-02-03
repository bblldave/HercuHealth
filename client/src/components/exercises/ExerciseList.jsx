import React from "react";
import ExerciseCard from './ExerciseCard';

const ExerciseList = ({exercises}) => {
  return (
    <div>
      {exercises && exercises.map((exercise, index) => (
        <ExerciseCard key={index} exercise={exercise} />
      ))}
    </div>
  );
};

export default ExerciseList;
