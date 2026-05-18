import React from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { X, Bell, Trash2, CheckCheck } from 'lucide-react';
import { useLocation } from 'wouter';
import { formatDistanceToNow } from 'date-fns';

interface NotificationsCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsCenter({ isOpen, onClose }: NotificationsCenterProps) {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications, unreadCount } = useNotifications();
  const [, setLocation] = useLocation();

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      setLocation(notification.actionUrl);
      onClose();
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order_status':
        return '📦';
      case 'delivery':
        return '🚚';
      case 'promotion':
        return '🎉';
      case 'payment':
        return '💳';
      default:
        return 'ℹ️';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order_status':
        return 'border-l-4 border-l-blue-500';
      case 'delivery':
        return 'border-l-4 border-l-green-500';
      case 'promotion':
        return 'border-l-4 border-l-orange-500';
      case 'payment':
        return 'border-l-4 border-l-purple-500';
      default:
        return 'border-l-4 border-l-gray-400';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Notifications Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-background shadow-2xl z-50 flex flex-col rounded-l-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-green-600 text-white p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell size={24} />
            <div>
              <h2 className="text-lg sm:text-xl font-bold">Notifications</h2>
              {unreadCount > 0 && (
                <p className="text-sm opacity-90">{unreadCount} unread</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <Bell size={48} className="text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground font-medium">No notifications yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                You'll receive updates about your orders and promotions here
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 sm:p-5 hover:bg-secondary/50 transition-colors cursor-pointer ${getNotificationColor(
                    notification.type
                  )} ${!notification.read ? 'bg-primary/5' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex gap-3">
                    <span className="text-2xl flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground text-sm sm:text-base">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="p-1 hover:bg-destructive/10 rounded transition-colors flex-shrink-0"
                    >
                      <X size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {notifications.length > 0 && (
          <div className="border-t border-border p-4 sm:p-5 bg-secondary/30 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="flex-1 text-xs sm:text-sm"
            >
              <CheckCheck size={16} className="mr-2" />
              Mark all read
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllNotifications}
              className="flex-1 text-xs sm:text-sm"
            >
              <Trash2 size={16} className="mr-2" />
              Clear all
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
