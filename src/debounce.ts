export function debounce(fn: (...params: unknown[]) => unknown, delay: number) {
  let timer: NodeJS.Timeout | null = null;
  return function (...params: unknown[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...params);
    }, delay);
  };
}