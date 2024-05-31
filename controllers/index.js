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
  

const getTransactions =  async (req, res) => {
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
  
};
  

const getTransactionsStats= async (req, res) => {
    const { month } = req.query;
  
    const monthIndex = new Date(`${month} 1, 2021`).getMonth() + 1;
  
    const matchQuery = {
      $expr: {
        $eq: [{ $month: { $dateFromString: { dateString: "$dateOfSale" } } }, monthIndex]
      }
    };
  
    try {
      const statistics = await Transaction.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: null,
            totalSaleAmount: { $sum: { $toDouble: "$price" } },
            totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", "true"] }, 1, 0] } },
            totalNotSoldItems: { $sum: { $cond: [{ $eq: ["$sold", "false"] }, 1, 0] } },
          }
        }
      ]);
  
     return res.json(statistics[0] || {
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
      res.status(500).send('Server error');
    }
};
  

const getTransactionsBarChart= async (req, res) => {
    
    const { month } = req.query;
  
    const monthIndex = new Date(`${month} 1, 2021`).getMonth() + 1;
  
    const matchQuery = {
      $expr: {
        $eq: [{ $month: { $dateFromString: { dateString: "$dateOfSale" } } }, monthIndex]
      }
    };
  
    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Infinity }
    ];
  
    try {
      const barChartData = await Transaction.aggregate([
        { $match: matchQuery },
        {
          $bucket: {
            groupBy: { $toDouble: "$price" },
            boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
            default: "901-above",
            output: { count: { $sum: 1 } }
          }
        },
        {
          $project: {
            _id: 0,
            range: {
              $switch: {
                branches: priceRanges.map(range => ({
                  case: { $eq: ["$range", range.range] },
                  then: range.range
                })),
                default: "901-above"
              }
            },
            count: 1
          }
        }
      ]);
  
      return res.json(barChartData);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
      res.status(500).send('Server error');
    }
};

module.exports = {createTransactions,getTransactions,getTransactionsStats,getTransactionsBarChart}