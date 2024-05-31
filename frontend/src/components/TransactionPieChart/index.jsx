import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const PieChartComponent = ({ month = "March" }) => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchPieChartData = async () => {
        try {
          const response = await axios.get(`/api/pie-chart?month=${month}`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching bar chart data:', error);
        }
      };
  
      fetchPieChartData();
    }, [month]);
  

    return (
        <div className="flex flex-col justify-center items-center h-full dark:bg-gray-800 p-6 rounded-[10px] my-6">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pie Chart Stats for {month}</h3>

            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label>
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                        ))
                    }
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default PieChartComponent;
