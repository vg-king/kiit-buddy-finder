
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
  Search
} from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = authService.getCurrentUserFromStorage();

  const handleLogout = () => {
    authService.logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/auth');
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Plus, label: 'Add Item', path: '/add-item' },
    { icon: List, label: 'My Items', path: '/my-items' },
  ];

  if (user?.role === 'ADMIN') {
    menuItems.push({ icon: Settings, label: 'Admin Panel', path: '/admin' });
  }

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

      {/* User Info */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center">
            <User className="w-5 h-5 text-secondary-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                className="w-full justify-start rounded-xl"
                size="sm"
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            </Link>
          ))}
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
