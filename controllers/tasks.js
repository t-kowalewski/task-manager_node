const Task = require('../models/task');
const { asyncWrapper } = require('../middleware/async');

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});
// const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json({ tasks });
//   } catch (err) {
//     res.status(500).json({ msg: err });
//   }
// };

const getTask = asyncWrapper(async (req, res) => {
  // const task = await Task.findOne({ _id: req.params.id });
  const task = await Task.findById(req.params.id);
  // find..() returns null if search query has same length as correct id but can't be found - we handle it
  if (!task) {
    return res
      .status(404)
      .json({ msg: `Task with id ${req.params.id} not found` });
  }

  res.status(200).json({ task });
});

const addTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const editTask = asyncWrapper(async (req, res) => {
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
});

const deleteTask = asyncWrapper(async (req, res) => {
  const deletedObj = await Task.findOneAndDelete({ _id: req.params.id });
  if (!deletedObj) {
    return res
      .status(404)
      .json({ msg: `task with id ${req.params.id} not found` });
  }

  res.status(200).json({ completed: true, deletedObj });
});

module.exports = { getTasks, getTask, addTask, editTask, deleteTask };
