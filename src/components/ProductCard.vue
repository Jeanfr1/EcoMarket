<script setup lang="ts">
import { computed } from 'vue';
import type { Product } from '@/types';
import { useCartStore } from '@/stores/cart';
import EcoCertificationBadge from './EcoCertificationBadge.vue';
import RippleButton from './RippleButton.vue';

const props = defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();

const sustainabilityColor = computed(() => {
  const score = props.product.sustainabilityScore;
  if (score > 80) return 'text-green-600';
  if (score > 60) return 'text-yellow-600';
  return 'text-red-600';
});

const certificationIcons = {
  'Organic': '🌱',
  'Fair Trade': '🤝',
  'Carbon Neutral': '🌍',
  'Recycled': '♻️',
  'Biodegradable': '🍃',
  'Vegan': '🌿'
};

const certificationDescriptions = {
  'Organic': 'Produced without synthetic pesticides or fertilizers',
  'Fair Trade': 'Ensures fair compensation and working conditions',
  'Carbon Neutral': 'Net zero carbon emissions in production',
  'Recycled': 'Made from recycled materials',
  'Biodegradable': 'Naturally decomposes without harmful residues',
  'Vegan': 'Contains no animal products or byproducts'
};

const handleAddToCart = () => {
  cartStore.addItem(props.product);
};
</script>

<template>
  <div 
    class="relative group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    :class="{ 'transform hover:-translate-y-1': true }"
  >
    <img 
      :src="product.imageUrl" 
      :alt="product.name"
      class="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h3 class="text-xl font-semibold mb-2">{{ product.name }}</h3>
    
    <!-- Certifications -->
    <div class="flex flex-wrap gap-2 mb-4">
      <EcoCertificationBadge
        v-for="cert in product.certifications"
        :key="cert"
        :name="cert"
        :icon="certificationIcons[cert as keyof typeof certificationIcons]"
        :description="certificationDescriptions[cert as keyof typeof certificationDescriptions]"
      />
    </div>
    
    <div class="flex items-center mb-2">
      <span class="text-lg font-bold">${{ product.price }}</span>
      <div 
        class="ml-auto px-3 py-1 rounded-full text-sm"
        :class="sustainabilityColor"
      >
        {{ product.sustainabilityScore }}% Eco-Score
      </div>
    </div>
    
    <div class="flex items-center text-sm text-gray-600 mb-4">
      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" 
        />
      </svg>
      {{ product.carbonFootprint }}kg CO₂
    </div>
    
    <RippleButton 
      label="Add to Cart"
      class="w-full"
      @click="handleAddToCart"
    />
  </div>
</template>