const User = require('../models/user');

module.exports = {
  signUp: async (req, res, next) => {
    console.log('UsersController.signUp() called');
    const { email, password } = req.value.body;
    const newUser = new User({
      email: email,
      password: password
    });
    await newUser.save();
    res.json(newUser);
  },
  
  signIn: async (req, res, next) => {
    console.log('UsersController.signIn() called');
    res.json({message: 'signIn() called'});
  },
  
  secret: async (req, res, next) => {
    console.log('UsersController.secret() called');
    res.json({message: 'secret() called'});
  },
};