import React from "react";

const HeadingCard = ({ title, header }) => {
  return (
    <div className="p-4 rounded-lg border mb-2 my-4">
      <p className="">Program</p>
      <p className="font-semibold text-2xl">{header}</p>
    </div>
  );
};

export default HeadingCard;
