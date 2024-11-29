const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskDescription: { type: String },
  assignedTo: { type: String, required: true },
  assignedDate: { type: Date},
  deadlineDate: { type: Date, required: true },
  status: { type: String, enum: ['incomplete', 'completed'], default: 'incomplete' },
});

module.exports = mongoose.model('Task', taskSchema);
