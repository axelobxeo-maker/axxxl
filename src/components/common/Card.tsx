import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { Link } from 'lucide-react';

export function ShareButton() {
  const handleCopy = () => {
    navigator.clipboard.writeText('https://axeluf.portal/download-mod-slug');
    alert('Copied!');
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-[#D4FF00] border-2 border-black text-black px-3 py-1.5 text-[10px] sm:text-xs font-extrabold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none select-none rounded-lg"
    >
      <Link strokeWidth={2.5} className="w-3.5 h-3.5 shrink-0" />
      <span>SHARE</span>
      <span className="bg-white border border-black px-1.5 py-0.5 text-[8px] rounded font-bold tracking-wider shrink-0">MULTI</span>
    </button>
  );
}

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
