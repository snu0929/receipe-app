const mongoose = require('mongoose');
const PreferencesModel = require('./preferences.model');

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    preferences: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'preferences',
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model('user', userSchema);

module.exports = {
  UserModel,
};
