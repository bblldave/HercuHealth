import { useState } from "react";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import LoadingSpinner from "../shared/LoadingSpinner";

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
    <div onClick={handleClick} className="flex align-middle items-center justify-center p-2">
      {completed ? (
        <AiFillCheckCircle className="text-green-500 cursor-pointer text-2xl" />
      ) : (
        <AiOutlineCheckCircle className="text-gray-500 cursor-pointer text-2xl" />
      )}
    </div>
  );
};

export default WorkoutStatusToggle;
