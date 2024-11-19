interface UseIntersectionObserverOptions {
    delay?: number;
    options?: IntersectionObserverInit;
}

export function useIntersectionObserver({
    options = { threshold: 0.25 },
}: UseIntersectionObserverOptions = {}) {
    const { scrollDirection } = useScrollHandling();
    const observer: Ref<IntersectionObserver | null> = ref(null);

    const observeElement = (element: HTMLElement | null): void => {
        if (element && observer.value) {
            observer.value.observe(element);
        }
    };

    const removeAnimationClasses = (element: HTMLElement): void => {
        element.classList.remove(
            'fade-in-bottom',
            'fade-in-top',
            'fade-out-bottom',
            'fade-out-top'
        );
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]): void => {
        entries.forEach(entry => {
            const { target, isIntersecting } = entry;
            const element = target as HTMLElement;

            const isEntering = isIntersecting && !element.classList.contains('is-visible');
            const isLeaving = !isIntersecting && element.classList.contains('is-visible');

            // Avoid redundant processing
            if (!isEntering && !isLeaving) return;

            if (isEntering) {
                element.classList.add('is-visible');
                removeAnimationClasses(element);

                requestAnimationFrame(() => {
                    if (scrollDirection.value === 'down') {
                        element.classList.add('fade-in-bottom');
                    } else {
                        element.classList.add('fade-in-top');
                    }
                });
            } else if (isLeaving) {
                element.classList.remove('is-visible');
                removeAnimationClasses(element);

                requestAnimationFrame(() => {
                    if (scrollDirection.value === 'down') {
                        element.classList.add('fade-out-top');
                    } else {
                        element.classList.add('fade-out-bottom');
                    }
                });
            }
        });
    };

    onMounted(() => {
        observer.value = new IntersectionObserver(handleIntersection, options);
    });

    onUnmounted(() => {
        observer.value?.disconnect();
    });

    return { observeElement };
}
