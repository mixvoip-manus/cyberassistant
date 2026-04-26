import { useEffect } from 'react';

/**
 * Scrolls to the element matching window.location.hash on mount.
 * Needed because React SPA client-side navigation doesn't trigger
 * the browser's native hash-scroll behaviour.
 */
export function useHashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay to let the DOM render first
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);
}
