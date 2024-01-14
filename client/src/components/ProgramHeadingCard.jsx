import React from "react";

const ProgramHeadingCard = ({ programName }) => {
  return (
    <div className="p-4 rounded-lg border mb-2 mx-6 my-4">
      <p className="">Program</p>
      <p className="font-semibold text-2xl">{programName}</p>
    </div>
  );
};

export default ProgramHeadingCard;
