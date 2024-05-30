require("dotenv").config();
const { default: axios } = require("axios");
const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("./config/mongoose");
const Transaction = require("./models/transaction");

app.use(cors());
app.use(express.json());


app.get("/", async (req, res) => {
  try {
    const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";
    const response = await axios.get(url);
    const transations = response.data;
    const transaction = await Transaction.create(transations);
    return res.json(transaction);
  } catch (err) {
    return res.json(err);
  }
});

app.get("/api/transactions", async (req, res) => {
  try {
    
    const transactions = await Transaction.find()
    .sort({ id: 1 })// 1 for ascending order

    return res.json({
      transactions: transactions,
    });
  } catch (err) {
    return res.json(err);
  }
});

app.listen(8000, (err) => {
  console.log(`Server running on port 8000`);
  if (err) {
    console.log(err);
  }
});
