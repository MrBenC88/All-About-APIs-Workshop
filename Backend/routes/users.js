const router = require("express").Router();
let User = require("../models/user.model"); //requires mongoose module we created

// the first route that handles incoming HTTP get requests from the /users path
router.route("/").get((req, res) => {
  User.find() //mongoose method that gets all the users from mongoose atlas database
    .then((users) => res.json(users)) //after it finds, get all users and returns the users in json format that we got from database
    .catch((err) => res.status(400).json("Error: " + err)); // if there's error - return a error 400 with the message
});

router.get("/all", (req, res) => {
  //endpoint for accessing all users in database
  User.find()
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});

router.get("/info/:id", (req, res) => {
  //endpoint for accessing single user by id in database
  User.findById(req.params.id) // find it by id
    .then((user) => res.send(user)) //then return as json ; else return error
    .catch((err) => res.status(400).json("Error: " + err));
});

//handles incoming HTTP post request.
router.route("/add").post((req, res) => {
  const username = req.body.username; //we assign the username to variable, and create new instance of username
  const newUser = new User({ username });

  newUser
    .save() // save the new user to the databse
    .then(() => res.json("User added!")) // return prompt that user is added; else return error message
    .catch((err) => res.status(400).json("Error: " + err));
});

// the :id is like a variable. This is object id that is created automatically by mongoDB.
// if do the get request on user object can get the info about that user
router.route("/:id").get((req, res) => {
  User.findById(req.params.id) // find it by id
    .then((user) => res.json(user)) //then return as json ; else return error
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  // if its delete request then finds and deletes
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("user deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
  //if route is update/ object id and is post, then we update it
  User.findById(req.params.id) // find current user and update
    .then((user) => {
      user.username = req.body.username; // sets new user variables to equal the new data

      user
        .save() // save it
        .then(() => res.json("user updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//For all these router files, need to export router
module.exports = router;
