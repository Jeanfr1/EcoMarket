<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { gsap } from 'gsap';

const patternRef = ref<HTMLElement | null>(null);
const leafRefs = ref<HTMLElement[]>([]);

const createLeafElements = () => {
  const leaves = [];
  for (let i = 0; i < 15; i++) {
    leaves.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      emoji: ['🌿', '🍃', '🌱'][Math.floor(Math.random() * 3)]
    });
  }
  return leaves;
};

const leaves = createLeafElements();

onMounted(() => {
  leafRefs.value.forEach((leaf, index) => {
    gsap.to(leaf, {
      y: '+=50',
      x: '+=20',
      rotation: '+=45',
      duration: 8 + Math.random() * 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.2
    });
  });
});

const hexagonPatternStyle = computed(() => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
      <path d="M30 5L55 20V40L30 55L5 40V20L30 5Z" fill="none" stroke="#16a34a" stroke-width="1.5" opacity="0.6"/>
    </svg>
  `.trim();

  const encodedSvg = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');

  return {
    backgroundImage: `url("data:image/svg+xml,${encodedSvg}")`,
    backgroundSize: '60px 60px',
    opacity: '0.25'
  };
});
</script>

<template>
  <div ref="patternRef" class="fixed inset-0 pointer-events-none overflow-hidden">
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-eco-50/50 to-eco-100/30"></div>
    
    <!-- Animated Leaves -->
    <div
      v-for="(leaf, index) in leaves"
      :key="index"
      :ref="el => { if (el) leafRefs[index] = el as HTMLElement }"
      class="absolute text-2xl text-eco-600 transition-opacity duration-1000"
      :style="{
        left: `${leaf.x}%`,
        top: `${leaf.y}%`,
        transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
        opacity: '0.25'
      }"
    >
      {{ leaf.emoji }}
    </div>
    
    <!-- Hexagon Grid Pattern -->
    <div 
      class="absolute inset-0"
      :style="hexagonPatternStyle"
    ></div>
  </div>
</template>