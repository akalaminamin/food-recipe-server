const bookRecipe = require("../models/bookRecipeSchema");

exports.postFoodRecipe = async (req, res) => {
  try {
    const recipeData = new bookRecipe(req.body);
    const insertFoods = await recipeData.save();
    res.status(201).send(insertFoods);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getFoodRecipe = async (req, res) => {
  try {
    const result = await bookRecipe.find({});
    res.status(201).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getFoodRecipeWithId = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await bookRecipe.findById(_id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateFoodRecipe = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(req.body);
    const findData = await bookRecipe.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    const updateData = await findData.save();
    res.status(202).json(updateData);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteFoodRecipe = async (req, res) => {
  try {
    const result = await bookRecipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
};
