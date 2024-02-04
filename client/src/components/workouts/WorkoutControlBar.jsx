import React from "react";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { AiOutlineCaretRight } from "react-icons/ai";
import { AiOutlineCaretLeft } from "react-icons/ai";

const WorkoutControlBar = ({
  handlePreviousClick,
  handlePauseClick,
  handleNextClick,
  isPaused,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-between p-4 shadow-lg border">
      <button onClick={handlePreviousClick}>
        <AiOutlineCaretLeft size={50} />
      </button>
      <button onClick={handlePauseClick}>
        {isPaused ? <AiOutlinePlayCircle size={50} /> : <AiOutlinePauseCircle size={50} />}
      </button>
      <button onClick={handleNextClick}>
        <AiOutlineCaretRight size={50}/>
      </button>
    </div>
  );
};

export default WorkoutControlBar;
