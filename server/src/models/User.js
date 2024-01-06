const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passage_id: { type: String, required: true, unique: true, index: true }
});

module.exports = mongoose.model('User', userSchema);