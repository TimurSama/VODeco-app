import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  const logoVariants = {
    initial: {
      scale: 0,
      rotate: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      rotate: 720,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeOut",
      },
    },
    exit: {
      scale: 0,
      rotate: -720,
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeIn",
      },
    },
  };

  const dropVariants = {
    initial: { y: -50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 2,
      },
    },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 2.5,
      },
    },
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div
          className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <div className="flex flex-col items-center text-center">
            {/* Анимированный логотип */}
            <motion.div
              className="w-32 h-32 mb-6 relative"
              variants={logoVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <svg
                width="261"
                height="395"
                viewBox="0 0 261 395"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <motion.path
                  d="M53.796 146.941C65.3345 164.397 64.9934 166.278 48.7384 183.511C32.4834 200.744 22.6739 221.41 17.8398 244.039C0.620288 324.633 77.414 393.542 153.702 376.38C204.808 364.883 239.294 323.552 244.881 271.499C248.409 238.361 231.684 214.075 215.135 189.401C197.339 162.857 176.602 138.218 159.689 111.158C147.256 91.2795 139.011 68.8388 128.708 47.5735C120.769 31.316 124.227 15.5169 129.449 0C135.483 17.9738 140.693 36.4413 147.821 54.0742C163.323 92.4198 186.729 126.181 212.512 158.143C230.272 180.149 244.822 204.095 254.761 230.109C264.099 254.536 262.229 280.469 253.949 305.519C234.742 363.696 174.768 401.912 115.158 393.954C52.1376 385.572 3.34906 335.695 0.196859 274.356C-0.979335 252.138 3.01975 229.874 14.7699 210.172C27.4611 188.883 40.7873 167.971 53.796 146.941Z"
                  fill="#3190FF"
                  variants={dropVariants}
                  initial="initial"
                  animate="animate"
                />
                <motion.path
                  d="M116.064 47.456C124.156 81.5462 139.058 110.347 157.736 137.266C167.981 152.042 179.284 166.078 189.494 180.89C200.009 196.172 211.841 210.983 219.451 227.652C235.212 261.931 229.178 295.127 206.348 324.304C183.107 354.021 151.397 366.023 114.147 360.005C64.3582 351.964 30.2604 308.893 32.6245 258.263C32.8951 252.291 35.1416 246.32 37.0117 240.524C43.9737 218.599 55.4257 198.362 70.6391 181.101C81.2249 190.917 81.5777 192.633 73.3208 203.225C61.5001 218.377 52.3728 234.964 48.3855 253.772C45.0804 269.395 49.8087 284.277 56.1131 298.231C63.3368 314.15 75.5309 327.299 90.8656 335.705C106.2 344.111 123.849 347.321 141.164 344.852C177.626 339.503 204.125 312.725 210.559 275.978C213.448 260.696 211.241 244.888 204.278 230.979C191.117 203.542 168.651 183.112 151.832 158.484C134.283 132.834 119.051 106.032 109.818 76.0447C106.654 65.5708 110.042 57.6007 116.064 47.456Z"
                  fill="#3190FF"
                  variants={dropVariants}
                  initial="initial"
                  animate="animate"
                />
                <motion.path
                  d="M96.0684 88.282C108.418 111.546 119.745 135.609 133.577 158.12C145.339 177.246 159.254 195.208 173.568 212.582C193.281 236.551 199.632 269.454 187.423 293.188C180.055 307.779 167.386 319.005 152.008 324.566C136.63 330.128 119.707 329.605 104.702 323.105C72.9562 309.363 57.4775 273.897 70.1922 241.864C73.7208 232.801 80.3545 224.854 86.1296 216.802C87.1411 215.391 92.0106 214.839 93.3044 215.956C95.7729 218.151 97.3158 221.202 97.621 224.49C97.621 226.994 95.104 229.839 93.1279 232.025C76.3789 250.563 78.4961 268.913 87.8116 287.275C96.6683 304.778 115.758 314.206 135.342 312.043C155.549 309.81 170.463 296.021 177.226 275.672C182.248 260.555 176.779 247.812 169.369 236.222C159.254 220.364 146.315 206.328 136.024 190.576C120.957 167.501 106.972 143.708 92.9162 120.045C86.0473 108.524 86.8 97.2747 96.0684 88.282Z"
                  fill="#3190FF"
                  variants={dropVariants}
                  initial="initial"
                  animate="animate"
                />
                <motion.path
                  d="M77.2493 118.305C89.8934 156.592 112.535 186.591 135.177 216.743C143.869 228.346 152.373 240.43 158.701 253.408C165.687 267.867 158.607 284.148 144.586 291.601C138.031 295.052 130.46 296.057 123.231 294.435C116.001 292.813 109.587 288.67 105.137 282.749C98.9854 274.697 98.0797 254.725 103.772 246.755C106.395 243.087 110.253 239.607 114.276 244.333C116.475 246.907 118.346 252.033 117.252 254.748C113.064 265.057 113.947 271.488 122.051 276.813C128.743 281.209 137.553 280.081 142.881 271.852C145.469 267.843 145.998 259.591 143.551 255.759C132.519 238.444 119.369 222.48 108.336 205.211C94.8452 183.993 82.554 161.987 70.051 140.158C65.0404 131.447 71.7682 126.005 77.2493 118.305Z"
                  fill="#3190FF"
                  variants={dropVariants}
                  initial="initial"
                  animate="animate"
                />
              </svg>
            </motion.div>

            {/* Текст приветствия */}
            <motion.div
              className="space-y-4"
              variants={contentVariants}
              initial="initial"
              animate="animate"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                Добро пожаловать в VODeco!
              </h2>
              <p className="text-lg text-gray-600">
                Благодарим вас за интерес к нашему проекту. Мы рады, что вы присоединились к нам на раннем этапе развития платформы.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <p className="text-blue-800 font-medium">
                  Ваш подарок за ранний доступ:
                </p>
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  10 VOD токенов
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Забрать подарок и продолжить
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WelcomeModal; 