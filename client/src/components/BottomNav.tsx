import { useLocation } from 'wouter';
import { Home, ShoppingBag, Heart, User } from 'lucide-react';

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { label: 'Home', icon: Home, path: '/home' },
    { label: 'Orders', icon: ShoppingBag, path: '/orders' },
    { label: 'Favorites', icon: Heart, path: '/favorites' },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border flex justify-around items-center h-20 md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.path;
        return (
          <button
            key={item.path}
            onClick={() => setLocation(item.path)}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
