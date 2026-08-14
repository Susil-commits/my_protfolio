import { useEffect, useRef } from 'react';

/**
 * Hook to automatically trigger reveal animations on scroll
 * @param {Object} options - IntersectionObserver options
 * @param {string} selector - Selector for elements to animate
 */
export function useIntersectionObserver(
  options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  selector = '.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale'
) {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(selector).forEach((el) => {
            el.classList.add('revealed');
          });
        }
      });
    }, options);

    const current = containerRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
      observer.disconnect();
    };
  }, [options, selector]);

  return containerRef;
}
