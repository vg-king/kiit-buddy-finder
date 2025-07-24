
import api from '@/api/axios';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

interface JWTPayload {
  sub: string;
  role: 'USER' | 'ADMIN';
  exp: number;
  iat: number;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // Clear any existing expired tokens before login
      const existingToken = this.getToken();
      if (existingToken && !this.isValidToken(existingToken)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      
      const response = await api.post('/auth/login', credentials);
      
      const { token } = response.data;
      
      if (!token) {
        throw new Error('No token received from server');
      }

      // Validate token before storing
      if (!this.isValidToken(token)) {
        throw new Error('Invalid token received');
      }

      // Store token temporarily to make authenticated request for user info
      localStorage.setItem('token', token);
      
      try {
        // Get user info using the token
        const user = await this.getCurrentUser();
        
        // Store both token and user
        this.storeAuthData(token, user);
        
        toast({
          title: "Welcome back!",
          description: `Successfully logged in as ${user.name}`,
          variant: "default",
        });
        
        return { token, user };
      } catch (error) {
        // If we can't get user info, remove the token
        localStorage.removeItem('token');
        throw new Error('Failed to get user information');
      }
    } catch (error: any) {
      // Error is already handled by axios interceptor
      throw error;
    }
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      // Clear any existing expired tokens before registration
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;
      
      if (!token || !user) {
        throw new Error('Invalid response from server');
      }

      // Validate token before storing
      if (this.isValidToken(token)) {
        this.storeAuthData(token, user);
        
        toast({
          title: "Account Created!",
          description: `Welcome to KIIT Finder, ${user.name}!`,
          variant: "default",
        });
        
        return response.data;
      } else {
        throw new Error('Invalid token received');
      }
    } catch (error: any) {
      // Error is already handled by axios interceptor
      throw error;
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      // If we can't get current user, the token might be invalid
      this.logout();
      throw error;
    }
  },

  logout() {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
        variant: "default",
      });
    } catch (error) {
      console.warn('Failed to clear localStorage during logout:', error);
    }
  },

  getCurrentUserFromStorage(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr || userStr === 'undefined' || userStr === 'null') {
        return null;
      }
      return JSON.parse(userStr);
    } catch (error) {
      console.warn('Failed to parse user from localStorage:', error);
      // Clean up invalid data
      localStorage.removeItem('user');
      return null;
    }
  },

  getToken(): string | null {
    try {
      const token = localStorage.getItem('token');
      if (!token || token === 'undefined' || token === 'null') {
        return null;
      }
      return token;
    } catch (error) {
      console.warn('Failed to get token from localStorage:', error);
      return null;
    }
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Check if token is valid and not expired
    return this.isValidToken(token);
  },

  // Parse JWT token to get user role and other claims
  getTokenPayload(): JWTPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      // JWT tokens have 3 parts separated by dots
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      // Decode the payload (second part)
      const payload = parts[1];
      // Add padding if necessary
      const padded = payload + '='.repeat((4 - payload.length % 4) % 4);
      const decoded = atob(padded);
      return JSON.parse(decoded);
    } catch (error) {
      console.warn('Failed to parse JWT token:', error);
      return null;
    }
  },

  // Get user role from JWT token
  getUserRole(): 'USER' | 'ADMIN' | null {
    const payload = this.getTokenPayload();
    return payload?.role || null;
  },

  // Check if user has admin privileges
  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  },

  // Check if user has at least user privileges
  isUser(): boolean {
    const role = this.getUserRole();
    return role === 'USER' || role === 'ADMIN';
  },

  // Validate token format and expiration
  isValidToken(token: string): boolean {
    if (!token || typeof token !== 'string') return false;

    try {
      const payload = this.parseTokenPayload(token);
      if (!payload) return false;

      // Check if token is expired
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    } catch (error) {
      return false;
    }
  },

  // Helper method to parse token payload
  parseTokenPayload(token: string): JWTPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = parts[1];
      const padded = payload + '='.repeat((4 - payload.length % 4) % 4);
      const decoded = atob(padded);
      return JSON.parse(decoded);
    } catch (error) {
      return null;
    }
  },

  // Helper method to safely store auth data
  storeAuthData(token: string, user: User): void {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store auth data:', error);
      toast({
        title: "Storage Error",
        description: "Failed to save login data. Please try again.",
        variant: "destructive",
      });
      throw new Error('Failed to store authentication data');
    }
  }
};
