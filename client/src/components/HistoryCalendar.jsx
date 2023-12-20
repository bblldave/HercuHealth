import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";

const completedWorkouts = [
  {
    workoutName: "Power in Gym: Beginner Back & Biceps",
    duration: "35:24",
    dateCompleted: "2023-12-15",
  },
  {
    workoutName: "Power in Gym: Beginner Back & Biceps",
    duration: "35:24",
    dateCompleted: "2023-12-16",
  },
  {
    workoutName: "Power in Gym: Beginner Back & Biceps",
    duration: "35:24",
    dateCompleted: "2023-12-09",
  },
];

const HistoryCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDay = startOfMonth(currentMonth);
  const endDay = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: startDay, end: endDay });

  const isWorkoutCompleted = (date) => {
    const workoutDates = completedWorkouts.map((workout) => {
      return workout.dateCompleted;
    });
    // Example format for comparison: '2023-01-04'
    const formattedDate = format(date, "yyyy-MM-dd");
    return workoutDates.includes(formattedDate);
  };

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <>
      <h2 className="text-lg font-bold px-6 py-2 mt-8">
        Days you have worked out
      </h2>
      <div className="bg-white p-4 rounded-xl border mx-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          
        </div>
        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map((day, index) => (
            <div
              key={index}
              className={`text-center p-1  rounded-full cursor-pointer ${
                isWorkoutCompleted(day)
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-200"
              }`}
            >
              {format(day, "d")}
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-between">
            <button onClick={previousMonth} className="p-1 mx-1 font-bold text-2xl">
              {"<"}
            </button>
            <button onClick={nextMonth} className="p-1 mx-1 font-bold text-2xl">
              {">"}
            </button>
          </div>
      </div>
    </>
  );
};

export default HistoryCalendar;
