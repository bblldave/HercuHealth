import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import HeadingCard from "../components/shared/HeadingCard";
import useFetchData from "../api/useFetchData";
import ProgramWorkoutWrapper from "../components/programs/ProgramWorkoutWrapper";
import PageContainer from "../components/layout/PageContainer";

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
    <PageContainer>
      <HeadingCard title="Program" header={program.name} />
      <pre className="my-4 whitespace-pre-line font-sans break-words">
        {program.description ? program.description : "No description"}
      </pre>

      <ProgramWorkoutWrapper
        weeks={program.weeks}
        isActiveProgram={true}
        programId={program._id}
      />
    </PageContainer>
  );
};

export default Program;
