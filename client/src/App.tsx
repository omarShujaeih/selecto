import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Customer Pages
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MealDetails from "./pages/MealDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

// Restaurant Pages
import RestaurantDashboard from "./pages/RestaurantDashboard";
import AddMeal from "./pages/AddMeal";
import ManageMeals from "./pages/ManageMeals";
import RestaurantOrders from "./pages/RestaurantOrders";
import MonthlyReport from "./pages/MonthlyReport";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminRestaurants from "./pages/AdminRestaurants";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path={"/"} component={Splash} />
      <Route path={"/login"} component={Login} />
      <Route path={"/register"} component={Register} />

      {/* Customer Routes */}
      <Route path={"/home"} component={Home} />
      <Route path={"/meal/:id"} component={MealDetails} />
      <Route path={"/cart"} component={Cart} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/order-confirmation/:id"} component={OrderConfirmation} />
      <Route path={"/orders"} component={Orders} />
      <Route path={"/favorites"} component={Favorites} />
      <Route path={"/profile"} component={Profile} />

      {/* Restaurant Routes */}
      <Route path={"/restaurant-dashboard"} component={RestaurantDashboard} />
      <Route path={"/add-meal"} component={AddMeal} />
      <Route path={"/manage-meals"} component={ManageMeals} />
      <Route path={"/restaurant-orders"} component={RestaurantOrders} />
      <Route path={"/monthly-report"} component={MonthlyReport} />

      {/* Admin Routes */}
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin-users"} component={AdminUsers} />
      <Route path={"/admin-restaurants"} component={AdminRestaurants} />

      {/* 404 */}
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
