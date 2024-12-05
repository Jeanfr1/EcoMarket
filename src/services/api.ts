import { mockProducts } from './mockData';
import type { Product } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getProducts(): Promise<Product[]> {
    // Simulate network request
    await delay(800);
    return mockProducts;
  },
  
  async getProduct(id: string): Promise<Product | undefined> {
    await delay(500);
    return mockProducts.find(p => p.id === id);
  }
};