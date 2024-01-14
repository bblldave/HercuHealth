import React from "react";
import WeekSelector from "./WeekSelector";
import { useState } from "react";
import WorkoutCard from "./WorkoutCard";
import WeekProgressBar from "./WeekProgressBar";

const ProgramWorkoutWrapper = ({ weeks, isActiveProgram }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const decreaseWeek = () => {
    if (selectedWeek > 1) {
      setSelectedWeek(selectedWeek - 1);
    }
  };

  const increaseWeek = () => {
    if (selectedWeek < weeks.length - 1) {
      setSelectedWeek(selectedWeek + 1);
    }
  };

  if (!weeks) return <div>Loading...</div>;

  return (
    <div>
      <WeekSelector
        weekNumber={weeks[selectedWeek - 1].weekNumber}
        onDecreaseWeek={decreaseWeek}
        onIncreaseWeek={increaseWeek}
      />
      {isActiveProgram && (
        <WeekProgressBar workoutsCompleted={3} totalWorkouts={5} />
      )}
        {weeks[selectedWeek - 1].days.map((day, index) => (
              <WorkoutCard day={day} dayNumber={index + 1} className="flex-grow" />
        ))}

    </div>
  );
};

export default ProgramWorkoutWrapper;
