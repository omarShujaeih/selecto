import { mockRestaurantStats, mockWeeklyMealsData, mockWeeklyRevenueData } from '@/data/mockData';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, TrendingUp, Leaf, Star } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MonthlyReport() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setLocation('/restaurant-dashboard')}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center">Monthly Report</h1>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <Download size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-6 max-w-4xl mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-2">Meals Sold</p>
            <p className="text-4xl font-bold text-primary">{mockRestaurantStats.totalMealsSold}</p>
          </div>
          <div className="bg-blue-100 border border-blue-200 rounded-xl p-6">
            <p className="text-sm text-blue-600 mb-2">Revenue Recovered</p>
            <p className="text-4xl font-bold text-blue-600">${mockRestaurantStats.totalRevenueRecovered}</p>
          </div>
          <div className="bg-green-100 border border-green-200 rounded-xl p-6">
            <p className="text-sm text-green-600 mb-2">Food Waste Prevented</p>
            <p className="text-4xl font-bold text-green-600">{mockRestaurantStats.foodWastePrevented} kg</p>
          </div>
          <div className="bg-yellow-100 border border-yellow-200 rounded-xl p-6">
            <p className="text-sm text-yellow-600 mb-2">Average Rating</p>
            <p className="text-4xl font-bold text-yellow-600">{mockRestaurantStats.averageRating}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Meals Sold Chart */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Weekly Meals Sold</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockWeeklyMealsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="meals" fill="#2F9E57" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Chart */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Weekly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockWeeklyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#4A90E2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Download Report Button */}
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3"
          size="lg"
        >
          <Download size={20} className="mr-2" />
          Download PDF Report
        </Button>
      </div>
    </div>
  );
}
