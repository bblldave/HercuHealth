import React from "react";
import ProgramCard from "./ProgramCard";

const activePrograms = [
  {
    programName: 'Power in Gym: Beginner',
    exerciseCount: 42,
    exercisesCompleted: 12,
  },
  {
    programName: 'Flexibility 1',
    exerciseCount: 9,
    exercisesCompleted: 3,
  }
]



const ActiveProgramsList = () => {
  return (
  <div>
    <h2 className="text-lg font-bold px-6 py-2">Active Programs</h2>
    {activePrograms.map((program, index) => (
      <ProgramCard key={index} {...program} />
    ))}
  </div>
  );
};

export default ActiveProgramsList;
