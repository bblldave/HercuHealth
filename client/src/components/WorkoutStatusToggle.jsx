import { useState } from "react";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import LoadingSpinner from "./LoadingSpinner";

const WorkoutStatusToggle = ({ completed, onToggle }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onToggle();
    setLoading(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div onClick={handleClick}>
      {completed ? (
        <AiFillCheckCircle className="text-green-500 mr-2 cursor-pointer" />
      ) : (
        <AiOutlineCheckCircle className="text-gray-500 mr-2 cursor-pointer" />
      )}
    </div>
  );
};

export default WorkoutStatusToggle;
