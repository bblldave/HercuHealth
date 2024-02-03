import React, { useEffect } from "react";
import WeekSelector from "./WeekSelector";
import { useState } from "react";
import DaysWorkoutCard from "./DaysWorkoutCard";
import WeekProgressBar from "./WeekProgressBar";
import useUpdateData from "../../api/useUpdateData";

const ProgramWorkoutWrapper = ({ weeks, isActiveProgram }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [weekData, setWeekData] = useState(weeks);
  const { updateData } = useUpdateData("toggleWorkoutComplete");

  useEffect(() => {
    setWeekData(weeks);
  }, [weeks]);

  const decreaseWeek = () => {
    if (selectedWeek > 1) {
      setSelectedWeek(selectedWeek - 1);
    }
  };

  const increaseWeek = () => {
    if (selectedWeek < weekData.length) {
      setSelectedWeek(selectedWeek + 1);
    }
  };

  const handleCompletedToggle = async (weekId, dayId, workoutId) => {
    const { day: updatedDay } = await updateData([dayId, workoutId]);
    const newWeekData = [...weekData];

    const weekIndex = newWeekData.findIndex((week) => week._id === weekId);
    if (weekIndex === -1) return; // week not found

    const dayIndex = newWeekData[weekIndex].days.findIndex(
      (day) => day._id === dayId
    );
    if (dayIndex === -1) return; // day not found

    const workoutIndex = newWeekData[weekIndex].days[
      dayIndex
    ].workouts.findIndex((workout) => workout._id === workoutId);
    if (workoutIndex === -1) return; // workout not found

    newWeekData[weekIndex].days[dayIndex].workouts[workoutIndex] =
      updatedDay.workouts.find((workout) => workout._id === workoutId);

    setWeekData(newWeekData);
  };

  if (!weekData || selectedWeek < 1 || selectedWeek > weekData.length)
    return <div>Loading...</div>;

  const totalWorkouts = weekData[selectedWeek - 1].days.reduce(
    (total, day) => total + day.workouts.length,
    0
  );

  const workoutsCompleted = weekData[selectedWeek - 1].days.reduce(
    (total, day) =>
      total +
      day.workouts.reduce(
        (total, workout) => (workout.completed ? total + 1 : total),
        0
      ),
    0
  );

  return (
    <>
      <WeekSelector
        weekNumber={weekData[selectedWeek - 1].weekNumber}
        onDecreaseWeek={decreaseWeek}
        onIncreaseWeek={increaseWeek}
      />
      {isActiveProgram && (
        <WeekProgressBar
          workoutsCompleted={workoutsCompleted}
          totalWorkouts={totalWorkouts}
        />
      )}
      {weekData[selectedWeek - 1].days.map((day, index) => (
        <DaysWorkoutCard
          key={index}
          day={day}
          isActiveProgram={isActiveProgram}
          handleWorkoutCompletedToggle={handleCompletedToggle}
          className="flex-grow"
        />
      ))}
    </>
  );
};

export default ProgramWorkoutWrapper;
