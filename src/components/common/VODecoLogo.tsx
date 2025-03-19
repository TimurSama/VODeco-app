import React from 'react';
import TokenIcon from '../../assets/icons/TokenIcon';

interface VODecoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const VODecoLogo: React.FC<VODecoLogoProps> = ({ className = '', size = 'md' }) => {
  const getSize = () => {
    switch (size) {
      case 'sm':
        return 'text-xl';
      case 'lg':
        return 'text-4xl';
      default:
        return 'text-2xl';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'h-5 w-5';
      case 'lg':
        return 'h-9 w-9';
      default:
        return 'h-7 w-7';
    }
  };

  return (
    <div className={`flex items-center font-bold ${getSize()} ${className}`}>
      <span>V</span>
      <TokenIcon className={`${getIconSize()} -ml-1 text-white`} />
      <span className="-ml-1">Deco</span>
    </div>
  );
};

export default VODecoLogo; 