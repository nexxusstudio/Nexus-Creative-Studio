import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "./components/ErrorBoundary";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import CryptoNexus from "./pages/CryptoNexus";
import ByteStudio from "./pages/ByteStudio";
import Founder from "./pages/Founder";
import NexusStudio from "./pages/NexusStudio";
import { ThemeProvider } from "./components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/founder" component={Founder} />
      <Route path="/crypto-nexus" component={CryptoNexus} />
      <Route path="/byte-studio" component={ByteStudio} />
      <Route path="/nexus-studio" component={NexusStudio} />
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