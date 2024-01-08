import React from "react";
import ProgramCard from "./ProgramCard";
import useActivePrograms from "../hooks/useActivePrograms";

const ActiveProgramsList = () => {
  const { activePrograms, loading, error } = useActivePrograms();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 className="text-lg font-bold px-6 py-2">Active Programs</h2>
      {activePrograms.map((program, index) => (
        <ProgramCard key={index} {...program} />
      ))}
    </div>
  );
};

export default ActiveProgramsList;
