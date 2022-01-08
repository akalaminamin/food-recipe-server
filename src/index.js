const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT || 5000;
const { MongoClient } = require("mongodb");
const fileUpload = require('express-fileupload');

app.use(cors());
app.use(express.json());
app.use(fileUpload({ limit: '50mb' }));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6cenr.mongodb.net/recipe-book?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const foodRecipeCollection = client.db("recipe-book").collection("BookRecipe");

    app.post("/allFoodRecipe", async (req, res) => {
        const cursor = req.body;
        console.log(req.body)
        const result = await foodRecipeCollection.insertOne(cursor);
        res.json(result);
      });

  //   app.post('/allFoodRecipe', async (req, res) => {
  //     const name = req.body.name;
  //     const email = req.body.email;
  //     const recipeName = req.body.recipeName;
  //     const cuisine = req.body.cuisine;
  //     const category = req.body.category;
  //     const author = req.body.author;
  //     const ingredients = req.body.ingredients;
  //     const method = req.body.method;
  //     const pic = req.files.image;
  //     const picData = pic.data;
  //     const encodedPic = picData.toString('base64');
  //     const imageBuffer = Buffer.from(encodedPic, 'base64');
  //     const food = {
  //         name,
  //         email,
  //         recipeName,
  //         cuisine,
  //         category,
  //         author,
  //         ingredients,
  //         method,
  //         image: imageBuffer
  //     }
  //     const result = await recipePostReqCollection.insertOne(food);
  //     console.log('post', req.body.recipeName);
  //     res.json(result);
  //     console.log('recipi hit');
  // });

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
      const filter = { _id: ObjectId(id) };
      const result = await foodRecipeCollection.deleteOne(filter);
      res.json(result);
    });
 
    // update status
    app.put("/allFoodRecipe/:id", async(req, res) =>{
        const id = req.params.id; 
        const filter = {_id:ObjectId(id)};
        const status = req.body.status;
        const options = {upset:true}
        const updateDoc ={
          $set:{
            status:status
          }
        }
        const result = await foodRecipeCollection.updateOne(filter, updateDoc, options)
        console.log(result)
        res.json(result)
      })





























    // // post drone collection data in database
    // app.post("/orders", async (req, res) => {
    //   const cursor = req.body;
    //   const result = await droneOrderCollection.insertOne(cursor);
    //   res.json(result);
    // });

    // // get my order data from database
    // app.get("/orders", async (req, res) => {
    //   const result = await droneOrderCollection.find({}).toArray();
    //   res.json(result);
    // });

    // // delete order items
    // app.delete("/orders/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const cursor = { _id: ObjectId(id) };
    //   const result = await droneOrderCollection.deleteOne(cursor);
    //   res.json(result);
    // });

    // // update status
    // app.put("/orders/:id", async(req, res) =>{
    //   const id = req.params.id;
    //   const filter = {_id:ObjectId(id)};
    //   const status = req.body.status;
    //   const options = {upset:true}
    //   const updateDoc ={
    //     $set:{
    //       status:"Shipped"
    //     }
    //   }
    //   const result = await droneOrderCollection.updateOne(filter, updateDoc, options)
    //   console.log(result)
    //   res.json(result)
    // })

    // // Add new service in database
    // app.post("/addProduct", async (req, res) => {
    //   const cursor = req.body;
    //   const result = await droneServiceCollection.insertOne(cursor);
    //   res.json(result);
    // });

    // // post all admin collection
    // app.post("/admin", async (req, res) => {
    //   const cursor = req.body;
    //   const admin = await adminCollection.insertOne(cursor);
    //   res.json(admin);
    // });

    // // get all admin data
    // app.get("/admin", async (req, res) => {
    //   const adminData = await adminCollection.find({}).toArray();
    //   console.log(adminData);
    //   res.json(adminData);
    // });

    // // store review data in database
    // app.post("/review", async (req, res) => {
    //   const review = req.body;
    //   const result = await reviewCollection.insertOne(review);
    //   res.json(result);
    // });

    // // get review data from databse
    // app.get("/review", async (req, res) => {
    //   const review = req.body;
    //   const result = await reviewCollection.find(review).toArray();
    //   console.log(result);
    //   res.json(result);
    // });
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