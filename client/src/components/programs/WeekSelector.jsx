import React, { useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import { AiOutlineCaretLeft } from "react-icons/ai";

const WeekSelector = ({ weekNumber, onDecreaseWeek, onIncreaseWeek }) => {
  return (
    <div className="flex justify-between align-middle mt-4">
      <button className="font-bold text-xl" onClick={onDecreaseWeek}>
        <AiOutlineCaretLeft />
      </button>
      <span className="text-xl font-semibold">Week {weekNumber}</span>
      <button className="font-bold text-xl" onClick={onIncreaseWeek}>
        <AiOutlineCaretRight />
      </button>
    </div>
  );
};

export default WeekSelector;
