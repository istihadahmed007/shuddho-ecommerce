import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RatingProps {
  rating: number;
  reviews?: number;
  size?: number;
  className?: string;
  showReviews?: boolean;
}

export const Rating: React.FC<RatingProps> = ({ 
  rating, 
  reviews = 0, 
  size = 16, 
  className,
  showReviews = true
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={size} fill="currentColor" className="text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
             <StarHalf size={size} fill="currentColor" className="text-yellow-400" />
             <Star size={size} className="text-gray-300 absolute top-0 left-0 -z-10" />
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-gray-300" />
        ))}
      </div>
      {showReviews && reviews > 0 && (
        <span className="text-xs text-gray-500 ml-1">({reviews})</span>
      )}
    </div>
  );
};
