<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import { gsap } from 'gsap';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  score: number;
  label: string;
}>();

const chartData = ref({
  labels: ['Progress', 'Remaining'],
  datasets: [{
    data: [0, 100],
    backgroundColor: ['#16a34a', '#e5e7eb'],
    borderWidth: 0,
    cutout: '80%'
  }]
});

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    }
  }
};

onMounted(() => {
  gsap.to(chartData.value.datasets[0].data, {
    0: props.score,
    1: 100 - props.score,
    duration: 1.5,
    ease: 'power2.out'
  });
});
</script>

<template>
  <div class="relative">
    <Doughnut
      :data="chartData"
      :options="options"
      class="max-w-[200px] mx-auto"
    />
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="text-center">
        <div class="text-3xl font-bold text-eco-600">{{ score }}%</div>
        <div class="text-sm text-gray-600">{{ label }}</div>
      </div>
    </div>
  </div>
</template>