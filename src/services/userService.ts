
import api from '@/api/axios';
import { User } from '@/types/auth';

export const userService = {
  async getAllUsers(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  }
};
