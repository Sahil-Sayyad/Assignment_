import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent = ({ month = "March" }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(`/api/bar-chart?month=${month}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    fetchBarChartData();
  }, [month]);

 
  return (
    
    <div className='flex flex-col justify-center items-center h-full dark:bg-gray-800 p-6 rounded-[10px]'>

        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bar Chart Stats for {month}</h3>

      <BarChart width={900} height={400} data={data}>

          <XAxis dataKey="range" stroke="#8884d8" />

          <YAxis stroke='#8884d8'/>

          <Tooltip />

          <Legend  />

          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

          <Bar dataKey="count" fill="#8884d8"  />

        </BarChart>

    </div>
  );
};


export default BarChartComponent;
