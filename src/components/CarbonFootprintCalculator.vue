<script setup lang="ts">
import { ref, computed } from 'vue';
import { gsap } from 'gsap';
import { useCartStore } from '@/stores/cart';
import RippleButton from './RippleButton.vue';

const cartStore = useCartStore();
const offsetAmount = ref(0);

const impactPercentage = computed(() => {
  return Math.min((offsetAmount.value / cartStore.totalCarbonFootprint) * 100, 100);
});

const handleOffset = () => {
  gsap.to(offsetAmount, {
    value: cartStore.totalCarbonFootprint,
    duration: 1,
    ease: 'power2.out',
    onComplete: () => {
      // Here you would typically call an API to process the carbon offset
      console.log('Carbon offset processed:', offsetAmount.value);
    }
  });
};
</script>

<template>
  <div class="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg">
    <h2 class="text-2xl font-bold mb-4">Carbon Impact Calculator</h2>
    
    <div class="relative h-4 bg-gray-200 dark:bg-dark-hover rounded-full overflow-hidden mb-4">
      <div 
        class="absolute h-full bg-eco-500 transition-all duration-500"
        :style="{ width: `${impactPercentage}%` }"
      ></div>
    </div>
    
    <div class="flex justify-between text-sm text-gray-600 dark:text-dark-muted mb-6">
      <span>Current Footprint: {{ cartStore.totalCarbonFootprint }}kg CO₂</span>
      <span>Offset: {{ offsetAmount.toFixed(1) }}kg CO₂</span>
    </div>
    
    <div class="space-y-4">
      <RippleButton 
        label="Offset Your Impact"
        class="w-full"
        @click="handleOffset"
      />
    </div>
  </div>
</template>