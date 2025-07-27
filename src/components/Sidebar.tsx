
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';
import { 
  Home, 
  Plus, 
  List, 
  User, 
  Settings, 
  LogOut,
  Search,
  Shield,
  AlertCircle
} from 'lucide-react';

interface NavItem {
  icon: any;
  label: string;
  path: string;
  requiredRole?: 'USER' | 'ADMIN';
}

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(authService.getCurrentUserFromStorage());
  const [userRole, setUserRole] = useState(authService.getUserRole());

  // Update user info when component mounts or auth state changes
  useEffect(() => {
    const currentUser = authService.getCurrentUserFromStorage();
    const currentRole = authService.getUserRole();
    setUser(currentUser);
    setUserRole(currentRole);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      authService.logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/auth');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  // Define all navigation items with role requirements
  const allMenuItems: NavItem[] = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Plus, label: 'Add Item', path: '/add-item', requiredRole: 'USER' },
    { icon: List, label: 'My Items', path: '/my-items', requiredRole: 'USER' },
    { icon: Shield, label: 'Admin Panel', path: '/admin', requiredRole: 'ADMIN' },
  ];

  // Filter menu items based on user role
  const getVisibleMenuItems = (): NavItem[] => {
    if (!userRole) return [];

    return allMenuItems.filter(item => {
      if (!item.requiredRole) return true; // Public items
      
      // Admin can access everything
      if (userRole === 'ADMIN') return true;
      
      // User can access USER items only
      if (userRole === 'USER' && item.requiredRole === 'USER') return true;
      
      return false;
    });
  };

  const visibleMenuItems = getVisibleMenuItems();
  const showAuthWarning = !user || !userRole;
  const isLoggedIn = user && userRole;

  return (
    <div className="w-64 bg-gradient-card border-r border-border/50 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-gentle">
            <Search className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
            KIIT Finder
          </span>
        </Link>
      </div>

      {/* User Info - Only show auth warning if not logged in */}
      {!isLoggedIn && (
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center space-x-3 text-warning">
            <AlertCircle className="w-5 h-5" />
            <div>
              <p className="font-medium text-sm">Auth Issue</p>
              <p className="text-xs">Please log in again</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Show user info when logged in */}
      {isLoggedIn && (
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center">
              <User className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">{user?.name}</p>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  userRole === 'ADMIN' 
                    ? 'bg-destructive/20 text-destructive' 
                    : 'bg-success/20 text-success'
                }`}>
                  {userRole}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {visibleMenuItems.length > 0 ? (
            visibleMenuItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="w-full justify-start rounded-xl"
                  size="sm"
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                  {item.requiredRole === 'ADMIN' && (
                    <Shield className="w-3 h-3 ml-auto text-destructive" />
                  )}
                </Button>
              </Link>
            ))
          ) : (
            // Only show "No accessible pages" if user is logged in but has no access
            isLoggedIn && (
              <div className="p-4 text-center text-muted-foreground">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">No accessible pages</p>
                <p className="text-xs">Contact administrator</p>
              </div>
            )
          )}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border/50">
        <Button
          variant="ghost"
          className="w-full justify-start rounded-xl text-destructive hover:text-destructive"
          size="sm"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};
