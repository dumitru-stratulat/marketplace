
export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  orders: ItemInterface[];
  createdDate: string;
}

export interface ItemInterface {
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

export interface CartInterface {
  data: ItemInterface[];
}

export interface LatestProducts {
  data: ItemInterface[];
  page_current: number;
  page_total: number;
  objects_per_page: number;
  objects_total: number;
}