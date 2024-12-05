<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
</script>

<template>
  <div class="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6 transform transition-transform duration-300">
    <h2 class="text-2xl font-bold mb-6">Shopping Cart</h2>
    
    <div v-if="cartStore.items.length === 0" class="text-gray-500">
      Your cart is empty
    </div>
    
    <div v-else class="space-y-4">
      <div v-for="item in cartStore.items" :key="item.product.id" class="flex items-center gap-4">
        <img :src="item.product.imageUrl" :alt="item.product.name" class="w-16 h-16 object-cover rounded" />
        <div class="flex-1">
          <h3 class="font-medium">{{ item.product.name }}</h3>
          <p class="text-gray-600">${{ item.product.price }} × {{ item.quantity }}</p>
        </div>
        <button @click="cartStore.removeItem(item.product.id)" class="text-red-600">
          Remove
        </button>
      </div>
      
      <div class="border-t pt-4 mt-4">
        <div class="flex justify-between mb-2">
          <span>Total:</span>
          <span class="font-bold">${{ cartStore.total }}</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <span>Carbon Footprint:</span>
          <span>{{ cartStore.totalCarbonFootprint }}kg CO₂</span>
        </div>
      </div>
      
      <button class="w-full eco-button">
        Proceed to Checkout
      </button>
    </div>
  </div>
</template>