const mongoose = require('mongoose');

const weekSchema = new mongoose.Schema({
  program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true},
  weekNumber: { type: Number, require: true},
  days: [{type: mongoose.Schema.Types.ObjectId, ref: 'Day'}]
});

module.exports = mongoose.model('Week', weekSchema);