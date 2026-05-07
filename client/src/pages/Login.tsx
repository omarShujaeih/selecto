import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf } from 'lucide-react';

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      {/* Logo */}
      <div className="mb-8 flex items-center justify-center gap-2">
        <Leaf className="text-primary" size={32} />
        <h1 className="text-3xl font-bold text-foreground">Selecto</h1>
      </div>

      {/* Welcome Text */}
      <div className="mb-8 text-center max-w-sm">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Welcome to <span className="text-primary">Selecto</span>
        </h2>
        <p className="text-muted-foreground">Sign in to your account</p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-sm bg-card rounded-2xl shadow-sm p-6 mb-6">
        {/* Role Toggle */}
        <div className="flex gap-2 mb-6 bg-secondary rounded-lg p-1">
          <button
            onClick={() => setRole('customer')}
            className={`flex-1 py-2 px-3 rounded-md font-medium transition-all ${
              role === 'customer'
                ? 'bg-primary text-primary-foreground'
                : 'text-secondary-foreground'
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setRole('restaurant')}
            className={`flex-1 py-2 px-3 rounded-md font-medium transition-all ${
              role === 'restaurant'
                ? 'bg-primary text-primary-foreground'
                : 'text-secondary-foreground'
            }`}
          >
            Restaurant
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 px-3 rounded-md font-medium transition-all ${
              role === 'admin'
                ? 'bg-primary text-primary-foreground'
                : 'text-secondary-foreground'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3"
            size="lg"
          >
            Sign In
          </Button>
        </form>
      </div>

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-muted-foreground mb-2">Don't have an account?</p>
        <Button
          onClick={() => setLocation('/register')}
          variant="outline"
          className="w-full max-w-sm"
        >
          Create Account
        </Button>
      </div>

      {/* Demo Credentials */}
      <div className="mt-8 p-4 bg-secondary rounded-lg max-w-sm text-sm text-secondary-foreground">
        <p className="font-bold mb-2">Demo Credentials:</p>
        <p>Email: demo@selecto.com</p>
        <p>Password: demo123</p>
      </div>
    </div>
  );
}
