
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Ene', Ingresos: 3200, Gastos: 3000, 'Saldo disponible': 200 },
  { name: 'Feb', Ingresos: 3500, Gastos: 3200, 'Saldo disponible': 300 },
  { name: 'Mar', Ingresos: 4200, Gastos: 3800, 'Saldo disponible': 400 },
  { name: 'Abr', Ingresos: 4500, Gastos: 3900, 'Saldo disponible': 600 },
  { name: 'May', Ingresos: 4300, Gastos: 3200, 'Saldo disponible': 1100 },
  { name: 'Jun', Ingresos: 4600, Gastos: 3800, 'Saldo disponible': 800 },
  { name: 'Jul', Ingresos: 4700, Gastos: 3500, 'Saldo disponible': 1200 },
];

const SimpleBarChart = () => {
  return (
    <ResponsiveContainer width="120%" height={250}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 60,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Ingresos" fill="#9BCFFD" />
        <Bar dataKey="Gastos" fill="#23457E" />
        <Bar dataKey="Saldo disponible" fill="#4D9DE0" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
