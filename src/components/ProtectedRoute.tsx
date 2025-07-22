
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '@/services/authService';
import { toast } from '@/hooks/use-toast';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'USER' | 'ADMIN';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const location = useLocation();

  // Check authentication
  if (!authService.isAuthenticated()) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check role-based access using JWT token
  if (requiredRole) {
    const userRole = authService.getUserRole();
    
    if (!userRole) {
      // Token exists but no role found - invalid token
      authService.logout();
      return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // Admin can access everything, users can only access USER routes
    const hasAccess = requiredRole === 'USER' 
      ? (userRole === 'USER' || userRole === 'ADMIN')
      : userRole === requiredRole;

    if (!hasAccess) {
      toast({
        title: "Access Denied",
        description: `You need ${requiredRole} privileges to access this page.`,
        variant: "destructive",
      });
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};
