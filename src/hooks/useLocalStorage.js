import { useEffect, useRef, useState } from 'react';

/**
 * useLocalStorage — keep a piece of React state in sync with localStorage.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored != null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const isFirst = useRef(true);
  useEffect(() => {
    // skip the very first render to avoid useless write
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota or privacy mode — silent */
    }
  }, [key, value]);

  return [value, setValue];
}
