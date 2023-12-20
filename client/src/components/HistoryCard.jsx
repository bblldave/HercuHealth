import React from "react";

const HistoryCard = ({ workoutName, duration, onViewLog }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{workoutName}</h3>
          <p className="text-gray-600">Duration: {duration}</p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onViewLog}
        >
          View Log
        </button>
      </div>
    </div>
  );
};

export default HistoryCard;
