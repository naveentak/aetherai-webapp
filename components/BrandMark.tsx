import React from 'react';

interface BrandMarkProps {
  suffix?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  compact?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-xl',
  xl: 'text-2xl',
};

export const BrandMark: React.FC<BrandMarkProps> = ({
  suffix = 'labs',
  size = 'md',
  compact = false,
  className = '',
}) => {
  return (
    <span className={`font-display font-bold inline-flex items-baseline ${sizeClasses[size]} ${className}`}>
      <span className="font-mono font-bold text-primary">r</span>
      <span className="font-mono font-bold text-blue-500">:</span>
      {!compact && <span className="text-primary">{suffix}</span>}
    </span>
  );
};
