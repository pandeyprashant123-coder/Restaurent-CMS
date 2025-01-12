import React from "react";
import hotels from "../data/hotels.json";

const SubscriptionExpiring = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <table className="min-w-full border-collapse text-left text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3">SN</th>
            <th className="px-6 py-3">Hotel Name</th>
            <th className="px-6 py-3">Subscription No</th>
            <th className="px-6 py-3">Expiry Date</th>
            <th className="px-6 py-3">Days Remaining</th>
            <th className="px-6 py-3">Duration</th>
            <th className="px-6 py-3">Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel, index) => {
            const currentDate: any = new Date();
            const daystoExpire: any = new Date(hotel.expiryDate);
            const differenceDate = daystoExpire - currentDate;
            const daysRemaining = Math.ceil(
              differenceDate / (1000 * 60 * 60 * 24)
            );
            return (
              <tr
                key={hotel.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } hover:bg-gray-200`}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{hotel.hotelName}</td>
                <td className="px-6 py-4">{hotel.subscriptionNo}</td>
                <td className={`px-6 py-4 `}>{hotel.expiryDate}</td>
                <td className={`px-6 py-4 `}>
                  {daysRemaining > 0 ? daysRemaining : 0}
                </td>
                <td className="px-6 py-4">{hotel.duration}</td>
                <td className="px-6 py-4 flex space-x-4">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionExpiring;
