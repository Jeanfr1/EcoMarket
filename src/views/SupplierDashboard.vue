<script setup lang="ts">
import { ref } from 'vue';
import { Line } from 'vue-chartjs';
import type { ChartData } from 'chart.js';

const salesData = ref<ChartData<'line'>>({
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales',
      data: [1200, 1900, 1500, 2100, 1800, 2300],
      borderColor: '#16a34a',
      tension: 0.4
    }
  ]
});

const sustainabilityMetrics = ref({
  carbonReduction: '45%',
  recycledMaterials: '78%',
  renewableEnergy: '92%',
});
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Supplier Dashboard</h1>
    
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      <div v-for="(value, metric) in sustainabilityMetrics" :key="metric" class="eco-card p-6">
        <h3 class="text-lg font-medium text-gray-600 mb-2">
          {{ metric.replace(/([A-Z])/g, ' $1').trim() }}
        </h3>
        <p class="text-3xl font-bold text-eco-600">{{ value }}</p>
      </div>
    </div>
    
    <div class="grid md:grid-cols-2 gap-6">
      <div class="eco-card p-6">
        <h2 class="text-xl font-semibold mb-4">Sales Overview</h2>
        <div class="h-[300px]">
          <Line
            :data="salesData"
            :options="{
              responsive: true,
              maintainAspectRatio: false,
            }"
          />
        </div>
      </div>
      
      <div class="eco-card p-6">
        <h2 class="text-xl font-semibold mb-4">Recent Orders</h2>
        <div class="space-y-4">
          <!-- Add order list here -->
        </div>
      </div>
    </div>
  </div>
</template>