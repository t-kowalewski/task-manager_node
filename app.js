const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');

// Routes
// app.get('/hello', (req, res) => {
//   res.send('Hello there');
// });

// middleware to parse json data
app.use(express.json());

// Use router middleware
app.use('/api/v1/tasks', tasksRouter);

// app.get('/api/v1/tasks') - get all tasks
// app.get('/api/v1/tasks/:id') - get one task
// app.post('/api/v1/tasks/') - add one task
// app.patch('/api/v1/tasks/:id') - edit one task
// app.delete('/api/v1/tasks/:id') - delete one task

const port = 3000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
