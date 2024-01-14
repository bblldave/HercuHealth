import React, { useState } from "react";

const WeekSelector = ({ weekNumber, onDecreaseWeek, onIncreaseWeek }) => {
  return (
    <div className="flex justify-between align-middle mx-7 mt-4">
      <button className="font-bold text-xl" onClick={onDecreaseWeek}>
        {"<"}
      </button>
      <span className="text-xl font-semibold">Week {weekNumber}</span>
      <button className="font-bold text-xl" onClick={onIncreaseWeek}>
        {">"}
      </button>
    </div>
  );
};

export default WeekSelector;
