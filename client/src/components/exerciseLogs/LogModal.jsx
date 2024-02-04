import React, { useState, useEffect } from "react";
import useFetchData from "../../api/useFetchData";
import LogModalHeader from "./LogModalHeader";
import LogModalContent from "./LogModalContent";
import LoadingSpinner from "../shared/LoadingSpinner";

const LogModal = ({ onClose, itemType, itemId }) => {
  const identifier =
    itemType === "workout"
      ? "getExerciseLogsByWorkoutId"
      : "getExerciseLogsByExerciseId";
  const { data, loading, error } = useFetchData(identifier, itemId);

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (data && data.exercises) {
      setExercises(data.exercises);
    }
  }, [data]);

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className="fixed inset-10 bg-white border border-black rounded-lg p-6 overflow-auto z-20">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-lg font-bold"
        >
          X
        </button>
        <h1 className="text-xl"> Logs</h1>
        {loading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          <div>
            <LogModalHeader workoutName={data.name} />
            <LogModalContent
              exercises={exercises}
              setExercises={setExercises}
              itemType={itemType}
              exerciseType={data.exerciseType}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default LogModal;
