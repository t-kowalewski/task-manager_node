require('dotenv').config();
// console.log(process.env);
const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');
const { connectToDB } = require('./db/connect');

// Routes & Middleware
// middleware to serve static files
app.use(express.static('./public'));

// middleware to parse json data
app.use(express.json());

// use router middleware
app.use('/api/v1/tasks', tasksRouter);

// app.get('/api/v1/tasks') - get all tasks
// app.get('/api/v1/tasks/:id') - get one task
// app.post('/api/v1/tasks/') - add one task
// app.patch('/api/v1/tasks/:id') - edit one task
// app.delete('/api/v1/tasks/:id') - delete one task

const port = 3000;

const startApp = () => {
  connectToDB(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to DB');

      app.listen(port, () => {
        console.log(`server is listening on port ${port}...`);
      });
    })
    .catch((err) => {
      console.log(`Ups, wast able to connect to DB: ${err}`);
    });
};

startApp();
