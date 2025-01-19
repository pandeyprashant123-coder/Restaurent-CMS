"use client";
import React, { useState } from "react";
import { MdOutlineNotificationAdd } from "react-icons/md";

// interface Notification {
//   id: number;
//   title: string;
//   description: string;
//   pushNotificationVisible: boolean;
//   SMSvisible: boolean;
//   mailVisible: boolean;
//   SMSstatus: boolean;
//   pushNotification: boolean;
//   mail: boolean;
// }

const notificationsData = [
  {
    id: 1,
    title: "Restaurant Account Block",
    description: "Get notification on restaurant account block",
    pushNotificationVisible: true,
    SMSvisible: false,
    mailVisible: true,
    SMSstatus: false,
    pushNotification: true,
    mail: true,
  },
  {
    id: 2,
    title: "Restaurant Account Unblock",
    description: "Get notification on restaurant account unblock",
    pushNotificationVisible: true,
    SMSvisible: false,
    mailVisible: true,
    SMSstatus: false,
    pushNotification: true,
    mail: true,
  },
  {
    id: 3,
    title: "Restaurant Withdraw Approve",
    description: "Get notification on restaurant withdraw approve",
    pushNotificationVisible: true,
    SMSvisible: false,
    mailVisible: true,
    SMSstatus: false,
    pushNotification: true,
    mail: true,
  },
  {
    id: 4,
    title: "Restaurant Withdraw Rejection",
    description: "Get notification on restaurant withdraw rejection",
    pushNotificationVisible: true,
    SMSvisible: false,
    mailVisible: true,
    SMSstatus: false,
    pushNotification: true,
    mail: true,
  },
  {
    id: 5,
    title: "Restaurant Campaign Join Request",
    description: "Get notification on restaurant campaign join request",
    pushNotificationVisible: false,
    SMSvisible: false,
    mailVisible: true,
    SMSstatus: false,
    pushNotification: false,
    mail: false,
  },
  {
    id: 6,
    title: "Restaurant Campaign Join Rejection",
    description: "Get notification on restaurant campaign join rejection",
    pushNotificationVisible: true,
    SMSvisible: false,
    mailVisible: true,
    SMSstatus: false,
    pushNotification: true,
    mail: true,
  },
  {
    id: 7,
    title: "Restaurant Campaign Join Approval",
    description: "Get notification on restaurant campaign join approval",
    pushNotificationVisible: true,
    SMSvisible: false,
    mailVisible: true,
    SMSstatus: false,
    pushNotification: true,
    mail: true,
  },
  {
    id: 8,
    title: "Restaurant Order Notification",
    description: "Get notification on restaurant order notification",
    pushNotificationVisible: true,
    SMSvisible: false,
    mailVisible: false,
    SMSstatus: false,
    pushNotification: false,
    mail: false,
  },
  {
    id: 9,
    title: "Restaurant Advertisement Create by Admin",
    description: "Get notification on restaurant advertisement create by admin",
    pushNotificationVisible: true,
    SMSvisible: false,
    mailVisible: true,
    SMSstatus: false,
    pushNotification: false,
    mail: false,
  },
  {
    id: 10,
    title: "Restaurant Advertisement Approval",
    description: "Get notification on restaurant advertisement approval",
    pushNotificationVisible: true,
    SMSvisible: false,
    mailVisible: true,
    SMSstatus: false,
    pushNotification: false,
    mail: false,
  },
  {
    id: 11,
    title: "Restaurant Advertisement Deny",
    description: "Get notification on restaurant advertisement deny",
    pushNotificationVisible: true,
    SMSvisible: false,
    mailVisible: true,
    SMSstatus: false,
    pushNotification: false,
    mail: false,
  },
  {
    id: 12,
    title: "Restaurant Advertisement Resume",
    description: "Get notification on restaurant advertisement resume",
    pushNotificationVisible: true,
    SMSvisible: false,
    mailVisible: true,
    SMSstatus: false,
    pushNotification: false,
    mail: false,
  },
  {
    id: 13,
    title: "Restaurant Advertisement Pause",
    description: "Get notification on restaurant advertisement pause",
    pushNotificationVisible: true,
    SMSvisible: false,
    mailVisible: true,
    SMSstatus: false,
    pushNotification: false,
    mail: false,
  },
];

const NotificationSetup = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  const handleToggle = (id, field) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: !item[field] } : item
      )
    );
  };

  return (
    <div className="w-full flex flex-col bg-gray-50 p-3">
      <div className="flex flex-wrap items-baseline gap-2 p-6 font-semibold text-xl">
        <MdOutlineNotificationAdd />
        <div>
          <h1>Notification Setup</h1>
          <p className="text-base font-normal text-gray-700">
            From here you setup who can see what types of notification from
            StackFood
          </p>
        </div>
      </div>
      <div className="m-6 border rounded-sm">
        {/* Table */}
        <div className="mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="py-5 text-left pl-5 font-semibold text-base">
                  SI
                </th>
                <th className="text-left py-2 font-semibold text-base">
                  Topics
                </th>
                <th className="text-left py-2 font-semibold text-base">
                  Push Notification
                </th>
                <th className="text-left py-2 font-semibold text-base">Mail</th>
                <th className="text-left py-2 font-semibold text-base">SMS</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="pl-5 text-left">{index + 1}</td>
                  <td className="py-2 text-left">
                    <h1 className="text-base font-semibold">{item.title}</h1>
                    <p>{item.description}</p>
                  </td>
                  {/* Push Notification */}
                  <td className="text-left">
                    {item.pushNotificationVisible ? (
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={item.pushNotification}
                          onChange={() =>
                            handleToggle(item.id, "pushNotification")
                          }
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    ) : (
                      <span className="font-semibold text-blue-500 rounded-full px-3">
                        N/A
                      </span>
                    )}
                  </td>
                  {/* Mail */}
                  <td className="text-left">
                    {item.mailVisible ? (
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={item.mail}
                          onChange={() => handleToggle(item.id, "mail")}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    ) : (
                      <span className="font-semibold text-blue-500 rounded-full px-3">
                        N/A
                      </span>
                    )}
                  </td>
                  {/* SMS */}
                  <td className="text-left">
                    {item.SMSvisible ? (
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={item.SMSstatus}
                          onChange={() => handleToggle(item.id, "SMSstatus")}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    ) : (
                      <span className="font-semibold text-blue-500 rounded-full px-3">
                        N/A
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NotificationSetup;
