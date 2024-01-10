import {
  eachWeekOfInterval,
  endOfWeek,
  isSunday,
  addDays,
  startOfWeek,
  format,
  isWithinInterval,
  parseISO,
} from "date-fns";
import { useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";

const HistoryList = ({ completedWorkouts }) => {
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const getWeeks = (startDateString, endDateString) => {
      const parseLocalDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
      };

      const startDate = parseLocalDate(startDateString);
      const endDate = parseLocalDate(endDateString);

      const getStartOfWeek = (date) => {
        const dayOfWeek = date.getDay(); // Get day of week (0-6, Sunday is 0)
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - dayOfWeek); // Go back to the last Sunday
        return startOfWeek;
      };

      const getEndOfWeek = (date) => {
        const dayOfWeek = date.getDay();
        const endOfWeek = new Date(date);
        endOfWeek.setDate(date.getDate() + (6 - dayOfWeek)); // Go forward to the next Saturday
        return endOfWeek;
      };

      const startOfWeek = getStartOfWeek(startDate);
      const endOfWeek = getEndOfWeek(endDate);

      const weeks = [];
      let currentWeekStart = new Date(startOfWeek);

      // Iterate from the start week to the end week
      while (currentWeekStart <= endOfWeek) {
        weeks.push(new Date(currentWeekStart));
        currentWeekStart.setDate(currentWeekStart.getDate() + 7); // Move to the start of the next week
      }

      return weeks;
    };

    if (completedWorkouts.length > 0) {
      const sortedWorkouts = completedWorkouts.sort((a, b) => {
        if (a.dateCompleted < b.dateCompleted) {
          return -1;
        }
        if (a.dateCompleted > b.dateCompleted) {
          return 1;
        }
        return 0;
      });
      const workoutStart = format(
        sortedWorkouts[0].dateCompleted,
        "yyyy-MM-dd"
      );
      const workoutEnd = format(
        sortedWorkouts[completedWorkouts.length - 1].dateCompleted,
        "yyyy-MM-dd"
      );

      const historyWeeks = getWeeks(workoutStart, workoutEnd);

      setWeeks(historyWeeks);
    }
  }, [completedWorkouts]);

  return (
    <div>
      <h2 className="text-lg font-bold px-6 py-2 mt-8">History</h2>
      {weeks.map((week, index) => {
        const start = startOfWeek(week);
        const end = endOfWeek(week);
        const formattedStart = format(start, "MM/dd/yy");
        const formattedEnd = format(end, "MM/dd/yy");

        const workoutsThisWeek = completedWorkouts.filter((workout) =>
          isWithinInterval(parseISO(workout.dateCompleted), { start, end })
        );
        return (
          <div key={index} className="px-6 py-2">
            {formattedStart} - {formattedEnd}
            {workoutsThisWeek.length > 0 ? (
              workoutsThisWeek.map((workout) => (
                <HistoryCard
                  key={workout._id}
                  workoutProgram={workout.programId.name}
                  workoutName={workout.workoutId.workoutName}
                  duration={workout.duration}
                />
              ))
            ) : (
              <p className="p-4 rounded-lg border mb-2">
                No workouts this week{" "}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HistoryList;
