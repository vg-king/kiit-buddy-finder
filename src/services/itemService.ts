
import api from '@/api/axios';
import { Item, CreateItemRequest } from '@/types/item';
import { authService } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

export const itemService = {
  async getAllItems(): Promise<Item[]> {
    try {
      const response = await api.get('/items');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
      // Error already handled by axios interceptor
      throw error;
    }
  },

  async getItemById(id: number): Promise<Item> {
    try {
      if (!id || id <= 0) {
        throw new Error('Invalid item ID');
      }
      
      const response = await api.get(`/items/${id}`);
      if (!response.data) {
        throw new Error('Item not found');
      }
      
      return response.data;
    } catch (error: any) {
      // Error already handled by axios interceptor
      throw error;
    }
  },

  async createItem(item: CreateItemRequest): Promise<Item> {
    try {
      // Validate required fields
      if (!item.title?.trim() || !item.description?.trim() || !item.category?.trim()) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        throw new Error('Missing required fields');
      }

      const response = await api.post('/items', item);
      
      if (!response.data) {
        throw new Error('Failed to create item');
      }

      toast({
        title: "Success!",
        description: "Your item has been reported successfully.",
        variant: "default",
      });

      return response.data;
    } catch (error: any) {
      // Error already handled by axios interceptor
      throw error;
    }
  },

  async deleteItem(id: number): Promise<void> {
    try {
      if (!id || id <= 0) {
        throw new Error('Invalid item ID');
      }

      // Check if user has permission to delete
      const userRole = authService.getUserRole();
      if (!userRole) {
        throw new Error('Authentication required');
      }

      await api.delete(`/items/${id}`);
      
      toast({
        title: "Item Deleted",
        description: "The item has been successfully deleted.",
        variant: "default",
      });
    } catch (error: any) {
      // Error already handled by axios interceptor
      throw error;
    }
  },

  async getMyItems(): Promise<Item[]> {
    try {
      // Get current user safely
      const currentUser = authService.getCurrentUserFromStorage();
      if (!currentUser?.id) {
        toast({
          title: "Authentication Error",
          description: "Please log in to view your items.",
          variant: "destructive",
        });
        return [];
      }

      const response = await api.get('/items');
      const allItems = Array.isArray(response.data) ? response.data : [];
      
      // Filter items by current user
      return allItems.filter((item: Item) => item.userId === currentUser.id);
    } catch (error: any) {
      // Error already handled by axios interceptor
      throw error;
    }
  },

  // Get items with enhanced filtering and search
  async searchItems(params: {
    search?: string;
    category?: string;
    status?: 'LOST' | 'FOUND';
    location?: string;
  }): Promise<Item[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.search) queryParams.append('search', params.search);
      if (params.category) queryParams.append('category', params.category);
      if (params.status) queryParams.append('status', params.status);
      if (params.location) queryParams.append('location', params.location);

      const url = `/items${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await api.get(url);
      
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
      // If search endpoint doesn't exist, fall back to client-side filtering
      if (error.response?.status === 404) {
        const allItems = await this.getAllItems();
        return this.filterItemsClientSide(allItems, params);
      }
      throw error;
    }
  },

  // Client-side filtering fallback
  filterItemsClientSide(items: Item[], params: {
    search?: string;
    category?: string;
    status?: 'LOST' | 'FOUND';
    location?: string;
  }): Item[] {
    return items.filter(item => {
      const searchMatch = !params.search || 
        item.title.toLowerCase().includes(params.search.toLowerCase()) ||
        item.description.toLowerCase().includes(params.search.toLowerCase());
      
      const categoryMatch = !params.category || item.category === params.category;
      const statusMatch = !params.status || item.status === params.status;
      const locationMatch = !params.location || 
        item.location.toLowerCase().includes(params.location.toLowerCase());

      return searchMatch && categoryMatch && statusMatch && locationMatch;
    });
  }
};
