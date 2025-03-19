import React, { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  useEffect(() => {
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    setAppHeight();
    window.addEventListener('resize', setAppHeight);
    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  const bubbles = Array.from({ length: 5 }, (_, i) => ({
    size: Math.random() * 60 + 20,
    x: Math.random() * 100,
    delay: i * 0.2,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-blue to-blue-900">
      <div className="mobile-container glass">
        {bubbles.map((bubble, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white/5 backdrop-blur-sm"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.x}%`,
              bottom: '-20px',
            }}
            animate={{
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              delay: bubble.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        {children}
      </div>
    </div>
  );
};

export default AppWrapper; 