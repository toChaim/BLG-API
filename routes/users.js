const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const {validateBody, schemas} = require('../helpers/auth');
const {signIn, signUp, getUser, updateUser,  deleteUser, getUsers} = require('../controllers/users');

const localAuth = passport.authenticate('local', {session: false});

const jwtAuth = (req,res,next)=>{
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

router.route('/signup').post( validateBody(schemas.authSchema), signUp );
router.route('/signin').post( 
  validateBody(schemas.authSchema), 
  localAuth,
  signIn
);

router.route('/')
  .get( jwtAuth, getUsers)
  .post(
    validateBody(schemas.authSchema),
    signUp,
    localAuth,
    signIn
  );

router.route('/:id')
  .get(jwtAuth, getUser)
  .patch(jwtAuth, isCorrectUser, updateUser)
  .delete(jwtAuth, isCorrectUser, deleteUser);

module.exports = router;