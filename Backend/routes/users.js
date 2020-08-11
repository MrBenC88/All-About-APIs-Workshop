const usersRouter = require('express').Router();
let User = require('../models/user.model'); 

// GET all
usersRouter.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET one
usersRouter.get('/:id', (req, res) => {
  User.findById(req.params.id) // access request params 
    .then(user => res.json(user))
    .catch(err => res.status(404).json('Error: ' + err));
});

// POST one
usersRouter.post('/', (req, res) => {
  const body = req.body;
  const newUser = new User({ 
    username: body.username,
    age: body.age || 0 // age is an optional field
  });

  newUser
    .save() // save the new user to the databse
    .then(savedUser => res.json(savedUser))
    .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE one
usersRouter.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).json(`User with id ${req.params.id} deleted!`))
    .catch(err => res.status(404).json('Error: ' + err));
});

// PUT one
usersRouter.put('/:id', (req, res) => {
  const body = req.body;
  const user = {
    username: body.username,
    age: body.age,
  }

  User.findByIdAndUpdate(req.params.id, user, { new: true })
    .then(updatedUser => res.json(updatedUser))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = usersRouter;
