const mongoose = require('mongoose');

const exerciseLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  performedDate: { type: Date, default: Date.now },
  reps: Number,
  weight: Number,
  duration: String, // e.g., '30min'
  distance: String, // e.g., '5km'
});

module.exports = mongoose.model('ExerciseLog', exerciseLogSchema);
