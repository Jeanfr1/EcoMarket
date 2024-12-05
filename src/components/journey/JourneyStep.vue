<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  title: string;
  description: string;
  icon: string;
  position: 'left' | 'right';
  index: number;
}>();

const showDetails = ref(false);

const iconClass = computed(() => ({
  'left-1/2': true,
  '-translate-x-1/2': true,
  'w-16': true,
  'h-16': true,
  'rounded-full': true,
  'bg-eco-50': true,
  'flex': true,
  'items-center': true,
  'justify-center': true,
  'text-3xl': true,
  'shadow-lg': true,
  'transition-all': true,
  'duration-300': true,
  'hover:scale-110': true,
  'hover:bg-eco-100': true,
  'cursor-pointer': true,
  'z-20': true,
}));

const contentClass = computed(() => ({
  'w-1/2': true,
  [props.position === 'left' ? 'pr-8 text-right' : 'pl-8']: true,
  'transition-all': true,
  'duration-300': true,
  'transform': true,
  'hover:scale-105': true,
}));
</script>

<template>
  <div class="relative flex items-center min-h-[200px] group">
    <!-- Content -->
    <div :class="contentClass">
      <div 
        class="eco-card p-6 cursor-pointer"
        @click="showDetails = !showDetails"
      >
        <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
        <p class="text-gray-600 dark:text-dark-muted">{{ description }}</p>
        
        <!-- Expanded Details -->
        <div 
          v-if="showDetails"
          class="mt-4 border-t pt-4"
        >
          <slot name="details"></slot>
        </div>
      </div>
    </div>

    <!-- Center Icon -->
    <div 
      :class="iconClass"
      @click="showDetails = !showDetails"
    >
      <span class="transform transition-transform group-hover:scale-110">{{ icon }}</span>
    </div>

    <!-- Empty space for right-aligned items -->
    <div v-if="position === 'left'" class="w-1/2 pl-8"></div>
    <div v-else class="w-1/2 pr-8"></div>

    <!-- Connecting Line -->
    <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-eco-200 -z-10 transform -translate-x-1/2"></div>
  </div>
</template>