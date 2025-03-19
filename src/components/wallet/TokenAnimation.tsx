import React from 'react';
import { motion } from 'framer-motion';

interface TokenAnimationProps {
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  onComplete: () => void;
}

const TokenAnimation: React.FC<TokenAnimationProps> = ({
  startPosition,
  endPosition,
  onComplete,
}) => {
  const tokenVariants = {
    initial: {
      x: startPosition.x,
      y: startPosition.y,
      scale: 1,
      opacity: 1,
    },
    animate: {
      x: endPosition.x,
      y: endPosition.y,
      scale: 0.5,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="absolute z-50"
      initial="initial"
      animate="animate"
      variants={tokenVariants}
      onAnimationComplete={onComplete}
    >
      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
        VOD
      </div>
    </motion.div>
  );
};

export default TokenAnimation; 