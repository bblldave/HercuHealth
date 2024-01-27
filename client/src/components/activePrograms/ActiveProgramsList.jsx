import React from "react";
import ProgramCard from "../programs/ProgramCard";
import useFetchData from "../../api/useFetchData";
import { Link } from "react-router-dom";

const ActiveProgramsList = () => {
  const {
    data: activePrograms,
    loading,
    error,
  } = useFetchData("getActivePrograms");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 className="text-lg font-bold px-6 py-2">Active Programs</h2>
      {activePrograms.map((program, index) => (
        <Link to={`/program/${program._id}`} key={index}>
          <ProgramCard key={index} {...program} />
        </Link>
      ))}
    </div>
  );
};

export default ActiveProgramsList;
