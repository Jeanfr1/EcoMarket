<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { gsap } from 'gsap';
import CartIcon from './cart/CartIcon.vue';

defineProps<{
  isDark: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggleTheme'): void;
}>();

const authStore = useAuthStore();

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Dashboard', path: '/dashboard', requiresAuth: true },
];

const isOpen = ref(false);
const navRef = ref<HTMLElement | null>(null);
const route = useRoute();
const indicatorRef = ref<HTMLElement | null>(null);

const updateIndicator = (index: number) => {
  if (!indicatorRef.value || !navRef.value) return;
  
  const links = navRef.value.querySelectorAll('.nav-link');
  const currentLink = links[index];
  if (!currentLink) return;

  const rect = currentLink.getBoundingClientRect();
  const navRect = navRef.value.getBoundingClientRect();

  gsap.to(indicatorRef.value, {
    left: rect.left - navRect.left,
    width: rect.width,
    duration: 0.3,
    ease: 'power2.out'
  });
};

const handleLogout = () => {
  authStore.logout();
  if (route.meta.requiresAuth) {
    router.push('/');
  }
};

onMounted(() => {
  const currentIndex = navigation.findIndex(item => item.path === route.path);
  if (currentIndex >= 0) {
    updateIndicator(currentIndex);
  }
});
</script>

<template>
  <nav :class="[
    'transition-colors duration-300',
    isDark ? 'bg-dark-card text-dark-text' : 'bg-white text-gray-900'
  ]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <RouterLink 
              to="/" 
              class="text-eco-600 text-xl font-bold transition-transform hover:scale-105"
            >
              EcoMarket
            </RouterLink>
          </div>
          
          <div ref="navRef" class="hidden sm:ml-6 sm:flex sm:space-x-8 relative">
            <RouterLink
              v-for="(item, index) in navigation.filter(item => !item.requiresAuth || authStore.user)"
              :key="item.name"
              :to="item.path"
              class="nav-link inline-flex items-center px-1 pt-1 text-sm font-medium
                transition-colors duration-300"
              :class="[
                route.path === item.path ? 'text-eco-600' : isDark ? 'text-dark-text' : 'text-gray-700',
                'hover:text-eco-600'
              ]"
              @mouseenter="updateIndicator(index)"
            >
              {{ item.name }}
            </RouterLink>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Cart Icon -->
          <CartIcon />

          <!-- Theme Toggle -->
          <button
            @click="emit('toggleTheme')"
            class="p-2 rounded-lg transition-colors duration-300"
            :class="isDark ? 'hover:bg-dark-hover' : 'hover:bg-gray-100'"
          >
            <span class="sr-only">Toggle theme</span>
            <svg
              v-if="isDark"
              class="w-6 h-6 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          <!-- Auth Buttons -->
          <template v-if="authStore.user">
            <button
              @click="handleLogout"
              class="text-sm font-medium text-gray-700 hover:text-eco-600
                dark:text-dark-text dark:hover:text-eco-500 transition-colors duration-300"
            >
              Sign Out
            </button>
          </template>
          <template v-else>
            <RouterLink
              to="/login"
              class="text-sm font-medium text-gray-700 hover:text-eco-600
                dark:text-dark-text dark:hover:text-eco-500 transition-colors duration-300"
            >
              Sign In
            </RouterLink>
            <RouterLink
              to="/register"
              class="eco-button text-sm"
            >
              Create Account
            </RouterLink>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>