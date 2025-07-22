
export interface Item {
  id: number;
  title: string;
  description: string;
  category: string;
  status: 'LOST' | 'FOUND';
  location: string;
  dateReported: string;
  contactInfo: string;
  userId: number;
  userName?: string;
}

export interface CreateItemRequest {
  title: string;
  description: string;
  category: string;
  status: 'LOST' | 'FOUND';
  location: string;
  contactInfo: string;
}
