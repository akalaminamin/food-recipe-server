const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT || 5000;
const { MongoClient } = require("mongodb");
const fileUpload = require("express-fileupload");

app.use(cors());
app.use(express.json());
app.use(fileUpload({ limit: "50mb" }));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6cenr.mongodb.net/recipe-book?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const foodRecipeCollection = client
      .db("recipe-book")
      .collection("BookRecipe");

    app.post("/allFoodRecipe", async (req, res) => {
      const cursor = req.body;
      console.log(req.body);
      const result = await foodRecipeCollection.insertOne(cursor);
      res.json(result);
    });

    // get drone services
    app.get("/allFoodRecipe", async (req, res) => {
      const result = await foodRecipeCollection.find({}).toArray();
      res.json(result);
    });

    // get drone service from id
    app.get("/allFoodRecipe/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await foodRecipeCollection.findOne(filter);
      res.json(result);
    });

    // delete drone service item
    app.delete("/allFoodRecipe/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: ObjectId(id) };
      const result = await foodRecipeCollection.deleteOne(filter);
      res.json(result);
    });

    // update status
    app.put("/allFoodRecipe/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const status = req.body.status;
      const options = { upset: true };
      const updateDoc = {
        $set: {
          status: status,
        },
      };
      const result = await foodRecipeCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      console.log(result);
      res.json(result);
    });
  } catch {
    // await client.close()
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("In the name of Allah");
});

app.listen(port, () => {
  console.log(`Server running is ${port}`);
});
