import { ref, onMounted, onUnmounted } from 'vue';

export function useResponsive() {
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isDesktop = ref(false);

  const checkResponsive = () => {
    const width = window.innerWidth;
    isMobile.value = width < 768;
    isTablet.value = width >= 768 && width < 1024;
    isDesktop.value = width >= 1024;
  };

  onMounted(() => {
    checkResponsive();
    window.addEventListener('resize', checkResponsive);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkResponsive);
  });

  return {
    isMobile,
    isTablet,
    isDesktop
  };
}