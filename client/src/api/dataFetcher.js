import axios from "axios";

const dataFetcher = axios.create({
  baseURL: 'http://localhost:3001/api/',
  withCredentials: true
});

const getActivePrograms = () => {
  return dataFetcher.get('userProfile/activePrograms');
};

const getWorkoutHistory = () => {
  return dataFetcher.get('userProfile/workoutHistory');
}

const getActiveProgramById = (id) => {
  return dataFetcher.get(`programs/${id}`);
}

const getWorkoutById = (id) => {
  return dataFetcher.get(`workouts/${id}`);
}

const endPoints = {
  getActivePrograms: getActivePrograms,
  getActiveProgramById: getActiveProgramById,
  getWorkoutHistory: getWorkoutHistory,
  getWorkoutById: getWorkoutById,
}

export { dataFetcher, endPoints };