import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const AdminReport = () => {
  // Sample data for most sold products (replace with actual data)
  const productData = [
    { name: 'Shampoo', sales: 400 },
    { name: 'Conditioner', sales: 300 },
    { name: 'Hair Color', sales: 500 },
    { name: 'Hair Oil', sales: 200 },
    { name: 'Serum', sales: 150 },
  ];

  // Sample data for appointments per month
  const appointmentsData = [
    { name: 'January', appointments: 120 },
    { name: 'February', appointments: 150 },
    { name: 'March', appointments: 180 },
    { name: 'April', appointments: 200 },
    { name: 'May', appointments: 170 },
  ];

  // Sample data for payments (could be cash, card, online)
  const paymentData = [
    { name: 'Cash', value: 400 },
    { name: 'Card', value: 300 },
    { name: 'Online', value: 300 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
   <div className=" ">
    <div className="min-h-screen p-10 bg-gray-100 ml-40 mr-20">
      <Typography variant="h5" className="text-teal-600 m-5 mb-6 font-bold text-center ">Salon Owner Report</Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ml-40">
        {/* Bar chart for most sold products */}
        <Paper elevation={3} className="p-6">
          <Typography variant="h6" className="text-teal-700 mb-4 font-semibold text-center">Most Sold Products</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Line chart or bar chart for total appointments */}
        <Paper elevation={3} className="p-6">
          <Typography variant="h6" className="text-teal-700 mb-4 font-semibold text-center">Total Appointments per Month</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appointments" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Pie chart for payments */}
        <Paper elevation={3} className="p-6">
          <Typography variant="h6" className="text-teal-700 mb-4 font-semibold text-center">Payment Methods Distribution</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Paper>

        {/* Table for Product Sales Data */}
        <Paper elevation={3} className="p-6">
          <Typography variant="h6" className="text-teal-700 mb-4 font-semibold text-center">Product Sales Data</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Sales</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productData.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.sales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
    </div>
  );
};

export default AdminReport;
