const mongoose = require('mongoose');

const preferencesSchema = mongoose.Schema({
  favoriteRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'recipe' }],
  dietaryRestrictions: [String],
});

const PreferencesModel = mongoose.model('preferences', preferencesSchema);

module.exports = PreferencesModel;
