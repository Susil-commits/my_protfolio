import { useCallback, useEffect, useState } from 'react';
import { LightboxContext } from './LightboxContext';
import Lightbox from '../components/Lightbox';

export function LightboxProvider({ children }) {
  const [image, setImage] = useState(null);

  const open = useCallback((src, alt = '', placeholder = null) => {
    setImage({ src, alt, placeholder });
  }, []);

  const close = useCallback(() => {
    setImage(null);
  }, []);

  useEffect(() => {
    if (!image) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [image, close]);

  return (
    <LightboxContext.Provider value={{ open, close }}>
      {children}
      {image && (
        <Lightbox
          key={image.src}
          src={image.src}
          alt={image.alt}
          placeholder={image.placeholder}
          onClose={close}
        />
      )}
    </LightboxContext.Provider>
  );
}
