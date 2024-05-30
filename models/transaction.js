const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    id:{
        type:Number
    },
    title:{
        type:String
    },
    price:{
        type:String
    },
    description:{
        type:String
    },
    category:{
        type:String
    },
    image:{
        type:String
    },
    sold:{
        type:String
    },
    dateOfSale:{
        type:String
    }
},
{
    timestamps:true
});

const Transaction = new mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;