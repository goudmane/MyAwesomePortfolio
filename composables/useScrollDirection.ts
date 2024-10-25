import { ref, onMounted, onBeforeUnmount } from 'vue';

const SCROLL_UP = 'up';
const SCROLL_DOWN = 'down';

export const useScrollDirection = ({ initialDirection = SCROLL_DOWN, thresholdPixels = 0, off = false } = {}) => {
  const scrollDir = ref(initialDirection);
  
  // Variables to manage the scroll direction
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateScrollDir = () => {
    const scrollY = window.scrollY;

    if (Math.abs(scrollY - lastScrollY) < thresholdPixels) {
      // We haven't exceeded the threshold
      ticking = false;
      return;
    }

    scrollDir.value = scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP;
    lastScrollY = scrollY > 0 ? scrollY : 0; // Ensure lastScrollY doesn't go below 0
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollDir);
      ticking = true;
    }
  };

  // Bind the scroll handler if `off` is set to false
  if (!off) {
    onMounted(() => {
      window.addEventListener('scroll', onScroll);
    });
  } else {
    scrollDir.value = initialDirection; // Reset to initial direction if `off` is true
  }

  // Cleanup the event listener on component unmount
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
  });
  useScrollDirection
  return scrollDir;
};
