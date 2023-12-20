import React from "react";

const ProgramCard = ({ programName, exercisesCompleted, exerciseCount }) => {
  const progressPercentage = (exercisesCompleted / exerciseCount) * 100;

  return (
    <div className="bg-white p-4 rounded-xl mx-6 my-2 border ">
      <h3 className="text-lg font-semibold">{programName}</h3>
      <div className="flex flex-row align-middle justify-center">
        <span className="text-sm mr-2">
          {exercisesCompleted}/{exerciseCount}
        </span>
        <div className="w-full border rounded-full h-2.5 mt-1.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
