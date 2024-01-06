const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  name: String,
  description: String,
  durationWeeks: Number,
  weeks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Week' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }

});

module.exports = mongoose.model('Program', programSchema);