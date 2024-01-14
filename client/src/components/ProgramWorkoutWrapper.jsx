import React from "react";
import WeekSelector from "./WeekSelector";
import { useState } from "react";
import WorkoutCard from "./WorkoutCard";

const ProgramWorkoutWrapper = ({ weeks }) => {
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
      <h1>WeekProgressBar</h1>
      <h1>Workout Progress</h1>
      {weeks[selectedWeek - 1].days.map((day, index) => {
        return (
          <WorkoutCard day={day} key={index} dayNumber={index + 1} />
        );
      })}
    </div>
  );
};

export default ProgramWorkoutWrapper;
