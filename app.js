require("dotenv").config();
const { default: axios } = require("axios");
const express = require("express");
const cors = require("cors");
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
    await Transaction.deleteMany();
    const transaction = await Transaction.create(transations);
    return res.json(transaction);
  } catch (err) {
    return res.json(err);
  }
});

app.get("/api/transactions", async (req, res) => {
  try {
    const { selectedMonth, searchQuery, page = 1, perPage = 10 } = req.query;

    const monthIndex = new Date(`${selectedMonth} 1, 2021`).getMonth() + 1;

    const filter = {
      $expr: {
        $eq: [{ $month: { $dateFromString: { dateString: "$dateOfSale" } } }, monthIndex]
      }
    };

    if (searchQuery) {
      filter.$or = [
        { title: new RegExp(searchQuery, "i") },
        { description: new RegExp(searchQuery, "i") },
        { price: new RegExp(searchQuery, "i") },
      ];
    }

    const transactions = await Transaction.find(filter)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    return res.json(transactions);
    
  } catch (error) {
    console.error(error);
    return res.json(error);
  }

});

app.listen(8000, (err) => {
  console.log(`Server running on port 8000`);
  if (err) {
    console.log(err);
  }
});
