import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Cancel, TrackChanges } from '@mui/icons-material'; // Import the icons
import TrackOrder from './Trackorder'; // Adjust the import path as necessary

const orders = [
  {
    id: '#inv05651',
    date: '18 Nov 2023',
    product: 'Esther Howard',
    amount: '$456',
    payment: 'Bank',
    status: 'Processing',
  },
  {
    id: '#inv05652',
    date: '18 Nov 2023',
    product: 'Robert Fox',
    amount: '$257',
    payment: 'Cash',
    status: 'Processing',
  },
  {
    id: '#inv05653',
    date: '18 Nov 2023',
    product: 'Cameron Williamson',
    amount: '$89',
    payment: 'Cash',
    status: 'Delivered',
  },
  {
    id: '#inv05654',
    date: '18 Nov 2023',
    product: 'Jacob Jones',
    amount: '$457',
    payment: 'Card',
    status: 'Delivered',
  },
  {
    id: '#inv05655',
    date: '18 Nov 2023',
    product: 'Beaissie Cooper',
    amount: '$121',
    payment: 'Card',
    status: 'Cancel',
  },
  // Add more orders as necessary
];

const OrderHistory = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5">Your Orders</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Order ID</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Product</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Payment Option</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{order.id}</td>
              <td className="border border-gray-300 p-2">{order.date}</td>
              <td className="border border-gray-300 p-2">{order.product}</td>
              <td className="border border-gray-300 p-2">{order.amount}</td>
              <td className="border border-gray-300 p-2">{order.payment}</td>
              <td className="border border-gray-300 p-2">{order.status}</td>
              <td className="border border-gray-300 p-2 flex space-x-2">
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  className="flex items-center hover:bg-red-100"
                >
                  <Cancel className="mr-4 " /> Cancel 
                </Button>
                <Button
                  variant="contained"
                  color="grey"
                  size="small"
                  className="flex items-center hover:bg-teal-200"
                  onClick={() => handleTrackOrder(order)} // Call function with current order
                >
                  <TrackChanges className="mr-4" /> Track 
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && ( // Conditionally render TrackOrder if an order is selected
        <div className="mt-5">
          <TrackOrder orderDetails={selectedOrder} />
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
