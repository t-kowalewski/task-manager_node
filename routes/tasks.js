const express = require('express');
const router = express.Router();

// Import controllers
const {
  getTasks,
  getTask,
  addTask,
  editTask,
  deleteTask,
} = require('../controllers/tasks');

// Routes
router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', addTask);
router.patch('/:id', editTask);
router.delete('/:id', deleteTask);

module.exports = router;
