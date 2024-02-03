import React from "react";

const LogModalHeader = ({ workoutName }) => {
  return (
    <>
      <p className="text-2xl  font-semibold mt-2">{workoutName}</p>
      <p className="text-gray-400">See the last 3 logs for each exercise</p>
      <div className="grid grid-cols-4 gap-4 mt-4 uppercase">
        <p>lbs</p>
        <p>reps</p>
        <p>Time</p>
        <p>Distance</p>
      </div>
    </>
  );
};

export default LogModalHeader;
