<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { useRouter } from 'vue-router';
import RippleButton from '../RippleButton.vue';
import CarbonCalculator from './CarbonCalculator.vue';

const router = useRouter();
const heroRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const subtitleRef = ref<HTMLElement | null>(null);
const calculatorRef = ref<HTMLElement | null>(null);
const showJourneyModal = ref(false);

const journeyOptions = [
  {
    title: 'Browse Eco Products',
    description: 'Discover our curated selection of sustainable products',
    icon: '🌱',
    action: () => router.push('/products')
  },
  {
    title: 'Calculate Impact',
    description: 'See how you can reduce your carbon footprint',
    icon: '🌍',
    action: () => {
      const calculator = document.getElementById('carbon-calculator');
      if (calculator) {
        calculator.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  {
    title: 'Join Community',
    description: 'Connect with like-minded eco-conscious individuals',
    icon: '🤝',
    action: () => router.push('/register')
  }
];

onMounted(() => {
  // Animate title and subtitle
  gsap.from(titleRef.value, {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from(subtitleRef.value, {
    y: 20,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
  });

  // Animate calculator
  gsap.from(calculatorRef.value, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.5,
    ease: 'power2.out'
  });
});

const handleStartJourney = () => {
  showJourneyModal.value = true;
};

const handleJourneyOption = (action: () => void) => {
  showJourneyModal.value = false;
  action();
};
</script>

<template>
  <section 
    ref="heroRef" 
    class="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-eco-50/30 to-eco-100/20"></div>
      <!-- Floating Elements -->
      <div class="absolute w-full h-full">
        <div 
          v-for="i in 5" 
          :key="i"
          class="absolute animate-float"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.1
          }"
        >
          {{ ['🌱', '🌿', '🍃', '♻️', '🌎'][i % 5] }}
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 relative z-10">
      <!-- Hero Content -->
      <div class="text-center mb-16">
        <h1 
          ref="titleRef"
          class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-eco-700 to-eco-500 bg-clip-text text-transparent"
        >
          Sustainable Shopping for a Better Tomorrow
        </h1>
        <p 
          ref="subtitleRef"
          class="text-xl md:text-2xl text-gray-600 dark:text-dark-muted max-w-3xl mx-auto mb-12"
        >
          Discover eco-friendly products that make a difference. Every purchase contributes to a healthier planet.
        </p>
      </div>

      <!-- Carbon Calculator -->
      <div 
        ref="calculatorRef"
        id="carbon-calculator"
        class="max-w-2xl mx-auto mb-16"
      >
        <CarbonCalculator />
      </div>

      <!-- CTA Button -->
      <div class="text-center">
        <button
          @click="handleStartJourney"
          class="eco-button group text-lg px-8 py-4 relative overflow-hidden"
        >
          <span class="relative z-10">Start Your Eco Journey</span>
          <div class="absolute inset-0 bg-gradient-to-r from-eco-600 to-eco-500 transform transition-transform group-hover:scale-105"></div>
          <div class="absolute inset-0 bg-eco-400/30 blur-lg transform scale-110 animate-pulse"></div>
        </button>
      </div>
    </div>

    <!-- Journey Modal -->
    <div 
      v-if="showJourneyModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showJourneyModal = false"
    >
      <div 
        class="bg-white dark:bg-dark-card rounded-xl p-8 max-w-2xl w-full mx-4 transform transition-all duration-300"
        :class="{ 'scale-100 opacity-100': showJourneyModal, 'scale-95 opacity-0': !showJourneyModal }"
      >
        <h3 class="text-2xl font-bold mb-6">Choose Your Path</h3>
        
        <div class="grid md:grid-cols-3 gap-6 mb-8">
          <div 
            v-for="option in journeyOptions"
            :key="option.title"
            class="eco-card p-6 cursor-pointer transform transition-all duration-300 hover:scale-105"
            @click="handleJourneyOption(option.action)"
          >
            <div class="text-4xl mb-4">{{ option.icon }}</div>
            <h4 class="text-lg font-semibold mb-2">{{ option.title }}</h4>
            <p class="text-sm text-gray-600 dark:text-dark-muted">
              {{ option.description }}
            </p>
          </div>
        </div>

        <div class="text-center">
          <button
            class="text-gray-600 dark:text-dark-muted hover:text-eco-600 transition-colors duration-300"
            @click="showJourneyModal = false"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  </section>
</template>