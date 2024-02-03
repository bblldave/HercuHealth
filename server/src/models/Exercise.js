const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: false },
  logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExerciseLog' }],
  bodyPart: { type: String, required: true },
  equipment: { type: String, required: true },
  gifUrl: { type: String, required: true },
  target: { type: String, required: true },
  secondaryMuscles: [{ type: String, required: true }],
});

module.exports = mongoose.model('Exercise', exerciseSchema);
