import { useState } from "react";
import WorkoutStatusToggle from "../workouts/WorkoutStatusToggle";
import ExerciseCard from "../exercises/ExerciseCard";
import { AiOutlineFileText } from "react-icons/ai";
import LogModal from "../exerciseLogs/LogModal";

const ScrollableExerciseList = ({
  workout,
  completedExercises,
  handleToggleComplete,
  handleExerciseClick,
  selectedExerciseIndex,
}) => {
  const [openLogModalIndex, setOpenLogModalIndex] = useState(null);

  const handleOpenLogModal = (index) => {
    setOpenLogModalIndex(index);
  };

  const handleCloseLogModal = () => {
    setOpenLogModalIndex(null);
  };

  return (
    <div className="overflow-auto h-full">
      {workout.exercises.map((exercise, index) => {
        const isCompleted = completedExercises.includes(exercise.exercise);
        return (
          <div className="flex items-center mt-3" key={index}>
            <WorkoutStatusToggle
              completed={isCompleted}
              onToggle={() => handleToggleComplete(exercise.exercise, index)}
            />

            <div
              onClick={() => handleExerciseClick(index)}
              className={
                index === selectedExerciseIndex
                  ? "bg-blue-300 border rounded-lg  flex-1 "
                  : "flex-1"
              }
            >
              <ExerciseCard exercise={exercise} openable={false} />
            </div>
            <div
              onClick={() => handleOpenLogModal(index)}
              className="flex align-middle items-center justify-center p-2"
            >
              <AiOutlineFileText className="text-2xl" />
            </div>

            {openLogModalIndex === index && (
              <LogModal
                onClose={handleCloseLogModal}
                itemId={exercise._id}
                itemType="exercise"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ScrollableExerciseList;
