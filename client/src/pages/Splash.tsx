import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Leaf } from 'lucide-react';

export default function Splash() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary to-primary/90 flex flex-col items-center justify-center px-6 text-center">
      {/* Logo */}
      <div className="mb-8 flex items-center justify-center gap-2">
        <Leaf className="text-white" size={40} />
        <h1 className="text-5xl font-bold text-white">Selecto</h1>
      </div>

      {/* Main Text */}
      <div className="mb-12 max-w-md">
        <h2 className="text-3xl font-bold text-white mb-4">
          Turn Surplus Into Opportunity
        </h2>
        <p className="text-lg text-white/90 font-medium">
          Save food. Save money. Save the planet.
        </p>
      </div>

      {/* CTA Button */}
      <Button
        onClick={() => setLocation('/login')}
        size="lg"
        className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-12 py-6 rounded-full"
      >
        Get Started
      </Button>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent" />
    </div>
  );
}
