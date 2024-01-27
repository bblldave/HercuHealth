import React from "react";
import ActiveProgramsList from "../components/activePrograms/ActiveProgramsList";
import DashboardHistoryWrapper from "../components/workoutHistory/DashboardHistoryWrapper";

const Dashboard = () => {
  return (
    <div className="container flex flex-col justify-center align-middle mx-auto">
      <ActiveProgramsList />
      <DashboardHistoryWrapper />
    </div>
  );
};

export default Dashboard;
