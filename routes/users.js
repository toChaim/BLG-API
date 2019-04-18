const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const {validateBody, schemas} = require('../helpers/auth');
const UsersController = require('../controllers/users');

router.route('/signup').post(
  validateBody(schemas.authSchema),
  UsersController.signUp
);
router.route('/signin').post(
  validateBody(schemas.authSchema),
  passport.authenticate('local', {session: false}),
  UsersController.signIn
);

router.route('/secret').get(
  passport.authenticate('jwt', {session: false}), 
  UsersController.secret
);

router.route('/').get(
  (req,res,next)=>{
    passport.authenticate('jwt', {session: false},(err, user, info)=>{
      if(err){ return next(err); }
      req.user = user;
      return next();
    })(req,res,next);
  },
  UsersController.getUsers
);

module.exports = router;