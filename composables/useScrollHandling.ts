
export interface ScrollHandling {
  scrollDirection: 'up' | 'down';
  scrolledToTop: boolean;
}

export default function useScrollHandling() {
  const scrollDirection = ref<'up' | 'down'>('down');
  const scrolledToTop = ref<boolean>(true);
  const prevScroll = ref<number>(0);

  const handleScroll = (): void => {
    const currentScroll = window.scrollY;

    scrolledToTop.value = currentScroll < 50;

    if (currentScroll > 50) {
      scrollDirection.value = (currentScroll > prevScroll.value) ? 'down' : 'up';
    }

    prevScroll.value = currentScroll;
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    scrollDirection,
    scrolledToTop,
  };
}
