const getTasks = (req, res) => {
  res.status(200).send('List of all tasks');
};

const getTask = (req, res) => {
  res.json({ id: req.params.id });
};

const addTask = (req, res) => {
  res.json(req.body);
};

const editTask = (req, res) => {
  res.send('Edit task');
};

const deleteTask = (req, res) => {
  res.send('Delete task');
};

module.exports = { getTasks, getTask, addTask, editTask, deleteTask };
