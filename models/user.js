const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    visable: {
      type: String,
      required: true,
      lowercase: true
    }
  }
);

userSchema.pre('save', async function(next){
  try{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  }
  catch(error){
    return next(error);
  }
});

userSchema.methods.isCorrectPassword = async function(password){
  try{
    return await bcrypt.compare(password, this.password);
  }
  catch(error){
    throw new Error(error);
  }
};

const User = mongoose.model('user', userSchema);

module.exports = User;