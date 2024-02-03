import React from "react";
import LogModalHeader from "./LogModalHeader";
import LogModalContent from "./LogModalContent";

const LogModal = ({ onClose, workout }) => {
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
        <h1 className="text-xl">Exercise Logs</h1>
        <div>
          <LogModalHeader workoutName={workout.workoutName} />
          <LogModalContent exercises={workout.exercises} />
        </div>
      </div>
    </>
  );
};

export default LogModal;
