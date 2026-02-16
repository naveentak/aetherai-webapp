import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, icon, className, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm";

  const variants = {
    primary: "bg-btn-primary-bg text-btn-primary-text hover:bg-btn-primary-hover border border-transparent shadow-glow",
    secondary: "bg-surfaceHighlight text-primary border border-border hover:border-btn-secondary-hover hover:bg-btn-secondary-hover",
    outline: "bg-transparent text-secondary border border-border hover:text-primary hover:border-overlay-40"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </motion.button>
  );
};
