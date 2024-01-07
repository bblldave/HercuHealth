const mongoose = require('mongoose');

const workoutHistorySchema = new mongoose.Schema({
  dateCompleted: { type: Date, default: Date.now },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: false },
  workoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
  duration: String,
});

module.exports = mongoose.model('WorkoutHistory', workoutHistorySchema);