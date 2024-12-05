<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const props = defineProps<{
  name: string;
  icon: string;
  description: string;
}>();

const badgeRef = ref<HTMLElement | null>(null);
const isHovered = ref(false);

const handleMouseEnter = () => {
  isHovered.value = true;
  if (badgeRef.value) {
    gsap.to(badgeRef.value, {
      scale: 1.1,
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
  }
};

const handleMouseLeave = () => {
  isHovered.value = false;
  if (badgeRef.value) {
    gsap.to(badgeRef.value, {
      scale: 1,
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
  }
};

onMounted(() => {
  gsap.from(badgeRef.value, {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    ease: 'back.out(1.7)',
    delay: Math.random() * 0.5
  });
});
</script>

<template>
  <div
    ref="badgeRef"
    class="relative group cursor-pointer"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div 
      class="w-16 h-16 rounded-full bg-eco-100 flex items-center justify-center
        transition-shadow duration-300 shadow-md group-hover:shadow-lg"
    >
      <span class="text-2xl" v-html="icon"></span>
    </div>
    
    <!-- Tooltip -->
    <div
      v-show="isHovered"
      class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48
        bg-white rounded-lg shadow-lg p-3 text-sm z-10"
    >
      <div class="font-semibold text-eco-600 mb-1">{{ name }}</div>
      <div class="text-gray-600">{{ description }}</div>
      
      <!-- Arrow -->
      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2
        w-3 h-3 bg-white rotate-45"></div>
    </div>
  </div>
</template>