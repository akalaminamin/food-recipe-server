const mongoose = require("mongoose");
require('dotenv').config();
const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6cenr.mongodb.net/recipe-book?retryWrites=true&w=majority`;
// "mongodb://localhost:27017/bookRecipe"
mongoose.connect(db
    // {
    //     useCreateIndex:true,
    //     useNewUrlParser:true,
    //     useUnifiedTopology:true
    // }
  )
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log("No  Connection");
  });
