import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const MixedBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
        barCategoryGap="40%"
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis hide={true} />
        <Bar dataKey="Alimentación" stackId="a" fill="#4DD8E8" radius={[10, 10, 10, 10]} />
        <Bar dataKey="Transporte" stackId="a" fill="#6992E8" radius={[10, 10, 10, 10]} />
        <Bar dataKey="Otros" stackId="a" fill="#C682E8" radius={[10, 10, 10, 10]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MixedBarChart;
