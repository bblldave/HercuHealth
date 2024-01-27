import React from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { FaDumbbell } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";

const WorkoutDetails = ({ equipment, targets, duration }) => {

  return (
    <div className="flex flex-col">
      <div className="flex align-middle justify-between">
        <div className="flex flex-1 items-center">
          <AiFillClockCircle className="mr-1" />
          <p>TIME</p>
        </div>
        <div className="flex flex-1">
          <p>{duration} MIN </p>
        </div>
      </div>
      <hr className="my-2 border-t-4" />
      <div className="flex align-middle justify-between">
        <div className="flex flex-1 items-center">
          <FaDumbbell className="mr-1" />
          <p>Equipment</p>
        </div>
        <div className="flex flex-1 flex-wrap">
          {equipment && equipment
            .map((item, index) => <p key={index}>{item}</p>)
            .reduce((prev, curr, index) => [prev, " - ", curr])}
        </div>
      </div>
      <hr className="my-2 border-t-4" />
      <div className="flex align-middle justify-between">
        <div className="flex flex-1 items-center">
          <FiTarget className="mr-1" />
          <p>Targets</p>
        </div>
        <div className="flex flex-1 flex-wrap">
          {targets && targets
            .map((item, index) => <p key={index}>{item}</p>)
            .reduce((prev, curr, index) => [prev, " - ", curr])}
        </div>
      </div>
      <hr className="my-2 border-t-4" />
    </div>
  );
};

export default WorkoutDetails;
