const mongoose = require('mongoose');

const dayWorkoutSchema = new mongoose.Schema({
  workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout'},
  completed: { type: Boolean, default: false },
});

const daySchema = new mongoose.Schema({
  week: { type: mongoose.Schema.Types.ObjectId, ref: 'Week', require: true},
  dayOfWeek: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  workouts: [dayWorkoutSchema]
});

module.exports = mongoose.model('Day', daySchema);