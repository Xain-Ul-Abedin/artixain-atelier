'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ShimmerImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  fallbackSrc?: string;
}

export default function ShimmerImage({
  src,
  alt = 'Artixain jewelry image',
  className = '',
  containerClassName = '',
  fallbackSrc = '/images/hero/triple-strand-pearl-bracelet.jpeg',
  ...props
}: ShimmerImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check if the image was already cached by the browser and completed synchronously
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-zinc-100 ${containerClassName}`}>
      {/* Shimmer Skeletal Loader Overlay */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 z-10 bg-gradient-to-br from-zinc-100 via-zinc-200/50 to-zinc-100 overflow-hidden"
          aria-hidden="true"
        >
          {/* Smooth Shimmer Light Sweep */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent animate-shimmer" />

          {/* Luxury Geometric Skeletal Placeholder Shape */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
            <svg
              className="w-8 h-8 text-zinc-400 animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 3h12l4 6-10 12L2 9l4-6z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      )}

      {/* Main Image with Smooth Reveal */}
      <img
        ref={imgRef}
        src={hasError ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
}
