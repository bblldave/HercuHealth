const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  workoutName: { type: String, required: true },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
  day: { type: mongoose.Schema.Types.ObjectId, ref: 'Day', required: false }, // Optional reference to Day
});

module.exports = mongoose.model('Workout', workoutSchema);
