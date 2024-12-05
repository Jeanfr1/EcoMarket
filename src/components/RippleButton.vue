<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  label: string;
  color?: string;
}>();

const ripples = ref<{ x: number; y: number; id: number }[]>([]);
let nextId = 0;

const handleClick = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLButtonElement;
  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  const ripple = {
    x,
    y,
    id: nextId++
  };
  
  ripples.value.push(ripple);
  setTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== ripple.id);
  }, 1000);
  
  emit('click', event);
};

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();
</script>

<template>
  <button
    class="relative overflow-hidden eco-button"
    :class="color || 'bg-eco-600'"
    @click="handleClick"
  >
    {{ label }}
    <span
      v-for="ripple in ripples"
      :key="ripple.id"
      class="absolute bg-white/30 rounded-full animate-ripple"
      :style="{
        left: `${ripple.x}px`,
        top: `${ripple.y}px`,
        transform: 'translate(-50%, -50%)'
      }"
    />
  </button>
</template>

<style scoped>
@keyframes ripple {
  from {
    width: 0;
    height: 0;
    opacity: 0.5;
  }
  to {
    width: 500px;
    height: 500px;
    opacity: 0;
  }
}

.animate-ripple {
  animation: ripple 1s linear forwards;
}
</style>