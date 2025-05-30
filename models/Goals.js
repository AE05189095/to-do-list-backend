const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Goals', GoalSchema); 