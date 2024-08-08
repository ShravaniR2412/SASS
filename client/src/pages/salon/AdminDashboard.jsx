// src/AdminDashboard.js
import React from "react";
import Sidebar from "../../components/Sidebar";

const AdminDashboard = () => {
  // Dummy data
  const stats = {
    totalAppointments: 120,
    appointmentsPending: 15,
    appointmentsRejected: 8,
    mostPopularService: "Haircut",
    serviceCounts: {
      Haircut: 45,
      Coloring: 30,
      Styling: 25,
    },
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-teal-600">
            Welcome to the Salon Admin Dashboard
          </h1>
        </div>

        <section id="stats" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Total Appointments</h3>
              <p className="text-gray-700 text-2xl">
                {stats.totalAppointments}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">
                Appointments Pending
              </h3>
              <p className="text-gray-700 text-2xl">
                {stats.appointmentsPending}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">
                Appointments Rejected
              </h3>
              <p className="text-gray-700 text-2xl">
                {stats.appointmentsRejected}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">
                Most Popular Service
              </h3>
              <p className="text-gray-700 text-2xl">
                {stats.mostPopularService}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">
                Service Preferences
              </h3>
              <ul>
                {Object.entries(stats.serviceCounts).map(([service, count]) => (
                  <li key={service} className="text-gray-700 mb-2">
                    <span className="font-semibold">{service}:</span> {count}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Appointments Section */}
        <section id="appointments" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Appointments</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-gray-700 mb-2">
              View and manage salon appointments here. You can see upcoming
              appointments, past appointments, and their details.
            </p>
            <div className="mb-4">
              <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                Add New Appointment
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Time</th>
                    <th className="py-2 px-4 border-b">Client</th>
                    <th className="py-2 px-4 border-b">Service</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">2024-08-08</td>
                    <td className="py-2 px-4 border-b">10:00 AM</td>
                    <td className="py-2 px-4 border-b">tae kim</td>
                    <td className="py-2 px-4 border-b">Haircut</td>
                    <td className="py-2 px-4 border-b">
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 mr-2">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
