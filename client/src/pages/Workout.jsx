import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import HeadingCard from "../components/HeadingCard";
import useFetchData from "../api/useFetchData";
import WorkoutDetails from "../components/WorkoutDetails";

const Workout = () => {
  const [workout, setWorkout] = React.useState(null);

  const { id: workoutId } = useParams();

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!workout) return <div>Workout not found</div>;

  return (
    <div className="container mx-auto flex flex-col justify-center align-middle p-4">
      <HeadingCard title="Workout" header={workout.workoutName} />
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-xl">
        Start Workout
      </button>
      <pre className=" my-4 whitespace-pre-line font-sans break-words">
        This is a test description. Description needs to be added to the workout
        model
      </pre>

      <WorkoutDetails />

      <button className="border-2 border-blue-400 hover:bg-blue-500 text-blue-400 hover:text-white font-bold py-2 px-4 mt-4 rounded-xl bg-transparent">
        View Logs
      </button>

      <h2 className="text-2xl font-bold py-2 mt-8">Exercises</h2>
      <div>Exercise List</div>
    </div>
  );
};

export default Workout;
