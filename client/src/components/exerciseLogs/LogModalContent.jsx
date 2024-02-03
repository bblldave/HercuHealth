import React from "react";

const LogModalContent = (exercises) => {
  console.log(exercises);
  return (
    <>
      {exercises.exercises.map((exercise) => (
        <div key={exercise._id} className="mt-4">
          <p className="font-semibold mb-1">{exercise.name}</p>
          <div className="grid grid-cols-4 gap-4 text-gray-400">
            {exercise.logs.map((log) => (
              <React.Fragment key={log._id}>
                <p>{log.lbs || "-"}</p>
                <p>{log.reps || "-"}</p>
                <p>{log.time || "-"}</p>
                <p>{log.distance || "-"}</p>
              </React.Fragment>
            ))}
          </div>
          <hr className="my-2 border-t-4" />
        </div>
      ))}
    </>
  );
};

export default LogModalContent;
