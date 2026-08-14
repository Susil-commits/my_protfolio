import { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerId = 'particles-bg';
    const isMobile = window.innerWidth < 768;

    // High performance, lightweight particles configuration
    const config = {
      particles: {
        number: {
          value: isMobile ? 12 : 32,
          density: {
            enable: true,
            value_area: 1200,
          },
        },
        color: {
          value: ['#1a1a2e', '#0f3460', '#38bdf8'],
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: 0.4,
          random: true,
          anim: {
            enable: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
          },
        },
        line_linked: {
          enable: !isMobile,
          distance: 100,
          color: '#38bdf8',
          opacity: 0.08,
          width: 1,
        },
        move: {
          enable: true,
          speed: isMobile ? 0.3 : 0.5,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: false,
          },
          onclick: {
            enable: false,
          },
          resize: true,
        },
      },
      retina_detect: false, // Disables retina doubling to cut GPU canvas fill rate
    };

    if (typeof window.particlesJS === 'function') {
      window.particlesJS(containerId, config);
    }

    // Pause particles when tab is hidden to save 100% CPU
    const handleVisibilityChange = () => {
      const pJS = window.pJSDom?.find((dom) => dom?.pJS?.canvas?.el?.parentNode?.id === containerId)?.pJS;
      if (pJS && pJS.fn) {
        if (document.hidden) {
          if (pJS.fn.drawAnim) cancelAnimationFrame(pJS.fn.drawAnim);
        } else {
          if (pJS.fn.particlesDraw) pJS.fn.particlesDraw();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      const container = document.getElementById(containerId);
      if (container) {
        const canvas = container.querySelector('.particles-js-canvas-el');
        if (canvas) {
          canvas.remove();
        }
      }
      if (Array.isArray(window.pJSDom)) {
        window.pJSDom = window.pJSDom.filter(
          (dom) => dom?.pJS?.canvas?.el?.parentNode?.id !== containerId,
        );
      }
    };
  }, []);

  return (
    <div
      id="particles-bg"
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}