import React, { useState } from "react";
import useUpdateData from "../../api/useUpdateData";

const AddExerciseLogForm = ({ exerciseId, exerciseType, setExercises }) => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const { updateData } = useUpdateData("addExerciseLog");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data to be sent to the backend
    const logData = {
      reps,
      weight,
      duration,
      distance,
      exercise: exerciseId,
    };

    try {
      const createdLog = await updateData(["create"], logData);

      // Add the created log to the exercises state
      setExercises((prevExercises) => {
        return prevExercises.map((exercise) => {
          if (exercise._id === exerciseId) {
            const updatedLogs = [createdLog.newExerciseLog, ...exercise.logs];
            return {
              ...exercise,
              logs: updatedLogs.slice(0, 3), // Only take the first 3 logs
            };
          } else {
            return exercise;
          }
        });
      });
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  return (
    <div className="border rounded-xl p-4 my-8">
      <p>Add New Entry</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {exerciseType === "sets" && (
          <>
            <div className="flex flex-col">
              <label className="text-blue-500">Reps:</label>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="border-2 border-blue-500 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-blue-500">Weight (lbs):</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="border-2 border-blue-500 rounded-md p-2"
              />
            </div>
          </>
        )}
        {exerciseType === "duration" && (
          <div className="flex flex-col">
            <label className="text-blue-500">Time:</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border-2 border-blue-500 rounded-md p-2"
            />
          </div>
        )}
        {exerciseType === "distance" && (
          <>
            <div className="flex flex-col">
              <label className="text-blue-500">Time:</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="border-2 border-blue-500 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-blue-500">Distance:</label>
              <input
                type="text"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="border-2 border-blue-500 rounded-md p-2"
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 w-full"
        >
          Add Log
        </button>
      </form>
    </div>
  );
};

export default AddExerciseLogForm;
