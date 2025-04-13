export interface IProduct {
  _id: string;
  storeId: string;
  creatorId: string;
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  files: {
    url: string;
    name: string;
    size: number;
    type: string;
  }[];
  thumbnail?: string;
  salesCount: number;
  rating: number;
  reviews: {
    userId: string;
    rating: number;
    comment: string;
    date: Date;
  }[];
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
} 