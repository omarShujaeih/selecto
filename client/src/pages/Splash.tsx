import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Leaf, ArrowRight } from 'lucide-react';

export default function Splash() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-green-600 to-green-700 flex flex-col items-center justify-center px-4 sm:px-6 text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-48 -mb-48" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full py-12">
        {/* Logo */}
        <div className="mb-6 sm:mb-8 flex items-center justify-center gap-2">
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
            <Leaf className="text-white" size={32} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Selecto</h1>
        </div>

        {/* Main Text */}
        <div className="mb-8 sm:mb-12 max-w-sm">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Turn Surplus Into Opportunity
          </h2>
          <p className="text-base sm:text-lg text-white/90 font-medium leading-relaxed">
            Save food. Save money. Save the planet.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => setLocation('/login')}
          size="lg"
          className="bg-white text-green-600 hover:bg-white/95 font-bold text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          Get Started
          <ArrowRight size={20} />
        </Button>

        {/* Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 max-w-sm text-white/80 text-xs sm:text-sm">
          <div>
            <p className="font-bold text-lg sm:text-xl">12K+</p>
            <p>Meals Saved</p>
          </div>
          <div>
            <p className="font-bold text-lg sm:text-xl">5.3K</p>
            <p>Users</p>
          </div>
          <div>
            <p className="font-bold text-lg sm:text-xl">45</p>
            <p>Restaurants</p>
          </div>
        </div>
      </div>
    </div>
  );
}
