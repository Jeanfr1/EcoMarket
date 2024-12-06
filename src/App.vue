<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import BackgroundPattern from './components/BackgroundPattern.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col relative bg-gradient-to-br from-gray-50 to-white text-gray-900">
    <BackgroundPattern />
    <NavBar />
    <main class="container mx-auto px-4 py-8 flex-grow relative z-10">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>