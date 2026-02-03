'use client';

import React, { useEffect, useState } from 'react';
import { RegistrationData } from '../types';

interface SuccessScreenProps {
  data: RegistrationData;
  onReset: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ data, onReset }) => {
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSummary(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6 animate-zoom-out">
      {/* 3D Confetti simulation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: Math.random() > 0.5 ? '#00F2FF' : '#E5E7EB',
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative text-center max-w-2xl w-full">
        <h1 className="font-display text-4xl md:text-6xl text-[#00F2FF] neon-glow mb-4 animate-pulse">
          INITIALIZATION SUCCESSFUL
        </h1>
        <p className="font-sans text-[#E5E7EB] text-xl md:text-2xl mb-12 tracking-wide">
          Welcome to VMEDHA – SUDHEE 2026
        </p>

        {showSummary && (
          <div className="glass-card p-8 rounded-lg text-left font-mono text-[#00F2FF] border border-[#0891B2] animate-fade-in">
            <div className="mb-4 text-xs text-[#0891B2] uppercase tracking-tighter">
              &gt; REGISTRATION_SUMMARY_LOG
            </div>
            <div className="space-y-2 text-sm md:text-base">
              <div><span className="opacity-50">USER:</span> {data.fullName}</div>
              <div><span className="opacity-50">ID:</span> {data.rollNumber}</div>
              <div><span className="opacity-50">UNIT:</span> {data.collegeName}</div>
              <div><span className="opacity-50">SECTOR:</span> {data.branch} - {data.section}</div>
              <div><span className="opacity-50">COMMS:</span> {data.email}</div>
              <div><span className="opacity-50">ASSIGNED_MISSION:</span> {data.event}</div>
            </div>
            <div className="mt-8 border-t border-[#0891B2]/30 pt-4 flex justify-between items-center">
              <span className="text-[10px] animate-pulse">STATUS: ACTIVE // AUTHORIZED</span>
              <button
                onClick={onReset}
                className="text-[#E5E7EB] hover:text-[#00F2FF] transition-colors text-sm underline"
              >
                RETURN TO TERMINAL
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes zoom-out {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-zoom-out { animation: zoom-out 1s ease-out forwards; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
      `}</style>
    </div>
  );
};
