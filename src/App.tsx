
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { AddItem } from "./pages/AddItem";
import { MyItems } from "./pages/MyItems";
import { ItemDetails } from "./pages/ItemDetails";
import { AdminPanel } from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import { authService } from "@/services/authService";

const queryClient = new QueryClient();

const App = () => {
  // Redirect authenticated users away from auth page
  const AuthRoute = () => {
    if (authService.isAuthenticated()) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Auth />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthRoute />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add-item" 
              element={
                <ProtectedRoute>
                  <AddItem />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-items" 
              element={
                <ProtectedRoute>
                  <MyItems />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/item/:id" 
              element={
                <ProtectedRoute>
                  <ItemDetails />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Only Route */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />

            {/* Remove old routes that are no longer needed */}
            <Route path="/report-lost" element={<Navigate to="/add-item" replace />} />
            <Route path="/report-found" element={<Navigate to="/add-item" replace />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
