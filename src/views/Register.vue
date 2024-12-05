<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import RippleButton from '@/components/RippleButton.vue';

const router = useRouter();
const authStore = useAuthStore();

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const errors = ref<string[]>([]);

const validateForm = () => {
  errors.value = [];
  
  if (!formData.value.name) errors.value.push('Name is required');
  if (!formData.value.email) errors.value.push('Email is required');
  if (!formData.value.password) errors.value.push('Password is required');
  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.push('Passwords do not match');
  }
  
  return errors.value.length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  try {
    await authStore.register(formData.value);
    router.push('/');
  } catch (error) {
    errors.value.push('Registration failed. Please try again.');
  }
};
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center">
    <div class="max-w-md w-full mx-4">
      <h1 class="text-3xl font-bold text-center mb-8">Join EcoMarket</h1>
      
      <div class="bg-white dark:bg-dark-card p-8 rounded-xl shadow-lg">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
              Name
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                focus:border-eco-500 focus:ring-eco-500 dark:bg-dark-hover dark:border-dark-hover"
            />
          </div>

          <!-- Email -->
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

          <!-- Password -->
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

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                focus:border-eco-500 focus:ring-eco-500 dark:bg-dark-hover dark:border-dark-hover"
            />
          </div>

          <!-- Error Messages -->
          <div v-if="errors.length > 0" class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <ul class="list-disc list-inside text-red-600 dark:text-red-400 text-sm">
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </div>

          <RippleButton
            type="submit"
            label="Create Account"
            class="w-full"
            :disabled="authStore.loading"
          />

          <p class="text-center text-sm text-gray-600 dark:text-dark-muted mt-4">
            Already have an account?
            <router-link
              to="/login"
              class="text-eco-600 hover:text-eco-700 font-medium"
            >
              Sign in
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>