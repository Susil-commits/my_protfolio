import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ParticlesBackground() {
  const containerRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const containerId = 'particles-bg';
    const isMobile = window.innerWidth < 768;
    const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');

    const config = {
      particles: {
        number: {
          value: isMobile ? 25 : 60,
          density: {
            enable: true,
            value_area: 900,
          },
        },
        color: {
          value: isDark
            ? ['#38bdf8', '#818cf8', '#c084fc', '#34d399', '#60a5fa']
            : ['#0284c7', '#6366f1', '#9333ea', '#059669', '#2563eb'],
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: isDark ? 0.6 : 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: isDark ? 0.2 : 0.15,
            sync: false,
          },
        },
        size: {
          value: isMobile ? 3 : 4,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 1.5,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: isMobile ? 100 : 135,
          color: isDark ? '#38bdf8' : '#6366f1',
          opacity: isDark ? 0.22 : 0.18,
          width: 1.2,
        },
        move: {
          enable: true,
          speed: isMobile ? 0.6 : 1.0,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
        },
      },
      interactivity: {
        detect_on: 'window',
        events: {
          onhover: {
            enable: !isMobile,
            mode: 'grab',
          },
          onclick: {
            enable: true,
            mode: 'push',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 180,
            line_linked: {
              opacity: 0.45,
            },
          },
          push: {
            particles_nb: 3,
          },
        },
      },
      retina_detect: true,
    };

    const initParticles = () => {
      if (typeof window.particlesJS === 'function') {
        window.particlesJS(containerId, config);
      }
    };

    // Initialize or retry if script is still loading
    if (typeof window.particlesJS === 'function') {
      initParticles();
    } else {
      const interval = setInterval(() => {
        if (typeof window.particlesJS === 'function') {
          clearInterval(interval);
          initParticles();
        }
      }, 50);
      return () => clearInterval(interval);
    }

    return () => {
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
  }, [theme]);

  return (
    <div
      id="particles-bg"
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}