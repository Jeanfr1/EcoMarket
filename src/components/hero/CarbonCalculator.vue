<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import RippleButton from '../RippleButton.vue';

const calculatorRef = ref<HTMLElement | null>(null);
const carbonFootprint = ref(0);
const treesPlanted = ref(0);
const showOffsetModal = ref(false);
const selectedOffset = ref<number | null>(null);
const isOffsetting = ref(false);

const offsetOptions = [
  { amount: 100, trees: 10, price: 15 },
  { amount: 250, trees: 25, price: 35 },
  { amount: 500, trees: 50, price: 65 },
];

onMounted(() => {
  // Initial 3D tilt animation
  if (calculatorRef.value) {
    const card = calculatorRef.value;
    
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  }

  // Animate initial values
  gsap.to(carbonFootprint, {
    value: 2500,
    duration: 2,
    ease: 'power2.out'
  });

  gsap.to(treesPlanted, {
    value: 150,
    duration: 2,
    ease: 'power2.out'
  });
});

const handleOffset = () => {
  showOffsetModal.value = true;
};

const selectOffset = (amount: number) => {
  selectedOffset.value = amount;
};

const confirmOffset = async () => {
  if (!selectedOffset.value) return;
  
  isOffsetting.value = true;
  
  const timeline = gsap.timeline();
  
  timeline.to(carbonFootprint, {
    value: carbonFootprint.value - selectedOffset.value,
    duration: 1.5,
    ease: 'power2.inOut'
  });
  
  timeline.to(treesPlanted, {
    value: treesPlanted.value + (selectedOffset.value / 10),
    duration: 1,
    ease: 'power2.out'
  }, '-=1');
  
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  isOffsetting.value = false;
  showOffsetModal.value = false;
  selectedOffset.value = null;
};
</script>

<template>
  <div 
    ref="calculatorRef"
    class="eco-card p-8 backdrop-blur-sm transform-gpu transition-transform duration-300"
    style="transform-style: preserve-3d;"
  >
    <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r from-eco-600 to-eco-400 bg-clip-text text-transparent
      animate-pulse">
      Track Your Impact
    </h2>
    
    <div class="grid md:grid-cols-2 gap-8 mb-8">
      <div class="space-y-2 transform transition-transform hover:scale-105">
        <div class="text-gray-600 dark:text-dark-muted">Carbon Footprint</div>
        <div class="text-3xl font-bold text-eco-600 glow-text">
          {{ Math.round(carbonFootprint) }} kg CO₂
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden glow-bar">
          <div 
            class="h-full bg-eco-600 transition-all duration-1000"
            :style="{ width: `${Math.min((carbonFootprint / 5000) * 100, 100)}%` }"
          ></div>
        </div>
      </div>

      <div class="space-y-2 transform transition-transform hover:scale-105">
        <div class="text-gray-600 dark:text-dark-muted">Trees Planted</div>
        <div class="text-3xl font-bold text-eco-600 glow-text">
          {{ Math.round(treesPlanted) }}
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden glow-bar">
          <div 
            class="h-full bg-eco-600 transition-all duration-1000"
            :style="{ width: `${Math.min((treesPlanted / 200) * 100, 100)}%` }"
          ></div>
        </div>
      </div>
    </div>

    <RippleButton 
      :label="isOffsetting ? 'Processing...' : 'Offset Your Impact'"
      class="w-full transform hover:scale-105 transition-transform glow-button"
      @click="handleOffset"
      :disabled="isOffsetting"
    />

    <!-- Offset Modal -->
    <div 
      v-if="showOffsetModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
      @click.self="showOffsetModal = false"
    >
      <div 
        class="bg-white dark:bg-dark-card rounded-xl p-8 max-w-md w-full mx-4 transform transition-all duration-300
          hover:shadow-2xl hover:shadow-eco-500/20"
        :class="{ 'scale-100 opacity-100': showOffsetModal, 'scale-95 opacity-0': !showOffsetModal }"
      >
        <h3 class="text-2xl font-bold mb-6 bg-gradient-to-r from-eco-600 to-eco-400 bg-clip-text text-transparent">
          Choose Your Offset Amount
        </h3>
        
        <div class="space-y-4 mb-8">
          <div 
            v-for="option in offsetOptions"
            :key="option.amount"
            class="p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer transform hover:scale-105"
            :class="[
              selectedOffset === option.amount 
                ? 'border-eco-500 bg-eco-50 dark:bg-eco-900/20 shadow-lg shadow-eco-500/20' 
                : 'border-gray-200 hover:border-eco-300'
            ]"
            @click="selectOffset(option.amount)"
          >
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold">{{ option.amount }} kg CO₂</span>
              <span class="text-eco-600 font-bold">${{ option.price }}</span>
            </div>
            <div class="text-sm text-gray-600 dark:text-dark-muted">
              Plants {{ option.trees }} trees • Supports local communities
            </div>
          </div>
        </div>

        <div class="flex gap-4">
          <button
            class="flex-1 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 
              transition-all duration-300 transform hover:scale-105"
            @click="showOffsetModal = false"
          >
            Cancel
          </button>
          <button
            class="flex-1 eco-button transform hover:scale-105 transition-transform glow-button"
            :disabled="!selectedOffset || isOffsetting"
            @click="confirmOffset"
          >
            {{ isOffsetting ? 'Processing...' : 'Confirm Offset' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glow-text {
  text-shadow: 0 0 10px rgba(22, 163, 74, 0.3);
}

.glow-bar {
  box-shadow: 0 0 10px rgba(22, 163, 74, 0.2);
}

.glow-button {
  box-shadow: 0 0 20px rgba(22, 163, 74, 0.3);
}

.glow-button:hover {
  box-shadow: 0 0 30px rgba(22, 163, 74, 0.4);
}

/* 3D Card Effect */
.eco-card {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.eco-card:hover {
  transform: translateZ(20px);
}

/* Animated Background */
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
</style>