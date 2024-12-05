<script setup lang="ts">
import { ref } from 'vue';
import type { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartData = ref<ChartData<'line'>>({
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Carbon Footprint (kg CO₂)',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: '#16a34a',
      tension: 0.4
    }
  ]
});

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Your Environmental Impact'
    }
  }
};
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Sustainability Dashboard</h1>
    
    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <div class="eco-card p-6">
        <h2 class="text-xl font-semibold mb-4">Carbon Footprint Overview</h2>
        <div class="h-[300px]">
          <Line
            :data="chartData"
            :options="chartOptions"
          />
        </div>
      </div>
      
      <div class="eco-card p-6">
        <h2 class="text-xl font-semibold mb-4">Impact Statistics</h2>
        <div class="space-y-4">
          <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span class="text-gray-600">Total Carbon Offset</span>
            <span class="text-2xl font-bold text-eco-600">245 kg</span>
          </div>
          <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span class="text-gray-600">Trees Planted</span>
            <span class="text-2xl font-bold text-eco-600">12</span>
          </div>
          <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span class="text-gray-600">Eco Products Purchased</span>
            <span class="text-2xl font-bold text-eco-600">28</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>