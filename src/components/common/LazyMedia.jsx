import React, { useEffect, useMemo, useRef, useState } from 'react';

const useInView = (rootMargin = '200px') => {
  const observerRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!observerRef.current) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [rootMargin]);

  return [observerRef, isIntersecting];
};

export const LazyBackground = ({
  src,
  className = '',
  overlayClassName = '',
  backgroundClassName = '',
  children,
  priority = false,
  rootMargin,
  style,
}) => {
  const [ref, isIntersecting] = useInView(rootMargin);
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldLoad = priority || isIntersecting;

  useEffect(() => {
    if (!shouldLoad || !src) return undefined;
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(true);

    return undefined;
  }, [shouldLoad, src]);

  return (
    <div
      ref={priority ? null : ref}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${backgroundClassName}`}
        style={
          isLoaded
            ? {
                backgroundImage: `url(${src})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }
            : undefined
        }
        aria-hidden="true"
      />
      <div
        className={`absolute inset-0 bg-slate-200 transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      />
      {overlayClassName && (
        <div
          className={`absolute inset-0 pointer-events-none ${overlayClassName}`}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export const LazyImage = ({
  src,
  alt,
  wrapperClassName = '',
  imgClassName = '',
  priority = false,
  lazy = true,
  showPlaceholder = true,
  rootMargin,
  aspectRatio,
  style,
  ...rest
}) => {
  const [ref, isIntersecting] = useInView(rootMargin);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasStartedLoading, setHasStartedLoading] = useState(!lazy);

  const shouldLoad = useMemo(() => {
    if (!lazy) return true;
    return priority || isIntersecting;
  }, [lazy, priority, isIntersecting]);

  useEffect(() => {
    if (shouldLoad) {
      setHasStartedLoading(true);
    }
  }, [shouldLoad]);

  return (
    <div
      ref={!lazy || priority ? null : ref}
      className={`relative overflow-hidden bg-slate-100 ${wrapperClassName}`}
      style={aspectRatio ? { aspectRatio, ...style } : style}
    >
      {hasStartedLoading && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
          loading={!lazy || priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={!lazy || priority ? 'high' : 'auto'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          {...rest}
        />
      )}
      {showPlaceholder && (
        <div
          className={`absolute inset-0 bg-slate-200 animate-pulse transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
};


