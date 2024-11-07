
const SCROLL_UP = 'up';
const SCROLL_DOWN = 'down';

export const useScrollDirection = ({ initialDirection = SCROLL_DOWN, thresholdPixels = 0, off = false } = {}) => {
  const scrollDir = ref(initialDirection);
    
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateScrollDir = () => {
    const scrollY = window.scrollY;

    if (Math.abs(scrollY - lastScrollY) < thresholdPixels) {
      ticking = false;
      return;
    }

    scrollDir.value = scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP;
    lastScrollY = scrollY > 0 ? scrollY : 0; 
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollDir);
      ticking = true;
    }
  };
  
  if (!off) {
    onMounted(() => {
      window.addEventListener('scroll', onScroll);
    });
  } else {
    scrollDir.value = initialDirection; 
  }

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
  });
  useScrollDirection
  return scrollDir;
};
