'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Eye, RotateCw, ZoomIn, Layers, Maximize2 } from 'lucide-react';
import type { Product } from '@/types';

interface Product3DViewerProps {
  product: Product;
  selectedImageIndex: number;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({
  product,
  selectedImageIndex,
}) => {
  const [viewMode, setViewMode] = useState<'standard' | 'depth' | 'rotate360'>(
    product.asset3d?.type === '3d' ? 'depth' : 'standard'
  );
  const [rotation, setRotation] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentImage = product.images[selectedImageIndex] || product.images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (viewMode === 'depth') {
      // 2.5D Layered tilt
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      setTilt({
        x: -((y - midY) / rect.height) * 14,
        y: ((x - midX) / rect.width) * 16,
      });
    } else if (isZoomed) {
      setZoomPos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsZoomed(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleManualRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className="flex flex-col space-y-3">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-2 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setViewMode('standard');
              setIsZoomed(false);
            }}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              viewMode === 'standard' && !isZoomed
                ? 'bg-[#163A29] text-white'
                : 'bg-[#FAF7F2] text-[#5F6D63] hover:text-[#18221B]'
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => {
              setViewMode('depth');
              setIsZoomed(false);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-colors ${
              viewMode === 'depth'
                ? 'bg-[#163A29] text-white'
                : 'bg-[#FAF7F2] text-[#5F6D63] hover:text-[#18221B]'
            }`}
          >
            <Layers size={13} />
            <span>2.5D Depth View</span>
          </button>
        </div>

        <div className="flex items-center gap-1 text-[#5F6D63]">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            aria-label="Toggle Magnifier"
            className={`p-1.5 rounded-lg border border-[#E8E2D8] hover:bg-white transition-colors ${
              isZoomed ? 'bg-[#163A29] text-white' : 'bg-[#FAF7F2]'
            }`}
            title="Magnifier"
          >
            <ZoomIn size={15} />
          </button>
          <button
            onClick={handleManualRotate}
            aria-label="Rotate View"
            className="p-1.5 rounded-lg border border-[#E8E2D8] bg-[#FAF7F2] hover:bg-white transition-colors"
            title="Inspect Angle"
          >
            <RotateCw size={15} />
          </button>
        </div>
      </div>

      {/* Main Visual Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-square bg-[#FAF7F2] rounded-3xl border border-[#E8E2D8] overflow-hidden flex items-center justify-center p-8 select-none perspective-1000 cursor-crosshair"
      >
        {/* Depth / 3D Canvas Transform container */}
        <div
          style={{
            transform:
              viewMode === 'depth'
                ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotate(${rotation}deg)`
                : `rotate(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: isHovered && viewMode === 'depth' ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
          }}
          className="relative w-full h-full flex items-center justify-center preserve-3d"
        >
          {/* Depth Glow Layer */}
          {viewMode === 'depth' && (
            <div
              style={{ transform: 'translateZ(-30px)' }}
              className="absolute w-3/4 h-3/4 rounded-full bg-[#C5922E]/15 blur-2xl pointer-events-none"
            />
          )}

          {/* Product Image */}
          <div
            style={{
              transform: viewMode === 'depth' ? 'translateZ(25px)' : 'none',
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              scale: isZoomed ? '2' : '1',
              transition: isZoomed ? 'transform-origin 0.05s ease-out' : 'scale 0.25s ease-out',
            }}
            className="relative w-full h-full"
          >
            <Image
              src={currentImage?.url || '/placeholder.png'}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* View Mode Hint Badge */}
        {viewMode === 'depth' && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-[#163A29] shadow-xs border border-[#E8E2D8]">
            Move mouse to inspect depth layers
          </div>
        )}

        {isZoomed && (
          <div className="absolute top-4 left-4 bg-black/75 text-white px-3 py-1 rounded-full text-[11px] font-medium">
            200% Zoom Active
          </div>
        )}
      </div>
    </div>
  );
};
