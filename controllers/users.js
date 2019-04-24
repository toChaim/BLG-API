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
    const { email, password, signup, visable='public' } = req.value.body;

    if(!signup){ return next(); }
    
    // // check for existing user
    // if(await User.findOne({ email: email })){ 
    //   return next({status: 403, message: 'email taken'}); 
    // }

    const newUser = new User({
      email: email,
      password: password,
      visable: visable
    });

    await newUser.save();
    const token = signToken(newUser);
    res.json({token: token});
  },

  signIn: async (req, res, next) => {
    console.log('UsersController.signIn() called');
    const token = signToken(req.user);
    res.json({token: token});
  },
  
  secret: async (req, res, next) => {
    console.log('UsersController.secret() called');
    res.json({message: 'secret() called'});
  },

  getUsers: async (req, res, next)=>{
    let where = {};
    if(!req.user){ where['visable'] = 'public'; }
    const users = await User.find(where);
    return res.json(users);
  },

  getUser: async (req, res, next)=>{
    if(req.user && req.user.id === req.params.id){ return req.user; }
    const target = await User.findById(req.params.id);
    if(target && target.visable == 'public'){
      return res.json(target);
    }
    next();
  },

  updateUser: async (req, res, next)=>{
    if(req.user && req.user.id !== req.params.id){ return next(new Error('Unotherized')); }
    const target = await User.findById(req.params.id);
    return res.json(req.body);
  },

  deleteUser: async (req, res, next)=>{
    if(req.user && req.user.id !== req.params.id){ return next(new Error('Unotherized')); }
    const target = await User.findByIdAndDelete(req.params.id);
    return res.json(target);
  },
   
};