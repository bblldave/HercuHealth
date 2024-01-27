import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

jest.mock("../components/activePrograms/ActiveProgramsList", () => () => (
  <div>ActiveProgramsList</div>
));
jest.mock("../components/workoutHistory/DashboardHistoryWrapper", () => () => (
  <div>DashboardHistoryWrapper</div>
));

test("Dashboard renders without crashing", () => {
  render(<Dashboard />);
  expect(screen.getByText("ActiveProgramsList")).toBeInTheDocument();
  expect(screen.getByText("DashboardHistoryWrapper")).toBeInTheDocument();
});
