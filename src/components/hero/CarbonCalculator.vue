<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import RippleButton from '../RippleButton.vue';

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
  
  // Animate the offset process
  const timeline = gsap.timeline();
  
  // Reduce carbon footprint
  timeline.to(carbonFootprint, {
    value: carbonFootprint.value - selectedOffset.value,
    duration: 1.5,
    ease: 'power2.inOut'
  });
  
  // Increase trees planted
  timeline.to(treesPlanted, {
    value: treesPlanted.value + (selectedOffset.value / 10),
    duration: 1,
    ease: 'power2.out'
  }, '-=1');
  
  // Wait for animations to complete
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  isOffsetting.value = false;
  showOffsetModal.value = false;
  selectedOffset.value = null;
};
</script>

<template>
  <div class="eco-card p-8 backdrop-blur-sm">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-dark-text mb-6">Track Your Impact</h2>
    
    <div class="grid md:grid-cols-2 gap-8 mb-8">
      <div class="space-y-2">
        <div class="text-gray-600 dark:text-dark-muted">Carbon Footprint</div>
        <div class="text-3xl font-bold text-eco-600">
          {{ Math.round(carbonFootprint) }} kg CO₂
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full bg-eco-600 transition-all duration-1000"
            :style="{ width: `${Math.min((carbonFootprint / 5000) * 100, 100)}%` }"
          ></div>
        </div>
      </div>

      <div class="space-y-2">
        <div class="text-gray-600 dark:text-dark-muted">Trees Planted</div>
        <div class="text-3xl font-bold text-eco-600">
          {{ Math.round(treesPlanted) }}
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full bg-eco-600 transition-all duration-1000"
            :style="{ width: `${Math.min((treesPlanted / 200) * 100, 100)}%` }"
          ></div>
        </div>
      </div>
    </div>

    <RippleButton 
      :label="isOffsetting ? 'Processing...' : 'Offset Your Impact'"
      class="w-full"
      @click="handleOffset"
      :disabled="isOffsetting"
    />

    <!-- Offset Modal -->
    <div 
      v-if="showOffsetModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showOffsetModal = false"
    >
      <div 
        class="bg-white dark:bg-dark-card rounded-xl p-8 max-w-md w-full mx-4 transform transition-all duration-300"
        :class="{ 'scale-100 opacity-100': showOffsetModal, 'scale-95 opacity-0': !showOffsetModal }"
      >
        <h3 class="text-2xl font-bold mb-6">Choose Your Offset Amount</h3>
        
        <div class="space-y-4 mb-8">
          <div 
            v-for="option in offsetOptions"
            :key="option.amount"
            class="p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer"
            :class="[
              selectedOffset === option.amount 
                ? 'border-eco-500 bg-eco-50 dark:bg-eco-900/20' 
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
            class="flex-1 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-300"
            @click="showOffsetModal = false"
          >
            Cancel
          </button>
          <button
            class="flex-1 eco-button"
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