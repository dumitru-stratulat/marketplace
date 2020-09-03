
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  orders: Item[];
  createdDate: string;
}

export interface Item {
  id: number;
  title: string;
  description: string;
  category: string;
  photos: string[];
  rating: number;
  sold: boolean;
  userId: number;
  createdDate: string;
  price: number;
}

export interface Cart {
  data: Item[];
}

export interface Latest {
  data: Item[];
  page_current: number;
  page_total: number;
  objects_per_page: number;
  objects_total: number;
}