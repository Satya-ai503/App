import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { useWellnessStore } from "@/lib/store";

import AuthScreen from "@/pages/auth";
import OnboardingScreen from "@/pages/onboarding";
import Dashboard from "@/pages/dashboard";
import Physical from "@/pages/physical";
import Mental from "@/pages/mental";
import Nutrition from "@/pages/nutrition";
import Social from "@/pages/social";
import Profile from "@/pages/profile";
import Notifications from "@/pages/notifications";
import NotFound from "@/pages/not-found";

// Protected Route Wrapper
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const isAuthenticated = useWellnessStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Redirect to="/auth" />;
  }
  
  return <Component />;
}

function Router() {
  const isAuthenticated = useWellnessStore((state) => state.isAuthenticated);

  return (
    <Switch>
      <Route path="/auth">
        {isAuthenticated ? <Redirect to="/dashboard" /> : <AuthScreen />}
      </Route>
      
      <Route path="/onboarding" component={OnboardingScreen} />
      
      <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/physical">
        <ProtectedRoute component={Physical} />
      </Route>
      <Route path="/mental">
        <ProtectedRoute component={Mental} />
      </Route>
      <Route path="/nutrition">
        <ProtectedRoute component={Nutrition} />
      </Route>
      <Route path="/social">
        <ProtectedRoute component={Social} />
      </Route>
      <Route path="/profile">
        <ProtectedRoute component={Profile} />
      </Route>
      <Route path="/notifications">
        <ProtectedRoute component={Notifications} />
      </Route>

      <Route path="/">
        <Redirect to={isAuthenticated ? "/dashboard" : "/auth"} />
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
