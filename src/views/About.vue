<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRefs = ref<HTMLElement[]>([]);

onMounted(() => {
  sectionRefs.value.forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });
});
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <section ref="el => sectionRefs[0] = el" class="mb-16">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-dark-text mb-6">About Us</h1>
      <p class="text-lg text-gray-600 dark:text-dark-muted mb-8">
        EcoMarket is a revolutionary platform connecting eco-conscious consumers with sustainable products. 
        Our mission is to make sustainable shopping accessible, transparent, and impactful.
      </p>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="eco-card p-6">
          <h3 class="text-xl font-semibold mb-4">Our Vision</h3>
          <p class="text-gray-600 dark:text-dark-muted">
            A world where sustainable choices are the norm, not the exception.
          </p>
        </div>
        <div class="eco-card p-6">
          <h3 class="text-xl font-semibold mb-4">Our Values</h3>
          <ul class="space-y-2 text-gray-600 dark:text-dark-muted">
            <li>🌱 Environmental Stewardship</li>
            <li>🤝 Community Empowerment</li>
            <li>💡 Innovation for Sustainability</li>
          </ul>
        </div>
      </div>
    </section>

    <section ref="el => sectionRefs[1] = el" class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-dark-text mb-6">Our Mission</h2>
      <div class="eco-card p-8">
        <p class="text-lg text-gray-600 dark:text-dark-muted mb-6">
          We're on a mission to transform e-commerce by making sustainable shopping the easiest choice. 
          Through innovative technology and partnerships with eco-conscious suppliers, we're building 
          a marketplace that prioritizes both planetary and human wellbeing.
        </p>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-3xl mb-2">🌍</div>
            <h4 class="font-semibold mb-2">Planet First</h4>
            <p class="text-sm text-gray-600 dark:text-dark-muted">
              Every product is vetted for environmental impact
            </p>
          </div>
          <div class="text-center">
            <div class="text-3xl mb-2">💚</div>
            <h4 class="font-semibold mb-2">Community Driven</h4>
            <p class="text-sm text-gray-600 dark:text-dark-muted">
              Supporting local and global eco-initiatives
            </p>
          </div>
          <div class="text-center">
            <div class="text-3xl mb-2">🔍</div>
            <h4 class="font-semibold mb-2">Total Transparency</h4>
            <p class="text-sm text-gray-600 dark:text-dark-muted">
              Clear impact metrics for informed choices
            </p>
          </div>
        </div>
      </div>
    </section>

    <section ref="el => sectionRefs[2] = el" class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-dark-text mb-6">Sustainability</h2>
      <div class="space-y-8">
        <div class="eco-card p-6">
          <h3 class="text-xl font-semibold mb-4">Our Commitment</h3>
          <p class="text-gray-600 dark:text-dark-muted">
            We're committed to creating a positive environmental impact through:
          </p>
          <ul class="mt-4 space-y-2 text-gray-600 dark:text-dark-muted">
            <li class="flex items-center">
              <span class="text-eco-600 mr-2">✓</span>
              Carbon footprint tracking and offsetting
            </li>
            <li class="flex items-center">
              <span class="text-eco-600 mr-2">✓</span>
              Sustainable packaging initiatives
            </li>
            <li class="flex items-center">
              <span class="text-eco-600 mr-2">✓</span>
              Support for regenerative practices
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section ref="el => sectionRefs[3] = el">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-dark-text mb-6">Partner With Us</h2>
      <div class="eco-card p-8">
        <h3 class="text-xl font-semibold mb-4">Join Our Eco-System</h3>
        <p class="text-gray-600 dark:text-dark-muted mb-6">
          Are you a supplier of sustainable products? We'd love to partner with you to expand 
          the reach of eco-friendly products and services.
        </p>
        <div class="flex justify-center">
          <RouterLink 
            to="/supplier/register" 
            class="eco-button px-8 py-3"
          >
            Become a Partner
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>