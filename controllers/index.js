const Transaction = require("../models/transaction");
const { default: axios } = require("axios");

const createTransactions = async (req, res) => {
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
};

const getTransactions = async (req, res) => {
  try {
    const { selectedMonth, searchQuery, page = 1, perPage = 10 } = req.query;

    const monthIndex = new Date(`${selectedMonth} 1, 2021`).getMonth() + 1;

    const filter = {
      $expr: {
        $eq: [
          { $month: { $dateFromString: { dateString: "$dateOfSale" } } },
          monthIndex,
        ],
      },
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
};

const getTransactionsStats = async (req, res) => {
  const { month } = req.query;

  const monthIndex = new Date(`${month} 1, 2021`).getMonth() + 1;

  const matchQuery = {
    $expr: {
      $eq: [
        { $month: { $dateFromString: { dateString: "$dateOfSale" } } },
        monthIndex,
      ],
    },
  };

  try {
    const statistics = await Transaction.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: { $toDouble: "$price" } },
          totalSoldItems: {
            $sum: { $cond: [{ $eq: ["$sold", "true"] }, 1, 0] },
          },
          totalNotSoldItems: {
            $sum: { $cond: [{ $eq: ["$sold", "false"] }, 1, 0] },
          },
        },
      },
    ]);

    return res.json(
      statistics[0] || {
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
      }
    );
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).send("Server error");
  }
};

const getTransactionsBarChart = async (req, res) => {
  try {
    const { month } = req.query;
    const monthIndex = new Date(`${month} 1, 2021`).getMonth() + 1;

    const matchQuery = {
      $expr: {
        $eq: [
          { $month: { $dateFromString: { dateString: "$dateOfSale" } } },
          monthIndex,
        ],
      },
    };
    const transactions = await Transaction.find(matchQuery);

    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "901-above", min: 901, max: Infinity },
    ];

    const priceRangeCounts = {};

    priceRangeCounts["901-above"] = 0;

    transactions.forEach((transaction) => {
      const price = parseFloat(transaction.price);
      let found = false;
      for (const range of priceRanges) {
        if (price >= range.min && price <= range.max) {
          priceRangeCounts[range.range] =
            (priceRangeCounts[range.range] || 0) + 1;
          found = true;
          break;
        }
      }
      if (!found) {
        priceRangeCounts["901-above"]++;
      }
    });

    const barChartData = Object.keys(priceRangeCounts).map((range) => ({
      range,
      count: priceRangeCounts[range] || 0,
    }));

    barChartData.sort((a, b) => {
      const rangeA = parseInt(a.range.split("-")[0]);
      const rangeB = parseInt(b.range.split("-")[0]);
      return rangeA - rangeB;
    });
    return res.json(barChartData);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).send("Server error");
  }
};

const getTransactionsPieChart = async (req, res) => {
  try {
    const { month } = req.query;
    const monthIndex = new Date(`${month} 1, 2021`).getMonth() + 1;

    const matchQuery = {
      $expr: {
        $eq: [
          { $month: { $dateFromString: { dateString: "$dateOfSale" } } },
          monthIndex,
        ],
      },
    };
    const transactions = await Transaction.find(matchQuery);

    // Extract unique categories from the transactions
    const uniqueCategories = [...new Set(transactions.map(transaction => transaction.category))];
    //Count the number of items for each unique category
        const categoryCounts = {};
        uniqueCategories.forEach(category => {
            categoryCounts[category] = transactions.filter(transaction => transaction.category === category).length;
        });

        // Format data for response
        const pieChartData = Object.keys(categoryCounts).map(category => ({
            category,
            count: categoryCounts[category]
        }));

       return res.json(pieChartData);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).send("Server error");
  }
};

const getCombinedData = async (req, res) => {
  // API endpoints to fetch data from individual APIs
  const apiEndpoints = [
    "http://localhost:8000/api/transactions?selectedMonth=March&searchQuery=&currentPage=1&perPage=10",
    "http://localhost:8000/api/statistics?month=March",
    "http://localhost:8000/api/bar-chart?month=March",
    "http://localhost:8000/api/pie-chart?month=March",

  ];
  try {
    // Array to store responses from individual APIs
    const responses = [];
    // Fetch data fro each API endpoint concurrently
    await Promise.all(
      apiEndpoints.map(async (endpoint) => {
        const response = await axios.get(endpoint);
        responses.push(response.data);
      })
    );

    const combinedData = responses.reduce((acc, data, index) => {
      acc[`api${index + 1}`] = data;
      return acc;
    }, {});

    return res.json(combinedData);
  } catch (error) {
    console.error("Error combining data:", error);
    res.status(500).send("Server error");
  }
};
module.exports = {
  createTransactions,
  getTransactions,
  getTransactionsStats,
  getTransactionsBarChart,
  getTransactionsPieChart,
  getCombinedData
};
