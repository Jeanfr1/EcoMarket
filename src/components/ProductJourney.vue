<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const journeyRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (journeyRef.value) {
    // Animate journey steps
    gsap.from('.journey-step', {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: journeyRef.value,
        start: 'top center',
        toggleActions: 'play none none reverse'
      }
    });
  }
});
</script>

<template>
  <div ref="journeyRef" class="py-12 bg-gray-50">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-12">From Source to Sustainability</h2>
      
      <div class="relative">
        <!-- Connection line -->
        <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-eco-200 transform -translate-x-1/2"></div>
        
        <!-- Journey steps -->
        <div class="space-y-24">
          <div class="journey-step relative flex items-center">
            <div class="w-1/2 pr-8 text-right">
              <h3 class="text-xl font-semibold mb-2">Sustainable Sourcing</h3>
              <p class="text-gray-600">Materials carefully selected from eco-certified suppliers</p>
            </div>
            <div class="absolute left-1/2 w-4 h-4 bg-eco-500 rounded-full transform -translate-x-1/2"></div>
            <div class="w-1/2 pl-8"></div>
          </div>
          
          <div class="journey-step relative flex items-center">
            <div class="w-1/2 pr-8"></div>
            <div class="absolute left-1/2 w-4 h-4 bg-eco-500 rounded-full transform -translate-x-1/2"></div>
            <div class="w-1/2 pl-8">
              <h3 class="text-xl font-semibold mb-2">Eco-Friendly Production</h3>
              <p class="text-gray-600">Manufactured using renewable energy and minimal waste</p>
            </div>
          </div>
          
          <div class="journey-step relative flex items-center">
            <div class="w-1/2 pr-8 text-right">
              <h3 class="text-xl font-semibold mb-2">Green Packaging</h3>
              <p class="text-gray-600">100% recyclable and biodegradable packaging materials</p>
            </div>
            <div class="absolute left-1/2 w-4 h-4 bg-eco-500 rounded-full transform -translate-x-1/2"></div>
            <div class="w-1/2 pl-8"></div>
          </div>
          
          <div class="journey-step relative flex items-center">
            <div class="w-1/2 pr-8"></div>
            <div class="absolute left-1/2 w-4 h-4 bg-eco-500 rounded-full transform -translate-x-1/2"></div>
            <div class="w-1/2 pl-8">
              <h3 class="text-xl font-semibold mb-2">Carbon-Neutral Delivery</h3>
              <p class="text-gray-600">Optimized routes and electric vehicles for minimal impact</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>