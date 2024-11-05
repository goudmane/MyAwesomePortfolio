import { onMounted, onUnmounted, ref } from 'vue';

export function useOnClickOutside(refElement: Ref<HTMLElement | null>, handler: () => void): void {
  const listener = (event: MouseEvent | TouchEvent) => {
    
    if (!refElement.value || refElement.value.contains(event.target as Node)) {
      return;
    }
    handler();
  };

  onMounted(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', listener);
    document.removeEventListener('touchstart', listener);
  });
}
