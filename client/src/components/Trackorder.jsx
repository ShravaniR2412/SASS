import React, { useState } from 'react';

const TrackOrder = ({ orderDetails }) => {
  const [trackingInfo, setTrackingInfo] = useState(null);

  const handleTrackOrder = () => {
    // Simulate fetching tracking info based on orderDetails
    setTrackingInfo({
      date: '10 October 2018',
      orderNo: '012j1gvs356c',
      item: 'BEATS Solo 3 Wireless Headphones',
      price: '£299.99',
      shipping: '£33.00',
      total: '£262.99',
      status: 'On the way', // This could be dynamic based on your order state
    });
  };

  return (
    <div>
      <button onClick={handleTrackOrder} className="p-2 bg-teal-500 text-white rounded">
        Track Order
      </button>

      {trackingInfo && (
        <div className="border rounded p-5 mt-4">
          <h2 className="text-xl font-bold">Purchase Receipt</h2>
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{trackingInfo.date}</span>
          </div>
          <div className="flex justify-between">
            <span>Order No.:</span>
            <span>{trackingInfo.orderNo}</span>
          </div>
          <div className="flex justify-between">
            <span>{trackingInfo.item}</span>
            <span>{trackingInfo.price}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>{trackingInfo.shipping}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{trackingInfo.total}</span>
          </div>

          <h2 className="text-xl font-bold mt-4">Tracking Order</h2>
          <div className="flex justify-between mt-2">
            <span>Ordered</span>
            <span>Shipped</span>
            <span>On the way</span>
            <span>Delivered</span>
          </div>
          <div className="relative bg-gray-200 rounded h-2 mt-2">
            <div
              className="absolute bg-teal-500 h-2"
              style={{
                width: '50%', // Update this percentage dynamically based on order status
              }}
            />
          </div>
          <p className="text-center mt-2">
            Want any help? Please <span className="text-teal-500">contact us</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
