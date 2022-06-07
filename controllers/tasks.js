const Task = require('../models/task');

const getTasks = (req, res) => {
  res.status(200).send('List of all tasks');
};

const getTask = (req, res) => {
  res.json({ id: req.params.id });
};

const addTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(400).json({ compleated: false, msg: err.message });
  }
};

const editTask = (req, res) => {
  res.send('Edit task');
};

const deleteTask = (req, res) => {
  res.send('Delete task');
};

module.exports = { getTasks, getTask, addTask, editTask, deleteTask };
