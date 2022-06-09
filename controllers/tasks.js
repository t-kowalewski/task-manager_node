const Task = require('../models/task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    // const task = await Task.findById(req.params.id);
    res.status(200).json({ task });
  } catch (err) {
    res.status(404).json({ msg: `Task with id ${req.params.id} not found` });
  }
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
