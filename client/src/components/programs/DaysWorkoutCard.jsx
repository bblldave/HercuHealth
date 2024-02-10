import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillClockCircle } from "react-icons/ai";
import WorkoutStatusToggle from "../workouts/WorkoutStatusToggle";

const DaysWorkoutCard = ({
  day: initialDay,
  isActiveProgram,
  programId,
  handleWorkoutCompletedToggle,
}) => {
  const [day, setDay] = useState(initialDay);

  useEffect(() => {
    setDay(initialDay);
  }, [initialDay]);

  const navigate = useNavigate();
  return (
    <>
      <p className="ml-9">{`${day.dayOfWeek}`}</p>
      {day.workouts &&
        day.workouts.map((workout, index) => {
          return (
            <div className="flex items-center" key={index}>
              {isActiveProgram && (
                <WorkoutStatusToggle
                  completed={workout.completed}
                  onToggle={() =>
                    handleWorkoutCompletedToggle(day.week, day._id, workout._id)
                  }
                />
              )}

              <Link
                to={{
                  pathname: `/workout/${workout.workout?._id}`,
                  state: { programId },
                }}
                className="p-4 rounded-xl ml-2 my-2 border flex-1"
              >
                <div>
                  <div className="flex items-center">
                    <p className="font-semibold">
                      {workout.workout?.workoutName}
                    </p>
                  </div>
                  <div className="flex flex-row items-center">
                    <AiFillClockCircle className="mr-1" />
                    <p>{workout.workout?.durationMinutes} Mins</p>
                  </div>

                  <p>Tags</p>
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default DaysWorkoutCard;
