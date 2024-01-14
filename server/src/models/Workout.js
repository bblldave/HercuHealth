const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  workoutName: { type: String, required: true },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
  day: { type: mongoose.Schema.Types.ObjectId, ref: 'Day', required: false },
  durationMinutes: { type: Number, required: true },
});

module.exports = mongoose.model('Workout', workoutSchema);
