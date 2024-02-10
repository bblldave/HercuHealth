import axios from "axios";

const dataUpdater = axios.create({
  baseURL: 'http://localhost:3001/api/',
  withCredentials: true
});

const toggleWorkoutComplete = (path) => {
  return dataUpdater.patch(`workouts/toggle-completed/${path}`);
}

const addExerciseLog = (path, data) => {
  return dataUpdater.post(`exerciseLogs/${path}`, data);
}

const addWorkoutHistory = (path, data) => {
  return dataUpdater.post(`userProfile/${path}`, data);
}

const endPoints = {
  toggleWorkoutComplete: toggleWorkoutComplete,
  addExerciseLog: addExerciseLog,
  addWorkoutHistory: addWorkoutHistory
}

export { dataUpdater, endPoints };