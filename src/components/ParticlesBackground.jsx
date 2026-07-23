import { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerId = 'particles-bg';

    const isMobile = window.innerWidth < 768;

    const config = {
      particles: {
        number: {
          value: isMobile ? 25 : 60,
          density: {
            enable: true,
            value_area: 1000,
          },
        },
        color: {
          value: ['#1a1a2e', '#16213e', '#0f3460', '#533483'],
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#ffffff',
          },
          polygon: {
            nb_sides: 6,
          },
        },
        opacity: {
          value: 0.6,
          random: true,
          anim: {
            enable: true,
            speed: 0.5,
            opacity_min: 0.15,
            sync: false,
          },
        },
        size: {
          value: 4,
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
          distance: 120,
          color: '#444466',
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: isMobile ? 0.3 : 0.6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
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
              opacity: 0.3,
            },
          },
          push: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: !isMobile,
    };

    if (typeof window.particlesJS === 'function') {
      window.particlesJS(containerId, config);
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
  }, []);

  return (
    <div
      id="particles-bg"
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}