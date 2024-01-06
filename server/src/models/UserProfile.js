const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
  programs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
  exerciseLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExerciseLog' }]

});

module.exports = mongoose.model('UserProfile', userProfileSchema);