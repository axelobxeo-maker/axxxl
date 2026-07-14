import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'white' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-sans font-bold uppercase transition-all duration-200 rounded-xl cursor-pointer select-none flex items-center justify-center gap-2 border shadow-sm backdrop-blur-md';
  
  const variantStyles = {
    primary: 'bg-white/20 hover:bg-white/35 text-white border-white/40 shadow-md',
    secondary: 'bg-zinc-100/10 hover:bg-zinc-100/25 text-white border-white/20',
    accent: 'bg-theme-accent/25 hover:bg-theme-accent/40 text-white border-theme-accent/40 shadow-theme-accent/20 shadow-md',
    yellow: 'bg-amber-400/25 hover:bg-amber-400/40 text-white border-amber-400/40 shadow-amber-400/20 shadow-md',
    danger: 'bg-red-500/25 hover:bg-red-500/40 text-white border-red-500/40 shadow-red-500/20 shadow-md',
    success: 'bg-emerald-500/25 hover:bg-emerald-500/40 text-white border-emerald-500/40 shadow-emerald-500/20 shadow-md',
    white: 'bg-white/15 hover:bg-white/25 text-white border-white/35'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[10px] rounded-lg border-white/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
    md: 'px-5 py-2.5 text-xs rounded-xl border-white/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
    lg: 'px-7 py-3.5 text-sm rounded-2xl border-white/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95'
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
