const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const {SECRET} = require('./configuration');
const User = require('./models/user');

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: SECRET
}, 
async(payload, done)=>{
  try{
    const user = await User.findById(payload.sub);
    return done(null, user || false);
  }
  catch(error){
    done(error,false);
  }
}));

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
  }, 
  async (email, password, done)=>{
    try{
      const user = await User.findOne({email: email});
      if(user && await user.isCorrectPassword(password)){
        return done(null, user);
      }
      return done(null, false);
    }
    catch(error){
      done(error,false);
    }
  }));