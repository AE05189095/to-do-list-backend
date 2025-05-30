const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  deadline: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Todo', TodoSchema);