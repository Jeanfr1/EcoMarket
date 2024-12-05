<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useDark, useToggle } from '@vueuse/core';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import BackgroundPattern from './components/BackgroundPattern.vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div 
    class="min-h-screen flex flex-col transition-colors duration-300"
    :class="{ 
      'bg-gray-50 text-gray-900': !isDark,
      'bg-dark-bg text-dark-text': isDark 
    }"
  >
    <BackgroundPattern />
    <NavBar :isDark="isDark" @toggle-theme="toggleDark()" />
    <main class="container mx-auto px-4 py-8 flex-grow relative z-10">
      <RouterView />
    </main>
    <Footer :isDark="isDark" />
  </div>
</template>