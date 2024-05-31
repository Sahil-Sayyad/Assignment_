const express = require('express');

const router = express.Router();

const {createTransactions,getTransactions, getTransactionsStats, getTransactionsBarChart ,getTransactionsPieChart ,getCombinedData   } = require('../controllers/index');


router.get("/api/fetch", createTransactions);
router.get("/api/transactions", getTransactions);
router.get("/api/statistics", getTransactionsStats);
router.get("/api/bar-chart", getTransactionsBarChart);
router.get("/api/pie-chart", getTransactionsPieChart);
router.get("/api/combine-data", getCombinedData);



module.exports = router;