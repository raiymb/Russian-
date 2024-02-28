const mongoose = require('mongoose');

const readingQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct_option_index: { type: Number, required: true },
  mark: { type: Number, required: true }
});

const readingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  questions: [readingQuestionSchema]
});

module.exports = mongoose.model('Reading', readingSchema);
