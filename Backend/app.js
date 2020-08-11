const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require('./utils/config');
const usersRouter = require('./routes/users');

// initialize express app
const app = express();

// connect to database
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB database connection established successfully');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', usersRouter);
app.get('/', (request, response) => 
 response.send('Hello world')
);

module.exports = app;