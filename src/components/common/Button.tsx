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
  const baseStyles = 'font-syne font-extrabold uppercase transition-all border-3 border-[var(--border-color,black)] rounded-xl cursor-pointer select-none flex items-center justify-center gap-2';
  
  const variantStyles = {
    primary: 'bg-[var(--text-color,black)] text-[var(--card-bg,white)] hover:opacity-90',
    secondary: 'bg-zinc-100 text-black hover:bg-zinc-200',
    accent: 'bg-theme-accent text-black hover:bg-theme-accent/90',
    yellow: 'bg-[#FFD100] text-black hover:bg-[#FFD100]/90',
    danger: 'bg-[#FF6B6B] text-black hover:bg-[#FF6B6B]/90',
    success: 'bg-[#4CCD99] text-black hover:bg-[#4CCD99]/90',
    white: 'bg-[var(--card-bg,white)] text-[var(--text-color,black)] hover:opacity-90'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[10px] rounded-lg border-2 border-[var(--border-color,black)] shadow-[2px_2px_0px_0px_var(--border-color,rgba(0,0,0,1))] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border-color,rgba(0,0,0,1))] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_var(--border-color,rgba(0,0,0,1))]',
    md: 'px-5 py-2.5 text-xs rounded-xl border-3 border-[var(--border-color,black)] shadow-[4px_4px_0px_0px_var(--border-color,rgba(0,0,0,1))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--border-color,rgba(0,0,0,1))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_var(--border-color,rgba(0,0,0,1))]',
    lg: 'px-7 py-3.5 text-sm rounded-2xl border-4 border-[var(--border-color,black)] shadow-[6px_6px_0px_0px_var(--border-color,rgba(0,0,0,1))] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_0px_var(--border-color,rgba(0,0,0,1))] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0px_0px_var(--border-color,rgba(0,0,0,1))]'
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
