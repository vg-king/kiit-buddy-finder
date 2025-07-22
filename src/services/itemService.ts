
import api from '@/api/axios';
import { Item, CreateItemRequest } from '@/types/item';

export const itemService = {
  async getAllItems(): Promise<Item[]> {
    const response = await api.get('/items');
    return response.data;
  },

  async getItemById(id: number): Promise<Item> {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  async createItem(item: CreateItemRequest): Promise<Item> {
    const response = await api.post('/items', item);
    return response.data;
  },

  async deleteItem(id: number): Promise<void> {
    await api.delete(`/items/${id}`);
  },

  async getMyItems(): Promise<Item[]> {
    const response = await api.get('/items');
    return response.data.filter((item: Item) => {
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      return item.userId === currentUser.id;
    });
  }
};
