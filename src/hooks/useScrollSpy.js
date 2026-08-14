import { useState, useEffect } from 'react';

/**
 * Custom hook to spy on active section based on scroll position
 * @param {string[]} sectionIds - Array of element IDs to monitor
 * @param {number} offset - Scroll offset threshold in pixels
 * @returns {string} activeSectionId
 */
export function useScrollSpy(sectionIds, offset = 180) {
  const [activeId, setActiveId] = useState(sectionIds[0] || '');

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return;

    let timeoutId = null;

    const handleScroll = () => {
      // Throttle scroll execution
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        timeoutId = null;
        const scrollPosition = window.scrollY + offset;

        // Check from bottom to top
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i];
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top) {
              setActiveId(id);
              return;
            }
          }
        }

        // Fallback to first section if at top
        setActiveId(sectionIds[0]);
      }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [sectionIds, offset]);

  return activeId;
}
