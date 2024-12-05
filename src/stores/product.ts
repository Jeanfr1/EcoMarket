import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from '@/types';
import { api } from '@/services/api';

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      products.value = await api.getProducts();
    } catch (e) {
      error.value = 'Failed to fetch products';
      console.error('Error fetching products:', e);
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
  };
});