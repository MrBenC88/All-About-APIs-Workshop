const express = require("express"); // node.js web app framework
const cors = require("cors"); // middleware for Express
const mongoose = require("mongoose"); // helps connect to mongodb database

require("dotenv").config(); // allows you to separate secrets from your source code - important for .ENV file.

const app = express();
const port = process.env.PORT || 5000; // whatever is in the environment variable PORT, or 5000 if there's nothing there.

app.use(cors());
app.use(express.json()); //  method inbuilt in express to recognize the incoming Request Object as a JSON Object.

const uri = process.env.ATLAS_URI; // get from mongodb dashboard

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }); // pass in that mongodb via uri variable
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.get("/", function (req, res) {
  return res.send("Hello world");
});

const userRouter = require("./routes/users");

app.use("/users", userRouter);

// Pass in our defined port variable so our server can accept a parameter from the environment and what port to listen to
// Log to console to confirm it is running.
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
