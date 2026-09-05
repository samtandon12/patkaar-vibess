// PATKAAR VIBESS - LUXURY VERIFIED STUDENT BADGE COMPONENT

import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface VerificationBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  size = 'md', 
  showText = true,
  className = '' 
}) => {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1'
  };

  return (
    <span 
      className={`inline-flex items-center gap-1.5 font-bold rounded-full badge-verified shadow-md transition-all ${textSizes[size]} ${className}`}
      title="Verified Student Account (Patkaar Verified)"
    >
      <ShieldCheck className={`${iconSizes[size]} text-amber-400 fill-amber-400/20`} />
      {showText && <span className="tracking-wide">Verified Student</span>}
    </span>
  );
};
