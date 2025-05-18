
import React from 'react';
import { motion } from 'framer-motion';
import { Ghost } from 'lucide-react'; // Using lucide Ghost icon for simplicity

interface GhostIndicatorProps {
  isVisible: boolean;
  animateAt: number; // Time in ms when the ghost should "tap"
  gameDuration: number; // Total duration of the "waiting" phase for positioning
}

const GhostIndicator: React.FC<GhostIndicatorProps> = ({ isVisible, animateAt, gameDuration }) => {
  if (!isVisible || gameDuration === 0) return null;

  // Calculate animation duration based on when the ghost taps
  const ghostTapTime = animateAt / 1000; // convert ms to s for Framer Motion duration

  return (
    <motion.div
      className="absolute top-1/2 left-0 w-full h-12 flex items-center pointer-events-none"
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ 
        opacity: [0, 0.7, 0.7, 0], 
        x: ["-100%", "50%", "50%", "120%"] 
      }}
      transition={{ 
        duration: ghostTapTime + 0.5, 
        times: [0, ghostTapTime / (ghostTapTime + 0.5) * 0.8, ghostTapTime / (ghostTapTime + 0.5), 1],
        ease: "linear" 
      }}
      style={{ y: '-50%' }}
    >
      <div className="relative p-2 rounded-full bg-secondary-purple/30 backdrop-filter backdrop-blur-sm">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-light-purple/20 blur-md animate-pulse-glow"></div>
        <Ghost size={28} className="text-light-purple relative z-10" />
        
        {/* Trail effect */}
        <motion.div 
          className="absolute top-1/2 right-full h-1 bg-gradient-to-l from-light-purple/50 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: [0, 30, 0] }}
          transition={{ 
            duration: 1, 
            repeat: Infinity,
            repeatType: "loop"
          }}
          style={{ y: '-50%' }}
        />
      </div>
    </motion.div>
  );
};

export default GhostIndicator;
