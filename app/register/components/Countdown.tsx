'use client';

import React, { useState, useEffect } from 'react';
import { TARGET_DATE } from '../constants';
import { TimeLeft } from '../types';

export const Countdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +TARGET_DATE - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimerBox = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center mx-2 md:mx-6 group">
      <div className="relative">
        <div className="font-display text-4xl md:text-7xl font-bold text-[#00F2FF] neon-glow transform transition-transform group-hover:scale-110 duration-300">
          {value.toString().padStart(2, '0')}
        </div>
        <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#0891B2] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
      </div>
      <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-[#9CA3AF] mt-2 uppercase">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center items-center py-10 select-none">
      <TimerBox label="Days" value={timeLeft.days} />
      <div className="font-display text-2xl md:text-5xl text-[#0891B2] mt-[-20px] hidden md:block">:</div>
      <TimerBox label="Hours" value={timeLeft.hours} />
      <div className="font-display text-2xl md:text-5xl text-[#0891B2] mt-[-20px] hidden md:block">:</div>
      <TimerBox label="Minutes" value={timeLeft.minutes} />
      <div className="font-display text-2xl md:text-5xl text-[#0891B2] mt-[-20px] hidden md:block">:</div>
      <TimerBox label="Seconds" value={timeLeft.seconds} />
    </div>
  );
};
