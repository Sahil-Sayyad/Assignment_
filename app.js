require("dotenv").config();
const { default: axios } = require("axios");
const express = require("express");
const app = express();
const mongoose = require("./config/mongoose");
const Transaction = require("./models/transaction");
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
    
    let month = req.query.month;
    const search = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 10;

    if (month === "January" || month === "january") {
       month = "01";
    } else if (month === "February" || month === "february") {
      month = "02";
    } else if (month === "March" || month === "march") {
      month = "03";
    } else if (month === "April" || month === "april") {
      month = "04";
    } else if (month === "May" || month === "may") {
      month = "05";
    } else if (month === "June" || month === "june") {
      month = "06";
    } else if (month === "july" || month === "July") {
      month = "07";
    } else if (month === "august" || month === "August") {
      month = "08";
    } else if (month === "September" || month === "september") {
      month = "09";
    } else if (month === "Octomber" || month === "octomber") {
      month = "10";
    } else if (month === "November" || month === "november") {
      month = "11";
    } else if (month === "December" || month === "december") {
      month = "12";
    }
    const query = {};

    if (month) {
      query.dateOfSale = { $regex: new RegExp(month, "i") };
    }
    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
        { price: { $regex: new RegExp(search, "i") } },
      ];
    }

    const totalTransactions = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);

    return res.json({
      total_count: totalTransactions,
      page: page,
      per_page: perPage,
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
