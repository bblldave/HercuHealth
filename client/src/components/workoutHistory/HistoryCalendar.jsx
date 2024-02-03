import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval as eachDayOfTheWeek,
} from "date-fns";
import { AiOutlineCaretRight } from "react-icons/ai";
import { AiOutlineCaretLeft } from "react-icons/ai";

const HistoryCalendar = ({ completedWorkouts }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDay = startOfWeek(startOfMonth(currentMonth));
  const endDay = endOfWeek(endOfMonth(currentMonth));
  const daysInMonth = eachDayOfInterval({ start: startDay, end: endDay });

  // Function to create the header with day abbreviations (e.g., Sun, Mon, Tue, ...)
  const renderDayHeaders = () => {
    const dayHeaders = eachDayOfTheWeek({
      start: startDay,
      end: endOfWeek(startDay),
    });
    return dayHeaders.map((day, index) => (
      <div key={index} className="text-center">
        {format(day, "EEE")}
      </div>
    ));
  };

  const isWorkoutCompleted = (date) => {
    const workoutDates = completedWorkouts.map((workout) => {
      return format(new Date(workout.dateCompleted), "yyyy-MM-dd");
    });
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
          <div>
            <button
              onClick={previousMonth}
              className="p-1 mx-1 font-bold text-2xl"
            >
              <AiOutlineCaretLeft />
            </button>
            <button onClick={nextMonth} className="p-1 mx-1 font-bold text-2xl">
              <AiOutlineCaretRight />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {renderDayHeaders()}
          {daysInMonth.map((day, index) => (
            <div
              key={index}
              className={`text-center p-1 rounded-full cursor-pointer ${
                isWorkoutCompleted(day)
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-200"
              }`}
            >
              {format(day, "d")}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HistoryCalendar;
