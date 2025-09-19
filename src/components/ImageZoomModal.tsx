'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentImageIndex: number;
  productName: string;
}

const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  onClose,
  images,
  currentImageIndex,
  productName
}) => {
  const [currentIndex, setCurrentIndex] = useState(currentImageIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(0);

  useEffect(() => {
    setCurrentIndex(currentImageIndex);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, [currentImageIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
        break;
      case 'ArrowRight':
        e.preventDefault();
        setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
        break;
      case '+':
      case '=':
        e.preventDefault();
        setZoomLevel(prev => Math.min(prev + 0.5, 3));
        break;
      case '-':
        e.preventDefault();
        setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
        break;
    }
  }, [isOpen, onClose, images.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    setZoomLevel(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const handleDoubleClick = () => {
    resetZoom();
  };

  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setTouchStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    } else if (e.touches.length === 2) {
      setLastTouchDistance(getTouchDistance(e.touches));
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 1 && zoomLevel > 1) {
      setPosition({
        x: e.touches[0].clientX - touchStart.x,
        y: e.touches[0].clientY - touchStart.y
      });
    } else if (e.touches.length === 2) {
      const currentDistance = getTouchDistance(e.touches);
      if (lastTouchDistance > 0) {
        const scale = currentDistance / lastTouchDistance;
        setZoomLevel(prev => Math.max(0.5, Math.min(3, prev * scale)));
      }
      setLastTouchDistance(currentDistance);
    }
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const nextImage = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
    resetZoom();
  };

  const prevImage = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
    resetZoom();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="image-zoom-modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          color: 'white',
          fontSize: '20px',
          cursor: 'pointer',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ×
      </button>

      {/* Zoom controls */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          display: 'flex',
          gap: '10px',
          zIndex: 10000
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setZoomLevel(prev => Math.min(prev + 0.5, 3));
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          +
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          −
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            resetZoom();
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            color: 'white',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {Math.round(zoomLevel * 100)}%
        </div>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Image counter and keyboard hints */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: '14px',
          zIndex: 10000,
          textAlign: 'center'
        }}
      >
        <div>{currentIndex + 1} / {images.length}</div>
        <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>
          Use ← → to navigate, +/- to zoom, ESC to close
          <br />
          <span style={{ fontSize: '11px' }}>Pinch to zoom on mobile</span>
        </div>
      </div>

      {/* Main image container */}
      <div
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '90vh',
          cursor: isDragging ? 'grabbing' : zoomLevel > 1 ? 'grab' : 'default',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease',
            transformOrigin: 'center'
          }}
        >
          <Image
            src={images[currentIndex]}
            alt={`${productName} - Image ${currentIndex + 1}`}
            width={800}
            height={800}
            quality={100}
            style={{
              objectFit: 'contain',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        </div>
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
            zIndex: 10000
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
                resetZoom();
              }}
              style={{
                width: '60px',
                height: '60px',
                border: index === currentIndex ? '2px solid white' : '2px solid transparent',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                opacity: index === currentIndex ? 1 : 0.7
              }}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                width={60}
                height={60}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageZoomModal;
