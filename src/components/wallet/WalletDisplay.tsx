import React from 'react';
import TokenIcon from '../../assets/icons/TokenIcon';

interface WalletDisplayProps {
  balance: number;
  className?: string;
}

const WalletDisplay: React.FC<WalletDisplayProps> = ({ balance, className = '' }) => {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <TokenIcon className="h-5 w-5 text-white" />
      <span>{balance.toLocaleString()}</span>
    </div>
  );
};

export default WalletDisplay; 