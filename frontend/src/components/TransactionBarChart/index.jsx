import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent = ({ month }) => {
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
    
    <div className='flex justify-center items-center h-full dark:bg-gray-800'>

          <BarChart width={600} height={300} data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="range" />

            <YAxis />

            <Tooltip />
            
            <Legend />

            <Bar dataKey="count" fill="#8884d8" />
            
          </BarChart>
    </div>
  );
};

export default BarChartComponent;
