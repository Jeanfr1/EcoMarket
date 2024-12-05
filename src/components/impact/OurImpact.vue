<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImpactCard from './ImpactCard.vue';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const impactStats = ref({
  treesPlanted: 0,
  carbonOffset: 0,
  communitiesHelped: 0,
  recycledMaterials: 0
});

onMounted(() => {
  if (sectionRef.value) {
    gsap.to(impactStats.value, {
      treesPlanted: 50000,
      carbonOffset: 25000,
      communitiesHelped: 100,
      recycledMaterials: 75,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top center',
        toggleActions: 'play none none reverse'
      }
    });
  }
});
</script>

<template>
  <section ref="sectionRef" class="py-20 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0 bg-gradient-to-br from-eco-500 to-transparent"></div>
    </div>
    
    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">Our Impact on the Planet</h2>
        <p class="text-xl text-gray-600 dark:text-dark-muted max-w-3xl mx-auto">
          Together with our community, we're making a measurable difference 
          in creating a more sustainable future.
        </p>
      </div>

      <!-- Impact Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ImpactCard
          title="Trees Planted"
          description="New trees planted through our reforestation program"
          icon="🌳"
          :value="impactStats.treesPlanted.toLocaleString()"
          unit="trees"
        />
        
        <ImpactCard
          title="Carbon Offset"
          description="Tons of CO₂ emissions prevented or offset"
          icon="🌍"
          :value="impactStats.carbonOffset.toLocaleString()"
          unit="tons"
        />
        
        <ImpactCard
          title="Communities Helped"
          description="Local communities supported through our initiatives"
          icon="🤝"
          :value="impactStats.communitiesHelped.toLocaleString()"
          unit="communities"
        />
        
        <ImpactCard
          title="Recycled Materials"
          description="Percentage of recycled materials in our products"
          icon="♻️"
          :value="impactStats.recycledMaterials.toLocaleString()"
          unit="%"
        />
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-16">
        <RouterLink 
          to="/about" 
          class="eco-button inline-flex items-center space-x-2 group"
        >
          <span>Learn More About Our Mission</span>
          <span class="transform transition-transform group-hover:translate-x-1">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>