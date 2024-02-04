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

const getExerciseLogsByExerciseId = (id) => {
  return dataFetcher.get(`exerciseLogs/exercises/${id}`);
}

const getExerciseLogsByWorkoutId = (id) => { 
  return dataFetcher.get(`exerciseLogs/workouts/${id}`);
}

const endPoints = {
  getActivePrograms: getActivePrograms,
  getActiveProgramById: getActiveProgramById,
  getWorkoutHistory: getWorkoutHistory,
  getWorkoutById: getWorkoutById,
  getExerciseLogsByExerciseId: getExerciseLogsByExerciseId,
  getExerciseLogsByWorkoutId: getExerciseLogsByWorkoutId
}

export { dataFetcher, endPoints };