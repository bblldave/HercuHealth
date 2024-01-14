import React from "react";
import {
  AiFillCheckCircle,
  AiOutlineCheckCircle,
  AiFillClockCircle,
} from "react-icons/ai";

const WorkoutCard = ({ day, dayNumber }) => {
  return (
    <div className="mx-6">
      <p className="ml-9">{`Day ${dayNumber} ${day.dayOfWeek}`}</p>
      {day.workouts.map((workout, index) => {
        return (
          <div className="flex items-center">
            {workout.isCompleted ? (
              <AiFillCheckCircle className="text-green-500 mr-2" />
            ) : (
              <AiOutlineCheckCircle className="text-gray-500 mr-2" />
            )}
            <div className="p-4 rounded-xl ml-2 my-2 border flex-1" key={index}>
              <div className="flex items-center">
                <p className="font-semibold">{workout.workoutName}</p>
              </div>
              <div className="flex flex-row items-center">
                <AiFillClockCircle className="mr-1" />
                <p>{workout.durationMinutes} Mins</p>
              </div>

              <p>Tags</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutCard;
