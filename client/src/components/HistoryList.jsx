import {
  eachWeekOfInterval,
  endOfWeek,
  parse,
  startOfWeek,
  format,
  isWithinInterval,
  parseISO,
} from "date-fns";
import { useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";

const completedWorkouts = [
  {
    workoutProgram: "Power in Gym: Beginner",
    workoutName: "Big Legs",
    duration: "35:24",
    dateCompleted: "2023-12-15",
  },
  {
    workoutProgram: "Power in Gym: Beginner",
    workoutName: "Back & Biceps",
    duration: "35:24",
    dateCompleted: "2023-12-16",
  },
  {
    workoutProgram: "Power in Gym: Beginner",
    workoutName: "Chest & Tris",
    duration: "35:24",
    dateCompleted: "2023-12-01",
  },
];

const HistoryList = () => {
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const sortedWorkouts = completedWorkouts.sort((a, b) => {
      if (a.dateCompleted < b.dateCompleted) {
        return -1;
      }
      if (a.dateCompleted > b.dateCompleted) {
        return 1;
      }
      return 0;
    });
    const formatString = "yyyy-MM-dd";
    const workoutStart = parse(
      sortedWorkouts[0].dateCompleted,
      formatString,
      new Date()
    );
    const workoutEnd = parse(
      sortedWorkouts[sortedWorkouts.length - 1].dateCompleted,
      formatString,
      new Date()
    );
    const historyWeeks = eachWeekOfInterval({
      start: workoutStart,
      end: workoutEnd,
    });
    setWeeks(historyWeeks);
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
          <p key={index} className="px-6 py-2">
            {formattedStart} - {formattedEnd}
            {workoutsThisWeek.length > 0 ? (
              workoutsThisWeek.map((workout, workoutIndex) => (
                <HistoryCard
                  key={workoutIndex}
                  workoutProgram={workout.workoutProgram}
                  workoutName={workout.workoutName}
                  duration={workout.duration}
                />
              ))
            ) : (
              <p className="p-4 rounded-lg border mb-2">
                No workouts this week{" "}
              </p>
            )}
          </p>
        );
      })}
    </div>
  );
};

export default HistoryList;
