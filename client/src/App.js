import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import NavBar from './components/NavBar';
import Program from './pages/Program';


const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='/program/:id' element={
            <ProtectedRoute>
              <Program />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </>

  );
}

export default App;
