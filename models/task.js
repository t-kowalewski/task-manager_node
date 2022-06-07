const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'is required'],
    trim: true,
    minlength: [3, 'can not be shorter then 3 characters'],
    maxlength: [30, 'can not be longer then 30 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
