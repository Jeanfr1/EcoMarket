import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@/types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const login = async ({ email, password }: { email: string; password: string }) => {
    loading.value = true;
    error.value = null;
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Simulate successful login
      user.value = {
        id: '1',
        name: 'Demo User',
        email,
        sustainabilityScore: 85,
        carbonOffsetHistory: []
      };
    } catch (e) {
      error.value = 'Invalid email or password';
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const register = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    loading.value = true;
    error.value = null;
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Simulate successful registration
      user.value = {
        id: '1',
        name,
        email,
        sustainabilityScore: 0,
        carbonOffsetHistory: []
      };
    } catch (e) {
      error.value = 'Registration failed';
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };
});