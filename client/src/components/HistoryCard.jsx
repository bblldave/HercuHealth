import React from "react";
import { AiFillClockCircle } from "react-icons/ai";

const HistoryCard = ({ workoutProgram, workoutName, duration, onViewLog }) => {
  return (
    <div className="bg-white p-4 rounded-lg border mb-2">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">{workoutProgram}</p>
          <p className="text-lg font-semibold">{workoutName}</p>
          <p className="text-gray-500 flex">
            <AiFillClockCircle className="mt-1 mr-1" /> {duration}
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-xl"
            onClick={onViewLog}
          >
            View Log
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
