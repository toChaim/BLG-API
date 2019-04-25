const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const {validateBody, schemas} = require('../helpers/auth');
const UsersController = require('../controllers/users');

const jwt_auth = (req,res,next)=>{
  passport.authenticate('jwt', {session: false},(err, user, info)=>{
    if(err){ return next(err); }
    req.user = user;
    return next();
  })(req,res,next);
};

const isCorrectUser = (req, res, next)=>{
  if(!req.user || req.user.id !== req.params.id){ return next(new Error('Unotherized')); }
  return next();
};

router.route('/signup').post(
  validateBody(schemas.authSchema),
  UsersController.signUp
);
router.route('/signin').post(
  validateBody(schemas.authSchema),
  passport.authenticate('local', {session: false}),
  UsersController.signIn
);

router.route('/').get(
  jwt_auth,
  UsersController.getUsers
).post(
  validateBody(schemas.authSchema),
  UsersController.signUp,
  passport.authenticate('local', {session: false}),
  UsersController.signIn
);

router.route('/:id')
  .get(jwt_auth, UsersController.getUser)
  .patch(jwt_auth, isCorrectUser, UsersController.updateUser)
  .delete(jwt_auth, isCorrectUser, UsersController.deleteUser);

module.exports = router;