const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("../src/database/connection");
const router = require("../src/routers/routers");

// middleware
app.use(express.json());
app.use(router);
app.listen(port, () => {
  console.log(`Server running port is: ${port}`);
});
