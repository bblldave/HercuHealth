const mongoose = require('mongoose');

const WorkoutExerciseSchema = new mongoose.Schema({
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
  exerciseType: { type: String, enum: ['sets', 'duration', 'distance'], required: true },
  sets: { type: Number, required: function () { return this.exerciseType === 'sets'; } },
  reps: { type: Number, required: function () { return this.exerciseType === 'sets'; } },
  duration: { type: String, required: function () { return this.exerciseType === 'duration'; } }, // e.g., '30min'
  distance: { type: String, required: function () { return this.exerciseType === 'distance'; } }, // e.g., '5km'
});


const workoutSchema = new mongoose.Schema({
  workoutName: { type: String, required: true },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutExercise' }],
  day: { type: mongoose.Schema.Types.ObjectId, ref: 'Day', required: false },
  durationMinutes: { type: Number, required: true },
  equipment: [{ type: String, required: false }],
  targets: [{ type: String, required: false }],
});

module.exports = {
  Workout: mongoose.model('Workout', workoutSchema),
  WorkoutExercise: mongoose.model('WorkoutExercise', WorkoutExerciseSchema)
}
