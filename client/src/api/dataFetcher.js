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

const endPoints = {
  getActivePrograms: getActivePrograms,
  getWorkoutHistory: getWorkoutHistory
}

export { dataFetcher, endPoints };