import React from "react";
import HistoryCalendar from "./HistoryCalendar";
import HistoryList from "./HistoryList";
import useFetchData from "../../api/useFetchData";

const DashboardHistoryWrapper = () => {
  const {
    data: workoutHistory,
    loading,
    error,
  } = useFetchData("getWorkoutHistory");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <HistoryCalendar completedWorkouts={workoutHistory} />
      <HistoryList completedWorkouts={workoutHistory} />
    </>
  );
};

export default DashboardHistoryWrapper;
