const getTasks = (req, res) => {
  res.status(200).send('List of all tasks');
};

const getTask = (req, res) => {
  res.send('Showing one task');
};

const addTask = (req, res) => {
  res.send('New task added');
};

const editTask = (req, res) => {
  res.send('Edit task');
};

const deleteTask = (req, res) => {
  res.send('Delete task');
};

module.exports = { getTasks, getTask, addTask, editTask, deleteTask };
