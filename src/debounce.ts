export function debounce(fn: (...params: any[]) => unknown, delay: number) {
  let timer: NodeJS.Timeout | null = null;
  return function (...params: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...params);
    }, delay);
  };
}