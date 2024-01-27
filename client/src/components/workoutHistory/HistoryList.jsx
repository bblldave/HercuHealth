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
import { getWeeks } from "../../utils/dateUtils";

const HistoryList = ({ completedWorkouts }) => {
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    if (completedWorkouts.length > 0) {
      const sortedWorkouts = [...completedWorkouts].sort(
        (a, b) => new Date(a.dateCompleted) - new Date(b.dateCompleted)
      );
      const workoutStart = format(
        sortedWorkouts[0].dateCompleted,
        "yyyy-MM-dd"
      );
      const workoutEnd = format(
        sortedWorkouts[sortedWorkouts.length - 1].dateCompleted,
        "yyyy-MM-dd"
      );

      const historyWeeks = getWeeks(workoutStart, workoutEnd);

      setWeeks(historyWeeks);
    }
  }, [completedWorkouts]);

  const getWorkoutsForWeek = (week, completedWorkouts) => {
    const start = startOfWeek(week);
    const end = endOfWeek(week);
    const formattedStart = format(start, "MM/dd/yy");
    const formattedEnd = format(end, "MM/dd/yy");

    const workoutsThisWeek = completedWorkouts.filter((workout) =>
      isWithinInterval(parseISO(workout.dateCompleted), { start, end })
    );

    return { formattedStart, formattedEnd, workoutsThisWeek };
  };

  return (
    <div>
      <h2 className="text-lg font-bold px-6 py-2 mt-8">History</h2>
      {weeks.map((week, index) => {
        const { formattedStart, formattedEnd, workoutsThisWeek } =
          getWorkoutsForWeek(week, completedWorkouts);
        return (
          <div key={index} className="px-6 py-2">
            {formattedStart} - {formattedEnd}
            {workoutsThisWeek.length > 0 ? (
              workoutsThisWeek.map((workout) => (
                <HistoryCard
                  key={workout._id}
                  workoutProgram={workout.programId?.name}
                  workoutName={workout.workoutId?.workoutName}
                  duration={workout?.duration}
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
