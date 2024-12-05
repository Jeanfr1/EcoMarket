<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const handleSubmit = async () => {
  await authStore.login(email.value, password.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-eco-500 focus:ring-eco-500"
      />
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-eco-500 focus:ring-eco-500"
      />
    </div>
    <button
      type="submit"
      :disabled="authStore.loading"
      class="w-full eco-button"
    >
      {{ authStore.loading ? 'Logging in...' : 'Login' }}
    </button>
    <p v-if="authStore.error" class="text-red-600 text-sm">{{ authStore.error }}</p>
  </form>
</template>