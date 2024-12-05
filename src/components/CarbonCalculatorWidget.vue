<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const globeRef = ref<HTMLElement | null>(null);
const markerRefs = ref<HTMLElement[]>([]);
const calculatedCarbon = ref(0);

const markers = [
  { x: 20, y: 30 },
  { x: 60, y: 40 },
  { x: 80, y: 60 },
  { x: 40, y: 70 }
];

const animateGlobe = () => {
  gsap.to(globeRef.value, {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: 'none'
  });
};

const animateMarkers = () => {
  markerRefs.value.forEach((marker, index) => {
    gsap.to(marker, {
      scale: 1.5,
      opacity: 0.2,
      duration: 1.5,
      repeat: -1,
      delay: index * 0.3,
      ease: 'power1.inOut'
    });
  });
};

const calculateImpact = (value: number) => {
  gsap.to(calculatedCarbon, {
    value,
    duration: 2,
    ease: 'power2.out',
    onUpdate: () => {
      calculatedCarbon.value = Math.round(calculatedCarbon.value);
    }
  });
};

onMounted(() => {
  animateGlobe();
  animateMarkers();
  calculateImpact(1250);
});
</script>

<template>
  <div class="relative p-8 eco-card overflow-hidden">
    <div class="relative z-10">
      <h3 class="text-2xl font-bold mb-6">Carbon Impact Calculator</h3>
      
      <div class="flex items-center justify-center mb-8">
        <div class="text-center">
          <div class="text-4xl font-bold text-eco-600 mb-2">
            {{ calculatedCarbon }}kg
          </div>
          <div class="text-gray-600">CO₂ Reduced</div>
        </div>
      </div>
    </div>

    <!-- Animated Globe Background -->
    <div 
      ref="globeRef"
      class="absolute inset-0 opacity-10"
      style="background: radial-gradient(circle at center, #16a34a 0%, transparent 70%)"
    >
      <!-- Grid Lines -->
      <div class="absolute inset-0" 
        style="background-image: linear-gradient(0deg, transparent 24%, rgba(22, 163, 74, .3) 25%, rgba(22, 163, 74, .3) 26%, transparent 27%, transparent 74%, rgba(22, 163, 74, .3) 75%, rgba(22, 163, 74, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(22, 163, 74, .3) 25%, rgba(22, 163, 74, .3) 26%, transparent 27%, transparent 74%, rgba(22, 163, 74, .3) 75%, rgba(22, 163, 74, .3) 76%, transparent 77%, transparent); background-size:50px 50px;">
      </div>
    </div>

    <!-- Glowing Markers -->
    <div 
      v-for="(marker, index) in markers"
      :key="index"
      :ref="el => { if (el) markerRefs[index] = el as HTMLElement }"
      class="absolute w-3 h-3 bg-eco-500 rounded-full"
      :style="{
        left: `${marker.x}%`,
        top: `${marker.y}%`,
        boxShadow: '0 0 10px #16a34a'
      }"
    ></div>
  </div>
</template>