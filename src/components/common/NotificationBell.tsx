import React, { useState } from 'react';
import { Bell } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function NotificationBell() {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Job Match',
      message: 'A new job matching your skills has been posted',
      time: '5m ago',
      read: false
    },
    {
      id: '2',
      title: 'Proposal Update',
      message: 'Your proposal has been viewed by the client',
      time: '1h ago',
      read: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative group">
      <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 relative">
        <Bell className="h-5 w-5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Notifications</h3>
          <div className="space-y-4">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-3 rounded-md ${
                  notification.read
                    ? 'bg-gray-50 dark:bg-gray-700'
                    : 'bg-green-50 dark:bg-green-900'
                }`}
              >
                <h4 className="font-medium dark:text-white">{notification.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}