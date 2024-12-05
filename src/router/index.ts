import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/Products.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/Cart.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/supplier',
      name: 'supplier',
      component: () => import('@/views/SupplierDashboard.vue'),
      meta: { requiresAuth: true, supplierOnly: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.user) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else if (to.meta.supplierOnly && authStore.user?.role !== 'supplier') {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;