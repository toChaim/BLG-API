module.exports = {
  signUp: async (req, res, next) => {
    console.log('UsersController.signUp() called');
    res.json({message: 'signUp() called'});
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