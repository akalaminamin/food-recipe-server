const mongoose = require("mongoose");
const bookRecipeSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  recipeName: String,
  cusine: String,
  category: String,
  author: String,
  ingredients: String,
  status: {
    type: String,
    default: "not favourite",
  },
  method: String,
  RecipeImage: String,
});

const bookRecipe = new mongoose.model("bookRecipe", bookRecipeSchema);
module.exports = bookRecipe;
