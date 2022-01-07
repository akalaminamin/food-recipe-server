const express = require("express");
const router = express.Router();
const {
  postFoodRecipe,
  getFoodRecipe,
  getFoodRecipeWithId,
  updateFoodRecipe,
  deleteFoodRecipe,
} = require("../controllers/bookRecipeController");
// ============================ all food recipe collection ==================
// post food item
router.post("/allFoodRecipe", postFoodRecipe);

// get all food item
router.get("/allFoodRecipe", getFoodRecipe);

// get food item
router.get("/allFoodRecipe/:id", getFoodRecipeWithId);

// update data using id
router.put("/allFoodRecipe/:id", updateFoodRecipe);

// delete food item
router.delete("/allFoodRecipe/:id", deleteFoodRecipe);

router.get("/", (req, res) => {
  res.send("Start Server");
});

module.exports = router;
