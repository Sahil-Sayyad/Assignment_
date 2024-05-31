require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("./config/mongoose");
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/', routes);

app.listen(8000, (err) => {
  console.log(`Server running on port 8000`);
  if (err) {
    console.log(err);
  }
});
