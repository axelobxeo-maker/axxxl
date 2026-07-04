import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'white' | 'krem' | 'accent' | 'black' | 'yellow';
  thickness?: 'border-2' | 'border-3' | 'border-4';
  shadowSize?: 'sm' | 'md' | 'lg';
  className?: string;
  hasHoverEffect?: boolean;
}

export default function Card({
  children,
  variant = 'white',
  thickness = 'border-3',
  shadowSize = 'md',
  className = '',
  hasHoverEffect = true,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-2xl transition-all select-none overflow-hidden';
  
  const variantStyles = {
    white: 'bg-white text-black',
    krem: 'bg-[#ECE6D5] text-black',
    accent: 'bg-theme-accent text-black',
    yellow: 'bg-[#FFD100] text-black',
    black: 'bg-black text-white'
  };

  const shadowStyles = {
    sm: 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
    md: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
    lg: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
  };

  const borderThickness = thickness === 'border-2' ? 'border-2 border-black' : thickness === 'border-4' ? 'border-4 border-black' : 'border-3 border-black';

  const hoverEffect = hasHoverEffect
    ? 'hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'
    : '';

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${borderThickness} ${shadowStyles[shadowSize]} ${hoverEffect} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
