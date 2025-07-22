
import { Navigate } from 'react-router-dom';
import { authService } from '@/services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'USER' | 'ADMIN';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole) {
    const user = authService.getCurrentUserFromStorage();
    if (!user || user.role !== requiredRole) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};
