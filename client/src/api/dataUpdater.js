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

const endPoints = {
  toggleWorkoutComplete: toggleWorkoutComplete,
  addExerciseLog: addExerciseLog
}

export { dataUpdater, endPoints };