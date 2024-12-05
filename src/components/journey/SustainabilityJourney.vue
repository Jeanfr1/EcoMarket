<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import JourneyStep from './JourneyStep.vue';

gsap.registerPlugin(ScrollTrigger);

const journeyRef = ref<HTMLElement | null>(null);
const stepsRef = ref<HTMLElement[]>([]);

const journeySteps = [
  {
    title: 'Sustainable Sourcing',
    description: 'Materials carefully selected from eco-certified suppliers',
    icon: '🌱',
    details: {
      impact: '45% reduction in raw material waste',
      partners: '50+ certified eco-suppliers',
      practices: ['Local sourcing', 'Renewable materials', 'Fair trade practices']
    }
  },
  {
    title: 'Eco-Friendly Production',
    description: 'Manufactured using renewable energy and minimal waste',
    icon: '🏭',
    details: {
      impact: '80% renewable energy usage',
      waste: 'Zero waste to landfill',
      practices: ['Solar powered facilities', 'Water recycling', 'Waste reduction']
    }
  },
  {
    title: 'Green Packaging',
    description: '100% recyclable and biodegradable packaging materials',
    icon: '📦',
    details: {
      impact: '100% plastic-free packaging',
      innovation: 'Biodegradable alternatives',
      practices: ['Minimal packaging', 'Recycled materials', 'Compostable options']
    }
  },
  {
    title: 'Carbon-Neutral Delivery',
    description: 'Optimized routes and electric vehicles for minimal impact',
    icon: '🚛',
    details: {
      impact: '75% reduced delivery emissions',
      fleet: '100% electric or hybrid vehicles',
      practices: ['Route optimization', 'Carbon offsetting', 'Local distribution']
    }
  }
];

onMounted(() => {
  if (journeyRef.value) {
    // Animate steps sequentially
    stepsRef.value.forEach((step, index) => {
      gsap.from(step, {
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 1,
        scrollTrigger: {
          trigger: step,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Animate connecting line
    gsap.from('.journey-line', {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1.5,
      scrollTrigger: {
        trigger: journeyRef.value,
        start: 'top center',
        toggleActions: 'play none none reverse'
      }
    });
  }
});
</script>

<template>
  <section 
    ref="journeyRef" 
    class="py-20 relative overflow-hidden"
  >
    <!-- Animated Background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-br from-eco-50/30 to-eco-100/20"></div>
    </div>

    <div class="max-w-6xl mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-eco-600 to-eco-400 bg-clip-text text-transparent">
          From Source to Sustainability
        </h2>
        <p class="text-xl text-gray-600 dark:text-dark-muted max-w-3xl mx-auto">
          Follow our journey to create sustainable products that respect our planet at every step
        </p>
      </div>

      <!-- Journey Timeline -->
      <div class="relative space-y-12">
        <div 
          v-for="(step, index) in journeySteps" 
          :key="step.title"
          :ref="el => { if (el) stepsRef[index] = el as HTMLElement }"
        >
          <JourneyStep
            :title="step.title"
            :description="step.description"
            :icon="step.icon"
            :position="index % 2 === 0 ? 'left' : 'right'"
            :index="index"
          >
            <template #details>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-eco-600 font-semibold">Impact:</span>
                  <span>{{ step.details.impact }}</span>
                </div>
                <ul class="space-y-1">
                  <li 
                    v-for="practice in step.details.practices" 
                    :key="practice"
                    class="flex items-center text-sm"
                  >
                    <span class="w-2 h-2 bg-eco-500 rounded-full mr-2"></span>
                    {{ practice }}
                  </li>
                </ul>
              </div>
            </template>
          </JourneyStep>
        </div>
      </div>

      <!-- Final Call to Action -->
      <div class="text-center mt-16">
        <RouterLink 
          to="/about" 
          class="eco-button inline-flex items-center space-x-2 group"
        >
          <span>Learn More About Our Process</span>
          <span class="transform transition-transform group-hover:translate-x-1">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>