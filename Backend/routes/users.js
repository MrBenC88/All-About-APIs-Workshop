/**
 * This file contains our routes for the user object.
 */

// Define our router variable from Express and User variable which makes use of the MongoDB schema we created.
const router = require("express").Router();
let User = require("../models/user.model");

/**
 * The following blocks of code are different routes.
 * A route is a section of Express code that associates an HTTP verb ( GET , POST , PUT , DELETE , etc.), a URL path/pattern, and a function that is called to handle that pattern.
 * There are several ways to create routes.
 * We will show ways of creating Routes using Express.
 */

/** GET ALL (GET REQUEST)
 *
 * Access via: http://localhost:5000/users/
 *
 * Example route utilizing a get request to get all the users in the database.
 * This route handles incoming HTTP get requests from the /users path
 * User.find() is a mongoose method that gets all the users from mongoose atlas database.
 * For the .then line, after it finds all the users it returns the users in json format that we got from database
 * if there's error - return a error 400 with the message
 */
router.route("/").get((req, res) => {
  User.find() //
    .then((users) => res.json(users)) //
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * GET ALL Alternative (GET REQUEST)
 *
 * Access via: http://localhost:5000/users/all
 *
 * Note that in this route, we simply avoid the router.route and directly call the .get function.
 * As we have already used the "/" path (http://localhost:5000/users/) we will need to use a different path.
 *
 * Instead of returning a json of all the users, it will send a string response in a format other than JSON
 *
 * This is particularly useful.
 * Try it out! Open your browser and paste "http://localhost:5000/users/all)". Make sure you are running the server though.
 */
router.get("/all", (req, res) => {
  //endpoint for accessing all users in database
  User.find()
    .then((users) => res.send(users)) //Note here.
    .catch((err) => console.log(err));
});

/**
 * GET ONE (GET REQUEST)
 *
 * Access via: http://localhost:5000/users/:id
 * Example: http://localhost:5000/users/5f4c647904dcad4a242735e8
 *
 * A route for getting a single user's information based on the user's MongoDB id.
 * The :id is like a variable. This is object id that is created automatically by mongoDB.
 */

// TODO #8 Fill in the missing pieces of code in order to complete the following Route.

router.get("/:id", (req, res) => {
  //endpoint for accessing single user by id in database
  User.findById(req.params.id) // find it by id
    .then((user) => /*Add missing code here*/)
    .catch((err) => /*Add missing code here*/);
 });
 

/**
 * POST ONE (POST REQUEST)
 *
 * Access via: http://localhost:5000/users/add
 *
 * This route is for adding a user to the database. It requires the user schema in JSON format to be filled in and the request set to POST.
 * 
 * Example JSON
 {
	"username": "nwPlus Test User 01",
	"age":99
 }
 */

// TODO #9 Fill in the missing pieces of code in order to complete the following Route.
// Note: The function .save() saves the new user to the database.

router.post("/add", (req, res) => {
  const username = req.body.username; //we assign the username to variable, and create new instance of username
  const age = req.body.age || 0;
  const newUser = new User({
    /**
     * add missing code here
     */
  });
  newUser
    .save() // save the new user to the database
    .then(() => res.json("User added!")) // return prompt that user is added; else return error message
    .catch((err) => res.status(400).json("Error: " + err));
 });
 

/**
 * DELETE ONE (DELETE REQUEST)
 *
 * Access via: http://localhost:5000/users/:id
 *
 * Delete a user based on their MongoDB id.
 */

// TODO #10 Fill in the missing pieces of code in order to complete the following Route.
// Note: The function User.findByIdAndDelete(req.params.id) finds a specific id from the MongoDB database.

router./*adding missing code here*/("/:id", (req, res) => {
  User./*add missing code here*/(req.params.id)
    .then(() => /*adding missing code here*/)
    .catch((err) => /*adding missing code here*/);
 });
 
/**
 *  UPDATE ONE (PUT REQUEST)
 *
 * Access via: http://localhost:5000/users/:id
 *
 *
 * There are multiple ways to update an existing user in the MongoDB database. One method is using a PUT request.
 * The HTTP PUT request method creates a new resource or replaces a representation of the target resource with the request payload.
 * The alternative shown in the next route is using a POST request to update the corresponding fields.
 */

// TODO #11 Fill in the missing pieces of code in order to complete the following Route.
// Note: The function User.findByIdAndUpdate(req.params.id) finds a specific id from the MongoDB database and updates it

router./*adding missing code here*/("/:id", (req, res) => {
  const body = /*adding missing code here*/;
  const user = {
    /*adding missing code here*/
  };
 
 
  User./*adding missing code here*/(req.params.id, user, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(400).json("Error: " + err));
 });
 

/**
 *  UPDATE ONE (POST REQUEST)
 *
 * Access via: http://localhost:5000/users/update/:id
 *
 * This method uses a POST request to first find the user to update. It then updates with the new fields.
 */

// TODO #12 Fill in the missing pieces of code in order to complete the following Route. (Optional)
// Note: Create another route that updates an existing user in the database using  POST REQUEST.


//For all these router files, need to export router
module.exports = router;
