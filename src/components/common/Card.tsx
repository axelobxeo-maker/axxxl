import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { Link } from 'lucide-react';

export function ShareButton() {
  const handleCopy = () => {
    navigator.clipboard.writeText('https://axeluf.portal/download-mod-slug');
    alert('Copied link!');
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-white/15 hover:bg-white/25 text-white border border-white/35 px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:translate-y-[-1px] select-none rounded-xl backdrop-blur-md"
    >
      <Link strokeWidth={2.5} className="w-3.5 h-3.5 shrink-0" />
      <span>SHARE</span>
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
  const baseStyles = 'rounded-2xl transition-all duration-300 select-none overflow-hidden backdrop-blur-xl saturate-[190%] border';
  
  const variantStyles = {
    white: 'bg-white/10 dark:bg-black/20 text-white border-white/25 dark:border-white/10',
    krem: 'bg-amber-100/10 dark:bg-amber-100/5 text-white border-amber-100/20 dark:border-white/10',
    accent: 'bg-theme-accent/15 text-white border-theme-accent/30 dark:border-white/10',
    yellow: 'bg-amber-400/15 text-white border-amber-400/30 dark:border-white/10',
    black: 'bg-black/30 dark:bg-black/50 text-white border-white/15 dark:border-white/10'
  };

  const shadowStyles = {
    sm: 'shadow-md',
    md: 'shadow-xl',
    lg: 'shadow-2xl'
  };

  const hoverEffect = hasHoverEffect
    ? 'hover:-translate-y-1 hover:bg-white/20 dark:hover:bg-black/35 hover:border-white/40 dark:hover:border-white/20 hover:shadow-2xl'
    : '';

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${shadowStyles[shadowSize]} ${hoverEffect} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
