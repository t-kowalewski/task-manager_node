require('dotenv').config();
const express = require('express');
const tasksRouter = require('./routes/tasks');
const { connectToDB } = require('./db/connect');
const { notFound } = require('./middleware/not-found');
const app = express();

// Routes & Middleware
// middleware to serve static files
app.use(express.static('./public'));

// middleware to parse json data
app.use(express.json());

// use router middleware
app.use('/api/v1/tasks', tasksRouter);

// handle 404
app.use(notFound);

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
