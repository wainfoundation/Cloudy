export interface IStore {
  _id: string;
  ownerId: string;
  name: string;
  description: string;
  domain: string;
  logo?: string;
  banner?: string;
  socialLinks?: {
    website?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
  categories: string[];
  totalSales: number;
  totalProducts: number;
  rating: number;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
} 