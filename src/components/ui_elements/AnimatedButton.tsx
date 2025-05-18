
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// Extend HTMLMotionProps for compatibility with motion.button
interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, className, ...props }) => {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 15px rgba(155, 135, 245, 0.5)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
      className={`px-6 py-3 rounded-lg font-semibold text-white bg-primary-purple hover:bg-secondary-purple transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-light-purple focus:ring-opacity-50 ${className || ''}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
