import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import NavBar from './components/layout/NavBar';
import Program from './pages/Program';
import Workout from './pages/Workout';
import WorkingOut from './pages/WorkingOut';
import { Outlet } from 'react-router-dom';


const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
