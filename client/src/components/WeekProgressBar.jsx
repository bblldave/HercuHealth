import React from "react";

const WeekProgressBar = ({workoutsCompleted, totalWorkouts}) => {
  const progressPercentage = (workoutsCompleted / totalWorkouts) * 100;
  return (
    <div className="flex flex-col align-middle justify-center mx-7 mb-10">
      <span className="text-sm mx-auto text-gray-400 mb-2">
        {workoutsCompleted}/{totalWorkouts}
      </span>
      <div className="w-full border rounded-full h-2.5 mt-1.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  )
};

export default WeekProgressBar;
