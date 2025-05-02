const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt=require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { 
    type: String,
    required: true,
    select: false // Exclude password from query results by default
  },
  country: {
    type: String,
    required: true
  }
});

userSchema.methods.generateAuthToken=function(){
  const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
  return token;
};

userSchema.methods.comparePassword=async function(password){
  return await bcrypt.compare(password,this.password);
};
userSchema.statics.hashPassword=async function(password){
  return await bcrypt.hash(password,10);
}


module.exports = mongoose.model('User', userSchema)