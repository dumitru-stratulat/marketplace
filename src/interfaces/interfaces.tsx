
export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  createdDate: string;
  profileTitle: string;
  profileDescription: string;
  email: string;
  location: string[];
}

export interface Product {
  _id: number;
  title: string;
  description: string;
  category: string;
  imagesUrl: string[];
  rating: number;
  sold: boolean;
  userId: number;
  createdDate: string;
  price: number;
}

export interface Cart {
  data: Product[];
}

export interface Latest {
  data: Product[];
  page_current: number;
  page_total: number;
  objects_per_page: number;
  objects_total: number;
}

export interface File {
  lastModified: number;
  lastModifiedDate: number;
  name: string;
  originFileObj: Blob;
  percent: number;
  response: string;
  size: number;
  status: string;
  thumbUrl: string;
  type: string;
  uid: string;
  url: string;
}