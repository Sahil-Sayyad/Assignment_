import React, { useState, useEffect } from 'react';

function TransactionDashboard() {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const itemsPerPage = 10;

    // Fetch transaction data (replace with your actual data source)

    useEffect(() => {
        fetch('http://localhost:8000/api/transactions')
            .then(response => response.json())
            .then(data => setTransactions(data));
    }, []); 

    // Filter and paginate transactions
    const filteredTransactions = transactions
        .filter(transaction => 
            transaction.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        console.log(filteredTransactions)
        return (
            <div className="bg-blue-100 dark:bg-gray-400  p-8 mx-80 mt-40 rounded-[11px] font-mono">

                <div className="flex  items-center justify-center rounded-full mr-96 ml-96 ">

                    <h1 className=" bg-white text-center mr-96 ml-96  rounded-[11px] p-12 my-5 text-black font-bold font-mono text-3xl"> Transcations Dashboard</h1>

                </div>

                <div className="flex justify-start ml-20">
                    
                    <input type="text" name="search" placeholder="Search Transactions" className="bg-slate-50 text-black text-center rounded-[11px] p-2 font-mono border border-solid focus:ring-indigo-600 "/>

                        <div className="flex mr-96 ml-96 bg-slate-50 rounded-[11px]">

                        <label for="month" className="sr-only">Month</label>
                        <select id="month" name="month" class="bg-slate-50 h-full p-6 rounded-md border-0 bg-transparent py-3 pl-4 pr-20 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                            <option>January</option>
                            <option>Febuary</option>
                        </select>
                        
                        </div>
                </div>
               

                    <div class="overflow-x-auto shadow-md sm:rounded-lg mt-9">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        id
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Sold
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Image
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td class="px-6 py-4">
                                        Silver
                                    </td>
                                    <td class="px-6 py-4">
                                        Laptop
                                    </td>
                                    <td class="px-6 py-4">
                                        $2999
                                    </td>
                                    <td class="px-6 py-4">
                                        $2999
                                    </td>
                                    <td class="px-6 py-4">
                                        $2999
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Microsoft Surface Pro
                                    </th>
                                    <td class="px-6 py-4">
                                        White
                                    </td>
                                    <td class="px-6 py-4">
                                        Laptop PC
                                    </td>
                                    <td class="px-6 py-4">
                                        $1999
                                    </td>
                                    <td class="px-6 py-4">
                                        $2999
                                    </td>
                                    <td class="px-6 py-4">
                                        $2999
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                                <tr class="bg-white dark:bg-gray-800">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Magic Mouse 2
                                    </th>
                                    <td class="px-6 py-4">
                                        Black
                                    </td>
                                    <td class="px-6 py-4">
                                        Accessories
                                    </td>
                                    <td class="px-6 py-4">
                                        $99
                                    </td>
                                    <td class="px-6 py-4">
                                        $2999
                                    </td>
                                    <td class="px-6 py-4">
                                        $2999
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                        <div class="flex flex-col items-center mt-9">

                        <span class="text-sm text-gray-700 dark:text-gray-900">
                            Showing <span class="font-semibold text-gray-900 dark:text-black">1</span> to <span class="font-semibold text-gray-900 dark:text-black">10</span> of <span class="font-semibold text-gray-900 dark:text-black">100</span> Entries
                        </span>

                        <div class="inline-flex mt-2 xs:mt-0">
                            <button class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                Prev
                            </button>
                            <button class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                Next
                            </button>
                        </div>
                        </div>



            </div>
        );
}

export default TransactionDashboard;
