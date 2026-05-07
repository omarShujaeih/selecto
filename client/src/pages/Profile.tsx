import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LogOut, MapPin, Phone, Mail } from 'lucide-react';

export default function Profile() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  if (!user) {
    setLocation('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setLocation('/home')}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center">Profile</h1>
        <div className="w-10" />
      </div>

      {/* Profile Content */}
      <div className="px-6 py-6 max-w-md mx-auto">
        {/* Avatar & Name */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-1">{user.name}</h2>
          <p className="text-sm text-muted-foreground capitalize">{user.role} Account</p>
        </div>

        {/* User Details */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <Mail className="text-primary" size={20} />
            <div>
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <p className="font-medium text-foreground">{user.email}</p>
            </div>
          </div>

          {user.phone && (
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <Phone className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Phone</p>
                <p className="font-medium text-foreground">{user.phone}</p>
              </div>
            </div>
          )}

          {user.address && (
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <MapPin className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Address</p>
                <p className="font-medium text-foreground">{user.address}</p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="space-y-3 mb-6">
          <Button
            onClick={() => setLocation('/orders')}
            variant="outline"
            className="w-full justify-start"
          >
            View My Orders
          </Button>
          <Button
            onClick={() => setLocation('/favorites')}
            variant="outline"
            className="w-full justify-start"
          >
            My Favorites
          </Button>
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold py-3"
          size="lg"
        >
          <LogOut size={20} className="mr-2" />
          Logout
        </Button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
