import React from 'react';
import { motion } from 'framer-motion';

export interface Partner {
  id: string;
  name: string;
  type: string;
  description: string;
  logo?: string;
  website?: string;
  projects: string[];
  contribution: string;
}

interface PartnerCardProps {
  partner: Partner;
  onClick: () => void;
}

export default function PartnerCard({ partner, onClick }: PartnerCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 cursor-pointer 
                 hover:border-teal-500/50 hover:bg-gray-900/70
                 flex flex-col h-[360px] relative overflow-hidden"
    >
      <div className="flex items-start justify-between mb-4 shrink-0">
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="text-xl font-semibold mb-2 truncate">{partner.name}</h3>
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-teal-500/20 text-teal-400 truncate max-w-full">
            {partner.type}
          </span>
        </div>
        {partner.logo && (
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            className="w-12 h-12 object-contain flex-shrink-0"
          />
        )}
      </div>

      <div className="mb-4 flex-1 overflow-hidden">
        <p className="text-gray-400 line-clamp-4">
          {partner.description}
        </p>
      </div>

      <div className="mt-auto shrink-0">
        <h4 className="text-sm font-semibold mb-2 text-gray-300">Проекты:</h4>
        <div className="flex flex-wrap gap-2">
          {partner.projects.slice(0, 3).map((project, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 bg-teal-900/30 rounded-full text-xs 
                       border border-teal-500/20 truncate max-w-[150px]"
            >
              {project}
            </span>
          ))}
          {partner.projects.length > 3 && (
            <span className="inline-block px-2 py-1 bg-teal-900/30 rounded-full text-xs 
                         border border-teal-500/20">
              +{partner.projects.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
} 