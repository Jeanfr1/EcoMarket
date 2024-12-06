<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const storyRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);

const impactMetrics = ref({
  treesPlanted: 0,
  waterSaved: 0,
  plasticReduced: 0
});

onMounted(() => {
  // Glowing title animation
  if (titleRef.value) {
    gsap.to(titleRef.value, {
      filter: 'drop-shadow(0 0 15px rgba(22, 163, 74, 0.5))',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  // Animate metrics when scrolled into view
  if (storyRef.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: storyRef.value,
        start: 'top center',
        toggleActions: 'play none none reverse'
      }
    });

    tl.from(impactMetrics.value, {
      treesPlanted: 0,
      waterSaved: 0,
      plasticReduced: 0,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => {
        impactMetrics.value = {
          treesPlanted: Math.round(impactMetrics.value.treesPlanted),
          waterSaved: Math.round(impactMetrics.value.waterSaved),
          plasticReduced: Math.round(impactMetrics.value.plasticReduced)
        };
      }
    }).to(impactMetrics.value, {
      treesPlanted: 1500,
      waterSaved: 2500,
      plasticReduced: 3500,
      duration: 2.5,
      ease: 'power2.out',
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
  <div ref="storyRef" class="py-16 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-br from-eco-50/30 to-eco-100/20"></div>
      <div class="absolute w-full h-full">
        <div 
          v-for="i in 5" 
          :key="i"
          class="absolute text-4xl opacity-5 animate-float"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`
          }"
        >
          🌱
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4">
      <!-- Title with Glowing Effect -->
      <h2 
        ref="titleRef"
        class="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-eco-600 to-eco-400 
          bg-clip-text text-transparent relative"
      >
        Your Green Impact Story
      </h2>

      <!-- Impact Metrics Grid -->
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Trees Planted -->
        <div class="eco-card transform hover:scale-105 transition-all duration-300">
          <div class="relative p-8 text-center">
            <div class="text-5xl mb-4">🌳</div>
            <div class="text-4xl font-bold text-eco-600 mb-2 counter-value">
              {{ impactMetrics.treesPlanted }}
            </div>
            <div class="text-xl text-gray-600 dark:text-dark-muted">Trees Planted</div>
            
            <!-- Progress Ring -->
            <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                class="text-gray-200 stroke-current"
                stroke-width="4"
                fill="none"
                r="45"
                cx="50"
                cy="50"
              />
              <circle
                class="text-eco-500 stroke-current transition-all duration-1000"
                stroke-width="4"
                fill="none"
                r="45"
                cx="50"
                cy="50"
                :style="{
                  strokeDasharray: `${2 * Math.PI * 45}`,
                  strokeDashoffset: `${2 * Math.PI * 45 * (1 - impactMetrics.treesPlanted / 2000)}`
                }"
              />
            </svg>
          </div>
        </div>

        <!-- Water Saved -->
        <div class="eco-card transform hover:scale-105 transition-all duration-300">
          <div class="relative p-8 text-center">
            <div class="text-5xl mb-4">💧</div>
            <div class="text-4xl font-bold text-eco-600 mb-2 counter-value">
              {{ impactMetrics.waterSaved }}L
            </div>
            <div class="text-xl text-gray-600 dark:text-dark-muted">Water Saved</div>
            
            <!-- Progress Ring -->
            <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                class="text-gray-200 stroke-current"
                stroke-width="4"
                fill="none"
                r="45"
                cx="50"
                cy="50"
              />
              <circle
                class="text-eco-500 stroke-current transition-all duration-1000"
                stroke-width="4"
                fill="none"
                r="45"
                cx="50"
                cy="50"
                :style="{
                  strokeDasharray: `${2 * Math.PI * 45}`,
                  strokeDashoffset: `${2 * Math.PI * 45 * (1 - impactMetrics.waterSaved / 3000)}`
                }"
              />
            </svg>
          </div>
        </div>

        <!-- Plastic Reduced -->
        <div class="eco-card transform hover:scale-105 transition-all duration-300">
          <div class="relative p-8 text-center">
            <div class="text-5xl mb-4">♻️</div>
            <div class="text-4xl font-bold text-eco-600 mb-2 counter-value">
              {{ impactMetrics.plasticReduced }}kg
            </div>
            <div class="text-xl text-gray-600 dark:text-dark-muted">Plastic Reduced</div>
            
            <!-- Progress Ring -->
            <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                class="text-gray-200 stroke-current"
                stroke-width="4"
                fill="none"
                r="45"
                cx="50"
                cy="50"
              />
              <circle
                class="text-eco-500 stroke-current transition-all duration-1000"
                stroke-width="4"
                fill="none"
                r="45"
                cx="50"
                cy="50"
                :style="{
                  strokeDasharray: `${2 * Math.PI * 45}`,
                  strokeDashoffset: `${2 * Math.PI * 45 * (1 - impactMetrics.plasticReduced / 4000)}`
                }"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.counter-value {
  text-shadow: 0 0 10px rgba(22, 163, 74, 0.3);
}

.eco-card {
  position: relative;
  overflow: hidden;
}

.eco-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: linear-gradient(45deg, rgba(22, 163, 74, 0.3), rgba(34, 197, 94, 0.3));
  filter: blur(15px);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.eco-card:hover::before {
  opacity: 1;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

circle {
  transition: stroke-dashoffset 1s ease;
}
</style>