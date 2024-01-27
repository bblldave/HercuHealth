import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Program from "./Program";

jest.mock("../components/layout/PageContainer", () => () => (
  <div>PageContainer</div>
));
jest.mock("../components/shared/HeadingCard", () => () => (
  <div>HeadingCard</div>
));
jest.mock("../components/programs/ProgramWorkoutWrapper", () => () => (
  <div>ProgramWorkoutWrapper</div>
));
jest.mock("../api/useFetchData", () => () => ({
  data: {
    name: "Test Program",
    description: "Test Description",
    weeks: [],
  },
  loading: false,
  error: null,
}));

test("Program renders without crashing", () => {
  render(
    <Router>
      <Program />
    </Router>
  );
  expect(screen.getByText("HeadingCard")).toBeInTheDocument();
  expect(screen.getByText("ProgramWorkoutWrapper")).toBeInTheDocument();
});
