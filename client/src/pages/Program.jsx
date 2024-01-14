import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProgramHeadingCard from "../components/ProgramHeadingCard";
import useFetchData from "../api/useFetchData";
import ProgramWorkoutWrapper from "../components/ProgramWorkoutWrapper";

const Program = () => {
  const [program, setProgram] = React.useState(null);

  const { id: programId } = useParams();
  const {
    data: programData,
    loading,
    error,
  } = useFetchData("getActiveProgramById", programId);

  useEffect(() => {
    if (programId && programData) {
      setProgram(programData);
    }
  }, [programId, programData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!program) return <div>Program not found</div>;

  return (
    <div className="container mx-auto flex flex-col justify-center align-middle">
      <ProgramHeadingCard programName={program.name} />
      <p className="mx-7 my-4">
        You've reached phase 3! Chris and Luke are going to help you take the
        strength, size and skills you’ve developed, and push it even further.
        Get the lowdown on all the new lifts via the tutorials and stretching
        sessions before you raise a barbell. Ready to sweat it out with Bobby?
      </p>
      <ProgramWorkoutWrapper weeks={program.weeks} isActiveProgram={true} />
    </div>
  );
};

export default Program;
