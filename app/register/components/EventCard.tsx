'use client';

import React, { useState } from 'react';

interface EventCardProps {
  title: string;
  description: string;
  icon: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ title, description, icon, isSelected, onSelect }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-500 ${isSelected ? 'scale-105' : 'scale-100'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
    >
      <div className={`glass-card p-8 rounded-xl flex flex-col items-center text-center h-full min-h-[320px] transition-all duration-300 ${isSelected ? 'border-[#00F2FF] shadow-[0_0_30px_rgba(0,242,255,0.2)]' : ''}`}>
        <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="font-display text-xl md:text-2xl font-bold text-[#00F2FF] mb-4 tracking-wider uppercase">
          {title}
        </h3>
        <p className="font-sans text-[#9CA3AF] text-sm md:text-base leading-relaxed">
          {description}
        </p>
        
        {isSelected && (
          <div className="absolute top-4 right-4 text-[#00F2FF] animate-pulse">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
