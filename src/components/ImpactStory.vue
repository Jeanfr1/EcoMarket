<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cartStore = useCartStore();
const storyRef = ref<HTMLElement | null>(null);

const impactMetrics = ref({
  treesPlanted: 0,
  waterSaved: 0,
  plasticReduced: 0
});

onMounted(() => {
  // Animate metrics when scrolled into view
  if (storyRef.value) {
    gsap.from(impactMetrics.value, {
      treesPlanted: 0,
      waterSaved: 0,
      plasticReduced: 0,
      duration: 2,
      scrollTrigger: {
        trigger: storyRef.value,
        start: 'top center',
        toggleActions: 'play none none reverse'
      },
      onUpdate: () => {
        impactMetrics.value = {
          treesPlanted: Math.round(impactMetrics.value.treesPlanted),
          waterSaved: Math.round(impactMetrics.value.waterSaved),
          plasticReduced: Math.round(impactMetrics.value.plasticReduced)
        };
      }
    });
  }
});
</script>

<template>
  <div ref="storyRef" class="py-12">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">Your Green Impact Story</h2>
      
      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <div class="eco-card p-6 transform hover:-translate-y-2 transition-transform duration-300">
          <div class="text-4xl text-eco-600 font-bold mb-2">{{ impactMetrics.treesPlanted }}</div>
          <div class="text-gray-600">Trees Planted</div>
        </div>
        
        <div class="eco-card p-6 transform hover:-translate-y-2 transition-transform duration-300">
          <div class="text-4xl text-eco-600 font-bold mb-2">{{ impactMetrics.waterSaved }}L</div>
          <div class="text-gray-600">Water Saved</div>
        </div>
        
        <div class="eco-card p-6 transform hover:-translate-y-2 transition-transform duration-300">
          <div class="text-4xl text-eco-600 font-bold mb-2">{{ impactMetrics.plasticReduced }}kg</div>
          <div class="text-gray-600">Plastic Reduced</div>
        </div>
      </div>
      
      <div v-if="cartStore.items.length > 0" class="eco-card p-8">
        <h3 class="text-2xl font-semibold mb-4">Your Current Cart Impact</h3>
        <div class="text-lg text-gray-600">
          By purchasing these items, you'll help reduce carbon emissions by
          <span class="text-eco-600 font-bold">{{ cartStore.totalCarbonFootprint }}kg CO₂</span>
        </div>
      </div>
    </div>
  </div>
</template>