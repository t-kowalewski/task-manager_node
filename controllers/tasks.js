const Task = require('../models/task');
const { asyncWrapper } = require('../middleware/async');
const { CustomError } = require('../errors/custom-error');

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

const getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  // find..() returns null if search query has same length as correct id but can't be found - we handle it
  if (!task) {
    const error = new CustomError(
      `Task with id ${req.params.id} not found`,
      404
    );
    return next(error);
  }

  res.status(200).json({ task });
});

const addTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const editTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    const error = new CustomError(
      `Task with id ${req.params.id} not found`,
      404
    );
    return next(error);
  }

  res.status(201).json({ completed: true, task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const deletedObj = await Task.findOneAndDelete({ _id: req.params.id });
  if (!deletedObj) {
    const error = new CustomError(
      `Task with id ${req.params.id} not found`,
      404
    );
    return next(error);
  }

  res.status(200).json({ completed: true, deletedObj });
});

module.exports = { getTasks, getTask, addTask, editTask, deleteTask };
