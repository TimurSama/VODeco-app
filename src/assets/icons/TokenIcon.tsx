import React from 'react';

interface TokenIconProps {
  className?: string;
  color?: string;
}

const TokenIcon: React.FC<TokenIconProps> = ({ className = '', color = 'currentColor' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3.5C12 3.5 16 7.5 16 12C16 16.4183 12.4183 20 8 20C3.58172 20 0 16.4183 0 12C0 7.5 4 3.5 4 3.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TokenIcon; 