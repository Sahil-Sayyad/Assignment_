import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`/api/statistics?month=${month}`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, [month]);

  return (



    <div className='flex justify-center p-6 '>
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Statistics for {month}</h3>
        
        <p className="font-normal text-gray-700 dark:text-gray-400">Total Sale Amount: {stats.totalSaleAmount}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">Total Sold Items: {stats.totalSoldItems}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">Total Not Sold Items: {stats.totalNotSoldItems}</p>

        </a>
    </div>
  );
};

export default Statistics;
