import React from 'react';
import { Calendar, MessageSquare, CreditCard } from 'lucide-react';
import { Notification } from '../../../types/notifications';

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRead,
}) => {
  const icons = {
    session: Calendar,
    message: MessageSquare,
    payment: CreditCard,
  };

  const Icon = icons[notification.type] || Calendar;

  return (
    <div
      className={`p-4 hover:bg-gray-50 cursor-pointer ${
        !notification.read ? 'bg-blue-50' : ''
      }`}
      onClick={() => onRead(notification.id)}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Icon className="w-5 h-5 text-cyan-600" />
        </div>
        <div>
          <p className="text-sm text-gray-900">{notification.message}</p>
          <span className="text-xs text-gray-500">
            {new Date(notification.createdAt).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};