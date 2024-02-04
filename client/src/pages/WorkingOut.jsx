import { useState, useEffect } from "react";
import { useLocation, useBlocker } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import WorkoutTimer from "../components/workouts/WorkoutTimer";
import WorkoutControlBar from "../components/workouts/WorkoutControlBar";
import ScrollableExerciseList from "../components/exercises/ScrollableExerciseList";
import WorkoutActionModal from "../components/workouts/WorkoutActionModal";

const WorkingOut = () => {
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isWorkingOut, setIsWorkingOut] = useState(true);
  const location = useLocation();
  const workout = location.state.workout;

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
      <WorkoutTimer workoutName={workout.workoutName} isPaused={isPaused} />
      <div className="border rounded-lg mt-3">
        <img
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
