import React from "react";

const WorkoutActionModal = ({ isOpen, onClose, onComplete, onDelete }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className="fixed inset-10 bg-white border border-black rounded-lg p-6 overflow-auto z-20 flex items-center mx-auto justify-center">
        <div className="flex flex-col">
          <h2 className="text-center mb-5">
            Are you sure you want to exit this workout?
          </h2>
          <button
            className="bg-blue-500 rounded-lg p-3 my-2 text-white"
            onClick={onComplete}
          >
            Complete Workout
          </button>
          <button
            className="border border-red-500 rounded-lg p-3 my-2 text-red-500"
            onClick={onDelete}
          >
            Delete Workout
          </button>
          <button
            className="rounded-lg p-3 my-2 border border-black"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default WorkoutActionModal;
