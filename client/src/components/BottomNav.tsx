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
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border flex justify-around items-center h-20 md:hidden shadow-premium safe-area-inset-bottom">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.path;
        return (
          <button
            key={item.path}
            onClick={() => setLocation(item.path)}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors active:scale-95 ${
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-xs font-semibold">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
