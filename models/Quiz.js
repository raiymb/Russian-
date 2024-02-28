const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct_option_index: { type: Number, required: true },
  mark: { type: Number, required: true }
});

module.exports = mongoose.model('Quiz', quizSchema);
