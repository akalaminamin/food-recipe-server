const MensRanking = require("../models/menSchema");

// post data in database
exports.postMens = async (req, res) => {
  try {
    const mensData = new MensRanking(req.body);
    const insertMens = await mensData.save();
    res.status(201).json(insertMens);
  } catch (error) {
    res.status(400).send(error);
  }
};

// get data in database
exports.getMens = async (req, res) => {
  try {
    const mensData = await MensRanking.find({}).sort({ ranking: 1 });
    res.status(200).json(mensData);
  } catch (error) {
    res.status(400).send("Data not found");
  }
};

// get single data in databse
exports.singleGetMens = async (req, res) => {
  try {
    const _id = req.params.id;
    const mensData = await MensRanking.findById({ _id });
    res.status(200).json(mensData);
  } catch (error) {
    res.status(400).send(error);
  }
};

// delete single data in database
exports.deleteMens = async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteData = await MensRanking.findByIdAndDelete(_id);
    res.status(202).json(deleteData);
  } catch (error) {
    res.status(400).send(error);
  }
};

// updata data in database
exports.updateMens = async (req, res) => {
  try {
    const _id = req.params.id;
    const findData = await MensRanking.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    const updateData = await findData.save();
    res.status(202).json(updateData);
  } catch (error) {
    res.status(500).send(error);
  }
};
