import { onMounted } from 'vue';
import { gsap } from 'gsap';
import type { Ref } from 'vue';

export function useAnimation(element: Ref<HTMLElement | null>, options = {}) {
  const defaultOptions = {
    duration: 1,
    ease: 'power2.out',
    delay: 0
  };

  const animate = (props: gsap.TweenVars) => {
    if (!element.value) return;
    
    return gsap.to(element.value, {
      ...defaultOptions,
      ...options,
      ...props
    });
  };

  return {
    animate
  };
}