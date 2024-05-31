const express = require('express');

const router = express.Router();

const {createTransactions,getTransactions, getTransactionsStats, getTransactionsBarChart    } = require('../controllers/index');


router.get("/api/fetch", createTransactions);
router.get("/api/transactions", getTransactions);
router.get("/api/statistics", getTransactionsStats);
router.get("/api/bar-chart", getTransactionsBarChart);


module.exports = router;