const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  week: { type: mongoose.Schema.Types.ObjectId, ref: 'Week', require: true},
  dayOfWeek: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout'}]
});

module.exports = mongoose.model('Day', daySchema);