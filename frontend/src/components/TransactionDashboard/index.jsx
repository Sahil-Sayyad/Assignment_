import React, { useState, useEffect } from 'react';
import TransactionStats from "../TransactionStats"
import TransactionBarChart from "../TransactionBarChart"
import TransactionPieChart from "../TransactionPieChart"
import axios from "axios";

function TransactionDashboard() {

    const [transactions, setTransactions] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('March');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);
  
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Fetch transaction data 
    useEffect(() => {
        fetchTransactions();
    }, [selectedMonth, searchQuery , currentPage]); 

    const fetchTransactions = async () => {
        try {

            const response = await axios.get('/api/transactions',{

                params:{selectedMonth,searchQuery,currentPage,perPage},

            });

            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
      
    }; 

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) { // Ensure not on the first page
            setCurrentPage(currentPage - 1);
        }
    };

    const indexOfLastProduct = currentPage * perPage;
    const indexOfFirstProduct = indexOfLastProduct - perPage;
    

        return (
            <div className="bg-blue-100 dark:bg-gray-600  p-8 font-mono">

                <div className="flex  items-center justify-center rounded-full mr-96 ml-96 ">

                    <h1 className=" bg-slate-200 text-center mr-96 ml-96  rounded-[11px] p-12 my-5 text-black font-bold font-mono text-3xl"> Transcations Dashboard</h1>

                </div>

                <div className=" flex justify-between  ml-2">
                    
                    <input type="text" name="search" placeholder="Search Transactions"  value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-50 text-black text-center rounded-[11px] p-2 font-mono border border-solid focus:ring-indigo-600 "/>

                        <div className=" bg-slate-50 rounded-[11px]">

                        <label htmlFor="month" className="sr-only">Month</label>

                        <select 
                                id="month" 
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="bg-slate-50 h-full p-6 rounded-md border-0 bg-transparent py-3 pl-4 pr-20 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                            {months.map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}  
                        </select>
                        
                        </div>
                </div>
               

                    <div className="overflow-x-auto shadow-md sm:rounded-lg mt-9">

                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sold
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Image
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={transaction.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {transaction.id} 
                                    </th>
                                    <td className="px-6 py-4">
                                    {transaction.title} 
                                    </td>
                                    <td className="px-6 py-4">
                                    {transaction.description} 
                                    </td>
                                    <td className="px-6 py-4">
                                    {transaction.price} 
                                    </td>
                                    <td className="px-6 py-4">
                                    {transaction.category} 
                                    </td>
                                    <td className="px-6 py-4">
                                    {transaction.sold}
                                    </td>
                                    <td className="px-6 py-4">
                                    {transaction.dateOfSale.slice(0,10)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <img src={transaction.image} alt="image" className='h-[80px] w-[100px] rounded-[6px]'/>
                                    </td>
                                </tr>
                                ))}
                                
                            </tbody>
                        </table>

                    </div>


                        <div className="flex flex-col items-center mt-9">

                        <span className="text-sm text-gray-700 dark:text-gray-900">
                            Showing <span className="font-semibold text-gray-900 dark:text-black">{indexOfFirstProduct + 1}</span> to <span className="font-semibold text-gray-900 dark:text-black">{Math.min(indexOfLastProduct, transactions.length)}</span> of <span className="font-semibold text-gray-900 dark:text-black">{transactions.length}</span>
                        </span>

                        <div className="inline-flex mt-2 xs:mt-0">

                            <button onClick={handlePrevPage} disabled={currentPage === 1} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                Prev
                            </button>
                            <button onClick={handleNextPage} disabled={indexOfLastProduct >= transactions.length} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                Next
                            </button>

                        </div>
                        </div>
                    {/* Transaction Stats */} 
                    <TransactionStats month={selectedMonth}/>
                    {/** Transaction Bar Chart */}
                    <TransactionBarChart month={selectedMonth}/>
                    {/** Transaction Pie Chart */}
                    <TransactionPieChart month={selectedMonth}/>            


            </div>
        );
}

export default TransactionDashboard;