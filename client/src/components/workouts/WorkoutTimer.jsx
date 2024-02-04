import { useState, useEffect } from "react";

const WorkoutTimer = ({ workoutName, isPaused }) => {
  const [countdown, setCountdown] = useState(5);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds - minutes * 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setIsWorkoutStarted(true);
    }
  }, [countdown]);

  useEffect(() => {
    let workoutInterval = null;

    if (isWorkoutStarted && !isPaused) {
      workoutInterval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }

    return () => {
      if (workoutInterval) {
        clearInterval(workoutInterval);
      }
    };
  }, [isWorkoutStarted, isPaused]);

  return (
    <div className="border rounded-lg p-3 flex flex-col items-center justify-center">
      {isWorkoutStarted ? (
        <>
          <div className="text-gray-400 text-xl">{workoutName}</div>
          <div className="text-xl font-bold">{formatTime(elapsedTime)}</div>
        </>
      ) : (
        <div>Starting in: {countdown} seconds</div>
      )}
    </div>
  );
};

export default WorkoutTimer;