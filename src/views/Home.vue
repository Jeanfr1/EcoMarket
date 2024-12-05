<script setup lang="ts">
import HeroSection from '@/components/hero/HeroSection.vue';
import CarbonFootprintCalculator from '@/components/CarbonFootprintCalculator.vue';
import ImpactStory from '@/components/ImpactStory.vue';
import SustainabilityJourney from '@/components/journey/SustainabilityJourney.vue';
import OurImpact from '@/components/impact/OurImpact.vue';
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <HeroSection />
    <OurImpact />
    <ImpactStory />
    <SustainabilityJourney />
  </div>
</template>