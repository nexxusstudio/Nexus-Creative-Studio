import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Suspense, lazy } from "react";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import CryptoNexus from "./pages/CryptoNexus";
import ByteStudio from "./pages/ByteStudio";
import Founder from "./pages/Founder";
import NexusStudio from "./pages/NexusStudio";
import { ThemeProvider } from "./components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

// Lazy load dashboard components for better performance
const AdvancedLeadForm = lazy(() => 
  import("./components/AdvancedLeadForm").then(module => ({ default: module.AdvancedLeadForm }))
);
const ContentManagementDashboard = lazy(() => 
  import("./components/ContentManagementDashboard").then(module => ({ default: module.ContentManagementDashboard }))
);
const AutomationWorkflowDashboard = lazy(() => 
  import("./components/AutomationWorkflowDashboard").then(module => ({ default: module.AutomationWorkflowDashboard }))
);
const AnalyticsMonitoringDashboard = lazy(() => 
  import("./components/AnalyticsMonitoringDashboard").then(module => ({ default: module.AnalyticsMonitoringDashboard }))
);

// Loading component for dashboard routes
function DashboardLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/founder" component={Founder} />
      <Route path="/crypto-nexus" component={CryptoNexus} />
      <Route path="/byte-studio" component={ByteStudio} />
      <Route path="/nexus-studio" component={NexusStudio} />
      
      {/* Dashboard routes with lazy loading */}
      <Route path="/lead-form">
        <Suspense fallback={<DashboardLoading />}>
          <AdvancedLeadForm />
        </Suspense>
      </Route>
      <Route path="/dashboard/content">
        <Suspense fallback={<DashboardLoading />}>
          <ContentManagementDashboard />
        </Suspense>
      </Route>
      <Route path="/dashboard/automation">
        <Suspense fallback={<DashboardLoading />}>
          <AutomationWorkflowDashboard />
        </Suspense>
      </Route>
      <Route path="/dashboard/analytics">
        <Suspense fallback={<DashboardLoading />}>
          <AnalyticsMonitoringDashboard />
        </Suspense>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="nexus-theme">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;