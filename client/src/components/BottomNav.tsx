import { useLocation } from 'wouter';
import { Home, ShoppingBag, Heart, User, Bell } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { useState } from 'react';
import NotificationsCenter from './NotificationsCenter';

export default function BottomNav() {
  const [location, setLocation] = useLocation();
  const { unreadCount } = useNotifications();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navItems = [
    { label: 'Home', icon: Home, path: '/home' },
    { label: 'Orders', icon: ShoppingBag, path: '/orders' },
    { label: 'Favorites', icon: Heart, path: '/favorites' },
    { label: 'Notifications', icon: Bell, path: null, action: () => setNotificationsOpen(true) },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border flex justify-around items-center h-20 md:hidden shadow-premium safe-area-inset-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          const isNotifications = item.label === 'Notifications';
          return (
            <button
              key={item.label}
              onClick={() => item.action ? item.action() : setLocation(item.path)}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors active:scale-95 relative ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {isNotifications && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <NotificationsCenter isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </>
  );
}
