import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PaymentHistory = () => {
  const navigate = useNavigate();

  const paymentData = [
    { id: 1, date: '2024-01-01', type: 'Product Purchase', details: 'Hair Shampoo', amount: '$50.00', status: 'Completed' },
    { id: 2, date: '2024-02-15', type: 'Appointment Booking', details: 'Haircut Appointment', amount: '$75.00', status: 'Pending' },
    { id: 3, date: '2024-03-10', type: 'Product Purchase', details: 'Hair Conditioner', amount: '$30.00', status: 'Failed' },
    { id: 4, date: '2024-04-20', type: 'Appointment Booking', details: 'Nail Treatment', amount: '$60.00', status: 'Completed' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 bg-teal-600 text-white px-4 py-2 rounded flex items-center transition hover:bg-teal-700"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
      <h2 className="text-2xl font-semibold text-teal-600 mb-6">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-teal-500 text-white">
              <th className="py-3 px-6 text-left border-r border-gray-300">Date</th>
              <th className="py-3 px-6 text-left border-r border-gray-300">Type</th>
              <th className="py-3 px-6 text-left border-r border-gray-300">Details</th>
              <th className="py-3 px-6 text-left border-r border-gray-300">Amount</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((payment) => (
              <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                <td className="py-3 px-4">{payment.date}</td>
                <td className="py-3 px-4">{payment.type}</td>
                <td className="py-3 px-4">{payment.details}</td>
                <td className="py-3 px-4">{payment.amount}</td>
                <td className="py-3 px-4">
                  {payment.status === 'Completed' ? (
                    <span className="flex items-center text-green-600">
                      <FaCheckCircle className="mr-2" /> {payment.status}
                    </span>
                  ) : payment.status === 'Pending' ? (
                    <span className="flex items-center text-yellow-600">
                      <FaCheckCircle className="mr-2" /> {payment.status}
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <FaTimesCircle className="mr-2" /> {payment.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
