import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf, ArrowLeft } from 'lucide-react';

export default function Register() {
  const [, setLocation] = useLocation();
  const { register } = useAuth();
  const [role, setRole] = useState<'customer' | 'restaurant'>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password && password === confirmPassword) {
      register(name, email, password, role);
      if (role === 'restaurant') {
        setLocation('/restaurant-dashboard');
      } else {
        setLocation('/home');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      {/* Back Button */}
      <button
        onClick={() => setLocation('/login')}
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      {/* Logo */}
      <div className="mb-8 flex items-center justify-center gap-2">
        <Leaf className="text-primary" size={32} />
        <h1 className="text-3xl font-bold text-foreground">Selecto</h1>
      </div>

      {/* Welcome Text */}
      <div className="mb-8 text-center max-w-sm">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Create Your <span className="text-primary">Account</span>
        </h2>
        <p className="text-muted-foreground">Join us and start saving food & money</p>
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
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3"
            size="lg"
          >
            Create Account
          </Button>
        </form>
      </div>

      {/* Sign In Link */}
      <div className="text-center">
        <p className="text-muted-foreground">Already have an account?</p>
        <Button
          onClick={() => setLocation('/login')}
          variant="outline"
          className="w-full max-w-sm mt-2"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
