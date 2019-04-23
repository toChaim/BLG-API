const Joi = require('joi');

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if(result.error){
        return next({...result.error, status: 400});
      }
      if(!req.value){ req.value = {}; }
      req.value['body'] = result.value;
      next();
    };
  },

  schemas:{
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      signup: Joi.bool(),
      visable: Joi.string()
    })
  }
};