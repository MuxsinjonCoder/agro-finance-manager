import { useState, useEffect } from "react";

/**
 * `useDebounce` - Qiymatni kechiktirib qaytaruvchi hook
 * @param value - Debounce qilish kerak bo'lgan qiymat
 * @param delay - Kechikish vaqti (millisekundda, default 500ms)
 * @returns Debounce qilingan qiymat
 */
const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
