import axios from "axios";

const dataUpdater = axios.create({
  baseURL: 'http://localhost:3001/api/',
  withCredentials: true
});

const toggleWorkoutComplete = (path) => {
  return dataUpdater.patch(`workouts/toggle-completed/${path}`);
}

const endPoints = {
  toggleWorkoutComplete: toggleWorkoutComplete
}

export { dataUpdater, endPoints };