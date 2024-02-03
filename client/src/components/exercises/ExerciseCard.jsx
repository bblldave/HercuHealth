import React, { useState } from "react";
import { AiOutlineCaretUp } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";

const ExerciseCard = ({ exercise }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border rounded-xl p-4 mb-4" onClick={toggleOpen}>
      <div className="flex justify-between items-center">
        <p className="font-semibold">{exercise.exercise.name}</p>
        <p>{isOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}</p>
      </div>
      {exercise.exerciseType === "sets" && (
        <>
          <p>{exercise.reps} reps</p>
        </>
      )}
      {exercise.exerciseType === "duration" && <p>{exercise.duration}</p>}
      {exercise.exerciseType === "distance" && <p>{exercise.distance} miles</p>}
      {isOpen && (
        <img src={exercise.exercise.gifUrl} alt={exercise.exercise.name} />
      )}
    </div>
  );
};

export default ExerciseCard;
