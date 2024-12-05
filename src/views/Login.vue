<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import RippleButton from '@/components/RippleButton.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const formData = ref({
  email: '',
  password: ''
});

const handleSubmit = async () => {
  try {
    await authStore.login(formData.value);
    const redirectPath = route.query.redirect?.toString() || '/';
    router.push(redirectPath);
  } catch (error) {
    // Error is handled by the store
  }
};
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center">
    <div class="max-w-md w-full mx-4">
      <h1 class="text-3xl font-bold text-center mb-8">Welcome Back</h1>
      
      <div class="bg-white dark:bg-dark-card p-8 rounded-xl shadow-lg">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
              Email
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                focus:border-eco-500 focus:ring-eco-500 dark:bg-dark-hover dark:border-dark-hover"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
              Password
            </label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                focus:border-eco-500 focus:ring-eco-500 dark:bg-dark-hover dark:border-dark-hover"
            />
          </div>

          <div v-if="authStore.error" class="text-red-600 dark:text-red-400 text-sm">
            {{ authStore.error }}
          </div>

          <RippleButton
            type="submit"
            label="Sign In"
            class="w-full"
            :disabled="authStore.loading"
          />

          <p class="text-center text-sm text-gray-600 dark:text-dark-muted mt-4">
            Don't have an account?
            <router-link
              to="/register"
              class="text-eco-600 hover:text-eco-700 font-medium"
            >
              Create one
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>