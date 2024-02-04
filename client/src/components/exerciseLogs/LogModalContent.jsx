import React from "react";
import AddExerciseLogForm from "./AddExerciseLogForm";

const LogModalContent = ({
  exercises,
  setExercises,
  itemType,
  exerciseType,
}) => {
  if (!exercises) return null;
  return (
    <>
      {exercises.map((exercise) => (
        <div key={exercise._id} className="mt-4">
          <p className="font-semibold mb-1">{exercise.name}</p>
          <div className="grid grid-cols-4 gap-4 text-gray-400">
            {exercise.logs && exercise.logs.length > 0 ? (
              exercise.logs.map((log) => (
                <React.Fragment key={log._id}>
                  <p>{log.lbs || "-"}</p>
                  <p>{log.reps || "-"}</p>
                  <p>{log.time || "-"}</p>
                  <p>{log.distance || "-"}</p>
                </React.Fragment>
              ))
            ) : (
              <p>No Logs Found</p>
            )}
          </div>
          <hr className="my-2 border-t-4" />
        </div>
      ))}
      {itemType === "exercise" && exercises.length > 0 && (
        <AddExerciseLogForm
          exerciseId={exercises[0]._id}
          exerciseType={exerciseType}
          setExercises={setExercises}
        />
      )}
    </>
  );
};

export default LogModalContent;
