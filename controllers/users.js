const JWT = require('jsonwebtoken');
const User = require('../models/user');
const {SECRET} = require('../configuration');

const signToken = user => {
  return JWT.sign({},
    SECRET,
    {
      subject: user.id,
      issuer: 'Better Living Games',
      expiresIn: '12h'
    });
};

module.exports = {
  signUp: async (req, res, next) => {
    // get and sanatize data
    const { email, password } = req.value.body;
    
    // // check for existing user
    // if(await User.findOne({ email: email })){ 
    //   return next({status: 403, message: 'email taken'}); 
    // }

    const newUser = new User({
      email: email,
      password: password
    });

    await newUser.save();
    const token = signToken(newUser);
    res.json({token: token});
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