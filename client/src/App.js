import ActiveProgramsList from "./components/ActiveProgramsList";
import HistoryCalendar from "./components/HistoryCalendar";

function App() {
  return (
    <div className="container flex flex-col justify-center align-middle mx-auto">
      <ActiveProgramsList />
      <HistoryCalendar/>
    </div>
  );
}

export default App;
