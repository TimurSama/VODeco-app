import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/outline';

interface RegionDynamicsProps {
  value: number; // значение от -100 до 100
  label: string;
}

export default function RegionDynamicsScale({ value, label }: RegionDynamicsProps) {
  const normalizedValue = Math.max(-100, Math.min(100, value));
  const percentage = ((normalizedValue + 100) / 2).toFixed(1);
  
  const getColor = (value: number) => {
    if (value > 30) return 'text-eco-green';
    if (value < -30) return 'text-red-500';
    return 'text-yellow-500';
  };

  return (
    <div className="bg-night-blue p-4 rounded-lg shadow-eco">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-medium">{label}</span>
        <span className={`flex items-center ${getColor(normalizedValue)}`}>
          {normalizedValue > 0 ? (
            <ArrowUpIcon className="w-5 h-5 mr-1" />
          ) : (
            <ArrowDownIcon className="w-5 h-5 mr-1" />
          )}
          {percentage}%
        </span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${getColor(normalizedValue)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
} 