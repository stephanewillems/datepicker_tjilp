import { useState, useEffect, useRef } from 'react';

/**
 * Helper hook for, e.g., popover
 * @return {Object}
 * @author Jens
 */
function useComponentVisible() {
  const [isVisible, setIsVisible] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  // Set visible to false if clicked outside of this element
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (ref.current && !ref.current.contains(target)) {
      setIsVisible(false);
    }
  };

  // Setup and cleanup for event listener
  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return { ref, isVisible, setIsVisible };
}

export { useComponentVisible };
