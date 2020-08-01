import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Legend,
} from "recharts";


function Chart({ dataToShow }) {
  return (
    <LineChart
      width={500}
      height={300}
      data={dataToShow}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="°C" stroke="#82ca9d" />
    </LineChart>
  );
}


export default Chart;
