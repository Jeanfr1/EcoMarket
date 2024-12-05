import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product } from '@/types';

export const useCartStore = defineStore('cart', () => {
  const items = ref<{ product: Product; quantity: number }[]>([]);

  const total = computed(() => 
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  const totalCarbonFootprint = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.carbonFootprint * item.quantity, 0)
  );

  const addItem = (product: Product) => {
    const existingItem = items.value.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({ product, quantity: 1 });
    }
  };

  const removeItem = (productId: string) => {
    items.value = items.value.filter(item => item.product.id !== productId);
  };

  return {
    items,
    total,
    totalCarbonFootprint,
    addItem,
    removeItem,
  };
});