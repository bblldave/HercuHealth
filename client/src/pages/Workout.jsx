import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import HeadingCard from "../components/shared/HeadingCard";
import useFetchData from "../api/useFetchData";
import WorkoutDetails from "../components/workouts/WorkoutDetails";
import ExerciseList from "../components/exercises/ExerciseList";
import LogModal from "../components/exerciseLogs/LogModal";

const Workout = (props) => {
  const [workout, setWorkout] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const programId = props.location?.state?.programId;

  const { id: workoutId } = useParams();

  const navigate = useNavigate();

  const {
    data: workoutData,
    loading,
    error,
  } = useFetchData("getWorkoutById", workoutId);

  useEffect(() => {
    if (workoutId && workoutData) {
      setWorkout(workoutData);
    }
  }, [workoutId, workoutData]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!workout) return <div>Workout not found</div>;

  return (
    <div className="container mx-auto flex flex-col justify-center align-middle p-4">
      <HeadingCard title="Workout" header={workout.workoutName} />
      <button
        onClick={() =>
          navigate("/workingOut", {
            state: { workout, dayId: workout.day, programId },
          })
        }
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-xl"
      >
        Start Workout
      </button>
      <pre className=" my-4 whitespace-pre-line font-sans break-words">
        This is a test description. Description needs to be added to the workout
        model
      </pre>

      <WorkoutDetails
        equipment={workout.equipment}
        targets={workout.targets}
        duration={workout.durationMinutes}
      />

      <button
        onClick={handleOpenModal}
        className="border-2 border-blue-400 hover:bg-blue-500 text-blue-400 hover:text-white font-bold py-2 px-4 mt-4 rounded-xl bg-transparent"
      >
        View Logs
      </button>

      {isModalOpen && (
        <LogModal
          onClose={handleCloseModal}
          itemId={workout._id}
          itemType={"workout"}
        />
      )}

      <h2 className="text-2xl font-bold py-2 mt-8">Exercises</h2>
      <ExerciseList exercises={workout.exercises} />
    </div>
  );
};

export default Workout;
