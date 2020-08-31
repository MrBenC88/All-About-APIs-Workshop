/**
 * This is our actual server file. This server is where we connect the MongoDB database and define the routes that we would use.
 *
 * Setup required frameworks.
 * We will be building an Express Web Application using Node.js
 *
 * We wil require the following:
 * express: node.js web app framework
 * cors: middleware for Express
 * mongoose: used for MongoDB and helps connect to mongodb database
 * dotenv: allows you to separate secrets from your source code - important for .ENV file.
 *
 * To run the server, first we need to install the dependencies. In step 1, with npm install you can easily install all the dependencies required as we have written a script in the package.json to help simplify this process.
 * Next, you must (in your command terminal) navigate into the backend folder. (cd backend). Finally, to run the server, simply type nodemon server in the backend folder.
 *
 * How to run the server:
 * 1. npm install
 * 2. cd backend
 * 3. nodemon server
 *  */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//Define our Route
const userRouter = require("./routes/users");

// Call the express function, express() and puts the new Express application inside the app variable
// We also define the port we will be using for our web server to listen on. In this case either a currently in use port or port 5000.
const app = express();
const port = process.env.PORT || 5000;

/**
 * cors is our middleware for Express.
 * express.json is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
 */
app.use(cors());
app.use(express.json());

//uri holds our credentials to access the MongoDB Database. You obtain this from the MongoDB Dashboard.
// The actual credentials are stored in a .env file which you will have to create yourself within the backend directory (.\nwPlus Backend Workshop\backend ).

//TODO #1
const uri = process.env.ATLAS_URI;

//Connect to your Database
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;

//Confirm Connection
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Simple Route
app.get("/hello", function (req, res) {
  return res.send("Hello world");
});

// For all routes using the user schema, need append /users to the url.
// ie. http://localhost:5000/users/
app.use("/users", userRouter);

// Pass in our defined port variable so our server can accept a parameter from the environment and what port to listen to
// Log to console to confirm it is running.
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
