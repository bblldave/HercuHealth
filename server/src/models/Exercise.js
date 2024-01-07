const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  exerciseType: { type: String, enum: ['sets', 'duration', 'distance'], required: true },
  sets: { type: Number, required: function () { return this.exerciseType === 'sets'; } },
  reps: { type: Number, required: function () { return this.exerciseType === 'sets'; } },
  duration: { type: String, required: function () { return this.exerciseType === 'duration'; } }, // e.g., '30min'
  distance: { type: String, required: function () { return this.exerciseType === 'distance'; } }, // e.g., '5km'
  workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: false },
  logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExerciseLog' }]
});

module.exports = mongoose.model('Exercise', exerciseSchema);
