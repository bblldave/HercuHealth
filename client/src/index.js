import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import Program from './pages/Program';
import Workout from './pages/Workout';
import WorkingOut from './pages/WorkingOut';
import reportWebVitals from './reportWebVitals';
import { PassageProvider } from '@passageidentity/passage-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const passageAppId = process.env.REACT_APP_PASSAGE_APP_ID;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: 'program/:id', element: <ProtectedRoute><Program /></ProtectedRoute> },
      { path: 'workout/:id', element: <ProtectedRoute><Workout /></ProtectedRoute> },
      { path: 'workingOut/', element: <ProtectedRoute><WorkingOut /></ProtectedRoute> },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <PassageProvider appId={passageAppId}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </PassageProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();