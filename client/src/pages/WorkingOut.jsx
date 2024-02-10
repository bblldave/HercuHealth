import { useState, useEffect } from "react";
import { useLocation, useBlocker } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import WorkoutTimer from "../components/workouts/WorkoutTimer";
import WorkoutControlBar from "../components/workouts/WorkoutControlBar";
import ScrollableExerciseList from "../components/exercises/ScrollableExerciseList";
import WorkoutActionModal from "../components/workouts/WorkoutActionModal";
import useUpdateData from "../api/useUpdateData";

const WorkingOut = () => {
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isWorkingOut, setIsWorkingOut] = useState(true);
  const location = useLocation();
  const workout = location.state.workout;
  const dayId = location.state.dayId || null;
  const programId = location.state.programId || null;
  const { updateData: toggleWorkoutComplete } = useUpdateData(
    "toggleWorkoutComplete"
  );
  const { updateData: addWorkoutHistory } = useUpdateData("addWorkoutHistory");

  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isWorkingOut && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (workout) {
      setSelectedExerciseIndex(0);
    }
  }, [workout]);

  const handleExerciseClick = (index) => {
    setSelectedExerciseIndex(index);
  };

  const handleToggleComplete = (exercise, index) => {
    setCompletedExercises((prev) => {
      if (prev.includes(exercise)) {
        return prev.filter((e) => e !== exercise);
      } else {
        const newCompletedExercises = [...prev, exercise];
        if (
          index === selectedExerciseIndex &&
          index < workout.exercises.length - 1
        ) {
          setSelectedExerciseIndex(index + 1);
        }
        return newCompletedExercises;
      }
    });
  };

  const handlePreviousClick = () => {
    if (selectedExerciseIndex > 0) {
      setSelectedExerciseIndex(selectedExerciseIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (selectedExerciseIndex < workout.exercises.length - 1) {
      setSelectedExerciseIndex(selectedExerciseIndex + 1);
    }
  };

  const handlePauseClick = () => {
    setIsPaused(!isPaused);
  };

  const handleModalClose = () => {
    blocker.reset();
  };

  const handleComplete = () => {
    const formatTime = (timeInSeconds) => {
      const date = new Date(0);
      date.setSeconds(timeInSeconds); // specify value for SECONDS here
      const timeString = date.toISOString().substr(11, 8);
      return timeString;
    };

    setIsWorkingOut(false);
    if (dayId && workout.completed === false) {
      toggleWorkoutComplete([dayId, workout._id]);
    }

    const workoutData = {
      dateCompleted: new Date(),
      programId: programId,
      workoutId: workout._id,
      duration: formatTime(elapsedTime),
    };

    addWorkoutHistory(["workoutHistory"], workoutData);
    blocker.proceed();
  };

  const handleDelete = () => {
    blocker.proceed();
  };

  return (
    <PageContainer>
      <WorkoutActionModal
        isOpen={blocker.state === "blocked"}
        onClose={handleModalClose}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />
      <WorkoutTimer
        workoutName={workout.workoutName}
        isPaused={isPaused}
        elapsedTime={elapsedTime}
        setElapsedTime={setElapsedTime}
      />
      <div className="border rounded-lg mt-3 flex justify-center items-center h-full">
        <img
          className="h-40"
          src={workout.exercises[selectedExerciseIndex].exercise.gifUrl}
          alt={workout.exercises[selectedExerciseIndex].exercise.name}
        />
      </div>
      <ScrollableExerciseList
        workout={workout}
        completedExercises={completedExercises}
        handleToggleComplete={handleToggleComplete}
        handleExerciseClick={handleExerciseClick}
        selectedExerciseIndex={selectedExerciseIndex}
      />
      <WorkoutControlBar
        handlePreviousClick={handlePreviousClick}
        handlePauseClick={handlePauseClick}
        handleNextClick={handleNextClick}
        isPaused={isPaused}
      />
    </PageContainer>
  );
};

export default WorkingOut;
