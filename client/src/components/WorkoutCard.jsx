import React from "react";

const WorkoutCard = ({ day, dayNumber }) => {
  return (
    <>
      <p className="mx-6">{`Day ${dayNumber} ${day.dayOfWeek}`}</p>
      {day.workouts.map((workout, index) => {
        return (
          <div className="p-4 rounded-xl mx-6 my-2 border" key={index}>
            <p>{workout.workoutName}</p>
            <p>{workout.durationMinutes} Mins</p>
            <p>Tags</p>
          </div>
        );
      })};
    </>
  );
};

export default WorkoutCard;
