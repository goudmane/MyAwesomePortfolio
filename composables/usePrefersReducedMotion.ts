import { ref, onMounted, onBeforeUnmount } from 'vue';

const QUERY = '(prefers-reduced-motion: no-preference)';

export const usePrefersReducedMotion = () => {
  // Initial state for prefersReducedMotion
  const prefersReducedMotion = ref(true);

  // Function to check the user's preference
  const checkPreference = () => {
    prefersReducedMotion.value = !window.matchMedia(QUERY).matches;
  };

  // Set initial state on client-side only
  if (typeof window !== 'undefined') {
    checkPreference();
  }

  onMounted(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    mediaQueryList.addEventListener('change', checkPreference); // Listen for changes

    // Initial check
    checkPreference();
  });

  onBeforeUnmount(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    mediaQueryList.removeEventListener('change', checkPreference); // Cleanup the listener
  });

  return prefersReducedMotion;
};
