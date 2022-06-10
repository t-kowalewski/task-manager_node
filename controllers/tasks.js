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
    // const task = await Task.findOne({ _id: req.params.id });
    const task = await Task.findById(req.params.id);
    // find..() returns null if search query has same length as correct id but can't be found - we handle it
    if (!task) {
      return res
        .status(404)
        .json({ msg: `Task with id ${req.params.id} not found` });
    }

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
    res.status(400).json({ completed: false, msg: err.message });
  }
};

const editTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({
        completed: false,
        msg: `task with id ${req.params.id} not found`,
      });
    }

    res.status(201).json({ completed: true, task });
  } catch (err) {
    res.status(500).json({
      completed: false,
      msg: err,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedObj = await Task.findOneAndDelete({ _id: req.params.id });
    if (!deletedObj) {
      return res
        .status(404)
        .json({ msg: `task with id ${req.params.id} not found` });
    }

    res.status(200).json({ completed: true, deletedObj });
  } catch (err) {
    res.status(404).json({ msg: `task with id ${req.params.id} not found` });
  }
};

module.exports = { getTasks, getTask, addTask, editTask, deleteTask };
