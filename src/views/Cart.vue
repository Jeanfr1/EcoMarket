<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import RippleButton from '@/components/RippleButton.vue';

const cartStore = useCartStore();

const handleRemoveItem = (productId: string) => {
  cartStore.removeItem(productId);
};

const handleCheckout = () => {
  // TODO: Implement checkout functionality
  console.log('Proceeding to checkout...');
};
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-12">
      <div class="text-6xl mb-4">🛒</div>
      <h2 class="text-2xl font-semibold mb-4">Your cart is empty</h2>
      <p class="text-gray-600 dark:text-dark-muted mb-8">
        Start adding some eco-friendly products to make a difference!
      </p>
      <RouterLink to="/products" class="eco-button">
        Browse Products
      </RouterLink>
    </div>

    <div v-else class="space-y-8">
      <!-- Cart Items -->
      <div class="bg-white dark:bg-dark-card rounded-xl shadow-lg overflow-hidden">
        <div class="divide-y divide-gray-200 dark:divide-dark-hover">
          <div
            v-for="item in cartStore.items"
            :key="item.product.id"
            class="p-6 flex items-center gap-6"
          >
            <img
              :src="item.product.imageUrl"
              :alt="item.product.name"
              class="w-24 h-24 object-cover rounded-lg"
            />
            
            <div class="flex-1">
              <h3 class="text-lg font-semibold mb-1">{{ item.product.name }}</h3>
              <p class="text-gray-600 dark:text-dark-muted text-sm mb-2">
                {{ item.product.description }}
              </p>
              <div class="flex items-center text-sm text-gray-600 dark:text-dark-muted">
                <span class="mr-4">Quantity: {{ item.quantity }}</span>
                <span>Carbon Footprint: {{ item.product.carbonFootprint * item.quantity }}kg CO₂</span>
              </div>
            </div>

            <div class="text-right">
              <div class="text-lg font-bold mb-2">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </div>
              <button
                @click="handleRemoveItem(item.product.id)"
                class="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Cart Summary</h2>
        
        <div class="space-y-2 mb-4">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-dark-muted">Subtotal</span>
            <span class="font-semibold">${{ cartStore.total.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-dark-muted">Carbon Footprint</span>
            <span class="font-semibold">{{ cartStore.totalCarbonFootprint }}kg CO₂</span>
          </div>
        </div>

        <div class="pt-4 border-t border-gray-200 dark:border-dark-hover">
          <RippleButton
            label="Proceed to Checkout"
            class="w-full"
            @click="handleCheckout"
          />
        </div>
      </div>
    </div>
  </div>
</template>