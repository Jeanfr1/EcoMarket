<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  icon: string;
  value: string;
  unit: string;
}>();
</script>

<template>
  <div class="eco-card group hover:scale-105 transition-all duration-300">
    <div class="p-6 relative overflow-hidden">
      <!-- Icon Background -->
      <div class="absolute -right-4 -top-4 text-6xl opacity-5 transform rotate-12 transition-transform duration-300 group-hover:rotate-0">
        {{ icon }}
      </div>
      
      <!-- Content -->
      <div class="relative z-10">
        <div class="text-4xl mb-4">{{ icon }}</div>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-dark-text">{{ title }}</h3>
        <p class="text-gray-600 dark:text-dark-muted mb-4">{{ description }}</p>
        <div class="flex items-baseline">
          <span class="text-3xl font-bold text-eco-600">{{ value }}</span>
          <span class="ml-1 text-gray-600 dark:text-dark-muted">{{ unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>