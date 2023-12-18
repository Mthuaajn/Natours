const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// name,email,photo, password,passwordConfirm
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'please provide your email'],
    validate: [validator.isEmail, 'please provide a valid email'],
    unique: true,
    lowercase: true,
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'lead-guide', 'guide'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'please provide your password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'passwords are not the same',
    },
  },
  passwordChangeAt: {
    type: Date,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.statics.correctPassword = async function (
  candidatePassword,
  currentPassword
) {
  return await bcrypt.compare(candidatePassword, currentPassword);
};

userSchema.methods.passwordChangeAfter = function (JWTTimesTemp) {
  if (this.passwordChangeAt) {
    const changeTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    console.log(changeTimestamp, JWTTimesTemp);
    return JWTTimesTemp < changeTimestamp;
  }
  return false;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
