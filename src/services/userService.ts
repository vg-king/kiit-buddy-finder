
import api from '@/api/axios';
import { User } from '@/types/auth';
import { authService } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

export const userService = {
  async getAllUsers(): Promise<User[]> {
    try {
      // Check admin permissions
      if (!authService.isAdmin()) {
        toast({
          title: "Access Denied",
          description: "You need admin privileges to view all users.",
          variant: "destructive",
        });
        throw new Error('Admin access required');
      }

      const response = await api.get('/users');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
      // Error already handled by axios interceptor
      throw error;
    }
  },

  async deleteUser(id: number): Promise<void> {
    try {
      // Check admin permissions
      if (!authService.isAdmin()) {
        toast({
          title: "Access Denied",
          description: "You need admin privileges to delete users.",
          variant: "destructive",
        });
        throw new Error('Admin access required');
      }

      if (!id || id <= 0) {
        throw new Error('Invalid user ID');
      }

      // Prevent self-deletion
      const currentUser = authService.getCurrentUserFromStorage();
      if (currentUser?.id === id) {
        toast({
          title: "Action Not Allowed",
          description: "You cannot delete your own account.",
          variant: "destructive",
        });
        throw new Error('Cannot delete own account');
      }

      await api.delete(`/users/${id}`);
      
      toast({
        title: "User Deleted",
        description: "The user has been successfully deleted.",
        variant: "default",
      });
    } catch (error: any) {
      // Error already handled by axios interceptor
      throw error;
    }
  },

  async updateUserRole(id: number, role: 'USER' | 'ADMIN'): Promise<User> {
    try {
      // Check admin permissions
      if (!authService.isAdmin()) {
        toast({
          title: "Access Denied",
          description: "You need admin privileges to update user roles.",
          variant: "destructive",
        });
        throw new Error('Admin access required');
      }

      if (!id || id <= 0) {
        throw new Error('Invalid user ID');
      }

      if (!['USER', 'ADMIN'].includes(role)) {
        throw new Error('Invalid role');
      }

      const response = await api.patch(`/users/${id}/role`, { role });
      
      toast({
        title: "Role Updated",
        description: `User role has been updated to ${role}.`,
        variant: "default",
      });

      return response.data;
    } catch (error: any) {
      // Error already handled by axios interceptor
      throw error;
    }
  }
};
