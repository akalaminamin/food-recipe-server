const express = require("express");
const router = express.Router();
const {
  postMens,
  getMens,
  singleGetMens,
  deleteMens,
  updateMens,
} = require("../controllers/mensControllers");

// post data
router.post("/mens", postMens);

// get data
router.get("/mens", getMens);

// get unique Data
router.get("/mens/:id", singleGetMens);

// delete unique data
router.delete("/mens/:id", deleteMens);

// updata data
router.patch("/mens/:id", updateMens);

router.get("/", (req, res) => {
  res.send("Start Server");
});

module.exports = router;
