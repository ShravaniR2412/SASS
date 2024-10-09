import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Cancel, TrackChanges } from '@mui/icons-material';
import TrackOrder from './Trackorder';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const orders = [
  {
    id: '#inv05651',
    date: '18 Nov 2023',
    product: 'Hair Spa Treatment',
    amount: '₹456',
    payment: 'Bank',
    status: 'Processing',
  },
  {
    id: '#inv05652',
    date: '18 Nov 2023',
    product: 'Facial Treatment',
    amount: '₹257',
    payment: 'Cash',
    status: 'Processing',
  },
  {
    id: '#inv05653',
    date: '18 Nov 2023',
    product: 'Manicure Service',
    amount: '₹89',
    payment: 'Cash',
    status: 'Delivered',
  },
  {
    id: '#inv05654',
    date: '18 Nov 2023',
    product: 'Pedicure Service',
    amount: '₹457',
    payment: 'Card',
    status: 'Delivered',
  },
  {
    id: '#inv05655',
    date: '18 Nov 2023',
    product: 'Hair Coloring',
    amount: '₹121',
    payment: 'Card',
    status: 'Cancelled',
  },
];

const OrderHistory = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-teal-600">Your Orders</h2>
      <Button
        variant="contained"
        onClick={handleBack}
        style={{
          backgroundColor: '#008080', // Teal color
          color: 'white',
          marginBottom: '20px',
        }}
        className="hover:bg-teal-600 transition-all duration-300 flex items-center"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back
      </Button>
      <div style={{ marginTop: '20px' }}> {/* Adjusted margin to shift table down */}
        <table className="min-w-full border border-gray-300">
          <thead className="bg-teal-500 text-white">
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
              <tr key={index} className="hover:bg-gray-50 transition">
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
                    className="flex items-center hover:bg-red-100 transition"
                  >
                    <Cancel className="mr-1" /> Cancel 
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className="flex items-center hover:bg-teal-200 transition"
                    onClick={() => handleTrackOrder(order)}
                  >
                    <TrackChanges className="mr-1" /> Track 
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="mt-5">
          <TrackOrder orderDetails={selectedOrder} />
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
