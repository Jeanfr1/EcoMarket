<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import RippleButton from './RippleButton.vue';

const footerRef = ref<HTMLElement | null>(null);
const leafRefs = ref<HTMLElement[]>([]);

const quickLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Our Mission', path: '/mission' },
  { name: 'Sustainability', path: '/sustainability' },
  { name: 'Partner With Us', path: '/partners' }
];

const socialLinks = [
  { name: 'Twitter', icon: '𝕏', url: '#' },
  { name: 'Instagram', icon: '📸', url: '#' },
  { name: 'LinkedIn', icon: '💼', url: '#' }
];

const impactStats = ref({
  treesPlanted: 0,
  carbonOffset: 0,
  communityMembers: 0
});

onMounted(() => {
  // Animate impact statistics
  gsap.to(impactStats.value, {
    treesPlanted: 1500,
    carbonOffset: 2500,
    communityMembers: 10000,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: footerRef.value,
      start: 'top bottom',
      toggleActions: 'play none none reverse'
    }
  });

  // Animate floating leaves
  leafRefs.value.forEach((leaf, index) => {
    gsap.to(leaf, {
      y: -20,
      rotation: 10,
      duration: 2 + index * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  });
});
</script>

<template>
  <footer 
    ref="footerRef"
    class="relative bg-gradient-to-b from-eco-50 to-eco-100 pt-20 pb-10 overflow-hidden"
  >
    <!-- Decorative Leaves -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        v-for="i in 5"
        :key="i"
        :ref="el => { if (el) leafRefs[i] = el as HTMLElement }"
        class="absolute w-8 h-8 text-eco-600 opacity-20"
        :style="{
          left: `${i * 20}%`,
          top: `${Math.random() * 100}%`,
          transform: `rotate(${i * 45}deg)`
        }"
      >
        🍃
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <!-- Brand Section -->
        <div class="space-y-4">
          <h3 class="text-2xl font-bold text-eco-800">EcoMarket</h3>
          <p class="text-gray-600">
            Making sustainable shopping accessible and impactful for everyone.
          </p>
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              class="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center
                hover:bg-eco-50 transition-colors duration-300"
              :title="social.name"
            >
              {{ social.icon }}
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold text-eco-800 mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.name">
              <a
                :href="link.path"
                class="text-gray-600 hover:text-eco-600 transition-colors duration-300
                  hover:translate-x-1 inline-block"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="text-lg font-semibold text-eco-800 mb-4">Join Our Mission</h4>
          <p class="text-gray-600 mb-4">
            Subscribe to receive updates on our environmental impact and exclusive eco-friendly offers.
          </p>
          <div class="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              class="flex-1 px-4 py-2 rounded-lg border-2 border-eco-200 focus:border-eco-500
                focus:ring-2 focus:ring-eco-200 outline-none transition-all duration-300"
            />
            <RippleButton label="Join" />
          </div>
        </div>
      </div>

      <!-- Impact Statistics -->
      <div class="grid grid-cols-3 gap-8 py-8 border-t border-b border-eco-200 mb-8">
        <div class="text-center">
          <div class="text-3xl font-bold text-eco-600 mb-1">
            {{ Math.round(impactStats.treesPlanted).toLocaleString() }}
          </div>
          <div class="text-gray-600">Trees Planted</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-eco-600 mb-1">
            {{ Math.round(impactStats.carbonOffset).toLocaleString() }}kg
          </div>
          <div class="text-gray-600">CO₂ Offset</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-eco-600 mb-1">
            {{ Math.round(impactStats.communityMembers).toLocaleString() }}+
          </div>
          <div class="text-gray-600">Community Members</div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="text-center text-gray-600">
        <p>© {{ new Date().getFullYear() }} EcoMarket. All rights reserved.</p>
        <p class="text-sm mt-2">
          Made with 💚 for a sustainable future
        </p>
      </div>
    </div>
  </footer>
</template>