import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SkeletonBox: React.FC<SkeletonProps> = ({ className, ...props }) => (
  <div className={cn("animate-pulse rounded-md bg-gray-200", className)} {...props} />
);

export const SkeletonText: React.FC<SkeletonProps> = ({ className, ...props }) => (
  <div className={cn("animate-pulse rounded bg-gray-200 h-4", className)} {...props} />
);

export const SkeletonCircle: React.FC<SkeletonProps> = ({ className, ...props }) => (
  <div className={cn("animate-pulse rounded-full bg-gray-200", className)} {...props} />
);

export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-card rounded-xl border border-border shadow-sm p-4 w-full">
    <SkeletonBox className="w-full aspect-square mb-4 rounded-lg" />
    <SkeletonText className="w-1/3 mb-2" />
    <SkeletonText className="w-full mb-2" />
    <SkeletonText className="w-2/3 mb-4" />
    <div className="flex justify-between items-center mb-4">
      <SkeletonText className="w-1/4 h-6" />
      <SkeletonBox className="w-1/4 h-6 rounded-full" />
    </div>
    <SkeletonBox className="w-full h-10 rounded-lg" />
  </div>
);
