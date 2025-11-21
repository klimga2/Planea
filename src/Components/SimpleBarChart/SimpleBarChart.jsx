import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lun', gastos: 2000, ingresos: 2400 },
  { name: 'Mar', gastos: 1800, ingresos: 2210 },
  { name: 'Mié', gastos: 2200, ingresos: 2290 },
  { name: 'Jue', gastos: 2100, ingresos: 2000 },
  { name: 'Vie', gastos: 2500, ingresos: 2181 },
  { name: 'Sáb', gastos: 2300, ingresos: 2500 },
  { name: 'Dom', gastos: 2600, ingresos: 2100 },
];

const SimpleBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ingresos" fill="#82ca9d" />
        <Bar dataKey="gastos" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
