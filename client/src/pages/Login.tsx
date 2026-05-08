import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [role, setRole] = useState<'customer' | 'restaurant' | 'admin'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email, password, role);
      if (role === 'admin') {
        setLocation('/admin');
      } else if (role === 'restaurant') {
        setLocation('/restaurant-dashboard');
      } else {
        setLocation('/home');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      {/* Back Button */}
      <button
        onClick={() => setLocation('/')}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="text-sm sm:text-base">Back</span>
      </button>

      {/* Logo */}
      <div className="mb-6 sm:mb-8 flex items-center justify-center gap-2">
        <div className="bg-green-100 p-2 sm:p-3 rounded-xl">
          <Leaf className="text-primary" size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Selecto</h1>
      </div>

      {/* Welcome Text */}
      <div className="mb-8 text-center max-w-sm">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Welcome to <span className="text-primary">Selecto</span>
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">Sign in to your account</p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-sm bg-card rounded-3xl shadow-premium p-6 sm:p-8 mb-6">
        {/* Role Toggle */}
        <div className="flex gap-2 mb-6 bg-secondary rounded-2xl p-1">
          <button
            onClick={() => setRole('customer')}
            className={`flex-1 py-2 px-3 rounded-xl font-semibold transition-all text-sm ${
              role === 'customer'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-secondary-foreground'
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setRole('restaurant')}
            className={`flex-1 py-2 px-3 rounded-xl font-semibold transition-all text-sm ${
              role === 'restaurant'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-secondary-foreground'
            }`}
          >
            Restaurant
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 px-3 rounded-xl font-semibold transition-all text-sm ${
              role === 'admin'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-secondary-foreground'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl py-3 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl py-3 px-4"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl text-base"
            size="lg"
          >
            Sign In
          </Button>
        </form>
      </div>

      {/* Sign Up Link */}
      <div className="text-center mb-6">
        <p className="text-muted-foreground text-sm mb-3">Don't have an account?</p>
        <Button
          onClick={() => setLocation('/register')}
          variant="outline"
          className="w-full max-w-sm rounded-xl py-3"
        >
          Create Account
        </Button>
      </div>

      {/* Demo Credentials */}
      <div className="p-4 bg-green-50 rounded-2xl max-w-sm text-sm text-green-800 border border-green-200">
        <p className="font-bold mb-2">Demo Credentials:</p>
        <p className="text-xs">Email: demo@selecto.com</p>
        <p className="text-xs">Password: demo123</p>
      </div>
    </div>
  );
}
