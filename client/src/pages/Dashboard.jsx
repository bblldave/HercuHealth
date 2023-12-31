import React from "react";
import ActiveProgramsList  from "../components/ActiveProgramsList";
import HistoryCalendar  from "../components/HistoryCalendar";
import HistoryList  from "../components/HistoryList";

const Dashboard = () => {
  return (
    <div className="container flex flex-col justify-center align-middle mx-auto">
      <ActiveProgramsList />
      <HistoryCalendar />
      <HistoryList />
    </div>
  );
};

export default Dashboard;
