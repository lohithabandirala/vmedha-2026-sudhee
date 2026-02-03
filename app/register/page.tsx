'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Background } from './components/Background';
import { Countdown } from './components/Countdown';
import { EventCard } from './components/EventCard';
import { SuccessScreen } from './components/SuccessScreen';
import { RegistrationData, EventType } from './types';
import { EVENTS } from './constants';

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const eventParam = searchParams.get('event');

  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [formData, setFormData] = useState<Partial<RegistrationData>>({
    fullName: '',
    rollNumber: '',
    collegeName: '',
    branch: '',
    section: '',
    email: '',
    phoneNumber: '',
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-select event based on URL parameter
  useEffect(() => {
    if (eventParam) {
      const eventMap: Record<string, EventType> = {
        'cbit-dsa-master': EventType.CBIT_DSA_MASTER,
        'cipherville': EventType.CIPHERVILLE,
        'ethi-tech-mania': EventType.ETHI_TECH_MANIA,
      };
      const mappedEvent = eventMap[eventParam.toLowerCase()];
      if (mappedEvent) {
        setSelectedEvent(mappedEvent);
      }
    }
  }, [eventParam]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = 'Required';
    if (!formData.rollNumber) newErrors.rollNumber = 'Required';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phoneNumber || formData.phoneNumber.length !== 10) newErrors.phoneNumber = 'Must be 10 digits';
    if (!selectedEvent) newErrors.event = 'Select an event';
    if (!password) newErrors.password = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[name];
        return n;
      });
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSelectedEvent(null);
    setFormData({
      fullName: '',
      rollNumber: '',
      collegeName: '',
      branch: '',
      section: '',
      email: '',
      phoneNumber: '',
    });
    setPassword('');
  };

  if (isSubmitted) {
    return (
      <SuccessScreen data={{ ...formData, event: selectedEvent! } as RegistrationData} onReset={handleReset} />
    );
  }

  return (
    <div className="relative min-h-screen text-[#E5E7EB] font-sans selection:bg-[#0891B2] selection:text-white">
      <Background />

      {/* Header / Timer Section */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[#050505] to-transparent pb-10">
        <div className="container mx-auto flex flex-col items-center">
          <Countdown />
        </div>
      </header>

      <main className="container mx-auto px-6 pt-[280px] pb-20">
        <section className="text-center mb-24">
          <h1 className="font-display text-5xl md:text-8xl font-black mb-4 tracking-tighter uppercase neon-glow leading-tight">
            VMEDHA <br className="md:hidden" /> <span className="text-[#0891B2]">SUDHEE 2026</span>
          </h1>
          <p className="font-sans text-[#9CA3AF] text-lg md:text-xl tracking-[0.2em] uppercase">
            Official Event Registration – CBIT
          </p>
        </section>

        {/* Events Grid */}
        <section className="mb-32">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center text-[#0891B2] tracking-widest uppercase">
            Select Your Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EVENTS.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                icon={event.icon}
                isSelected={selectedEvent === event.id}
                onSelect={() => setSelectedEvent(event.id)}
              />
            ))}
          </div>
          {errors.event && <p className="text-red-500 text-center mt-4 font-mono uppercase text-sm">{errors.event}</p>}
        </section>

        {/* Registration Form */}
        <section id="register" className="max-w-4xl mx-auto">
          <div className="glass-card p-10 md:p-16 rounded-2xl border border-[#0891B2]/30 relative overflow-hidden group">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F2FF]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-center mb-12 border-b border-[#0891B2]/20 pb-6">
              <div className="w-3 h-3 bg-[#00F2FF] rounded-full mr-4 animate-pulse"></div>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-widest text-[#E5E7EB] uppercase">
                Terminal Access
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="relative group">
                  <label className="block text-xs font-mono text-[#0891B2] uppercase mb-2 tracking-widest">
                    &gt; Full_Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full bg-[#050505]/50 border-b-2 ${errors.fullName ? 'border-red-500' : 'border-[#0891B2]/30'} focus:border-[#00F2FF] outline-none py-3 px-4 font-sans text-[#E5E7EB] transition-all transform focus:scale-[1.02]`}
                    placeholder="ENTER_IDENTITY"
                  />
                </div>

                {/* Roll Number */}
                <div className="relative group">
                  <label className="block text-xs font-mono text-[#0891B2] uppercase mb-2 tracking-widest">
                    &gt; Roll_Number
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    className={`w-full bg-[#050505]/50 border-b-2 ${errors.rollNumber ? 'border-red-500' : 'border-[#0891B2]/30'} focus:border-[#00F2FF] outline-none py-3 px-4 font-sans text-[#E5E7EB] transition-all transform focus:scale-[1.02]`}
                    placeholder="ENTER_SERIAL_ID"
                  />
                </div>

                {/* College Name */}
                <div className="relative group">
                  <label className="block text-xs font-mono text-[#0891B2] uppercase mb-2 tracking-widest">
                    &gt; College_Name
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    className="w-full bg-[#050505]/50 border-b-2 border-[#0891B2]/30 focus:border-[#00F2FF] outline-none py-3 px-4 font-sans text-[#E5E7EB] transition-all transform focus:scale-[1.02]"
                    placeholder="CBIT_DEFAULT"
                  />
                </div>

                {/* Branch */}
                <div className="relative group">
                  <label className="block text-xs font-mono text-[#0891B2] uppercase mb-2 tracking-widest">
                    &gt; Branch
                  </label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="w-full bg-[#050505]/50 border-b-2 border-[#0891B2]/30 focus:border-[#00F2FF] outline-none py-3 px-4 font-sans text-[#E5E7EB] transition-all transform focus:scale-[1.02]"
                    placeholder="DEPT_CODE"
                  />
                </div>

                {/* Section */}
                <div className="relative group">
                  <label className="block text-xs font-mono text-[#0891B2] uppercase mb-2 tracking-widest">
                    &gt; Section
                  </label>
                  <input
                    type="text"
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    className="w-full bg-[#050505]/50 border-b-2 border-[#0891B2]/30 focus:border-[#00F2FF] outline-none py-3 px-4 font-sans text-[#E5E7EB] transition-all transform focus:scale-[1.02]"
                    placeholder="SUB_SECTOR"
                  />
                </div>

                {/* Email */}
                <div className="relative group">
                  <label className="block text-xs font-mono text-[#0891B2] uppercase mb-2 tracking-widest">
                    &gt; Comms_Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-[#050505]/50 border-b-2 ${errors.email ? 'border-red-500' : 'border-[#0891B2]/30'} focus:border-[#00F2FF] outline-none py-3 px-4 font-sans text-[#E5E7EB] transition-all transform focus:scale-[1.02]`}
                    placeholder="NETWORK_ADDRESS"
                  />
                </div>

                {/* Phone Number */}
                <div className="relative group">
                  <label className="block text-xs font-mono text-[#0891B2] uppercase mb-2 tracking-widest">
                    &gt; Uplink_Phone
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    maxLength={10}
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full bg-[#050505]/50 border-b-2 ${formData.phoneNumber?.length === 10 ? 'border-[#00F2FF] shadow-[0_4px_10px_rgba(0,242,255,0.2)]' : errors.phoneNumber ? 'border-red-500' : 'border-[#0891B2]/30'} focus:border-[#00F2FF] outline-none py-3 px-4 font-sans text-[#E5E7EB] transition-all transform focus:scale-[1.02]`}
                    placeholder="10_DIGIT_ID"
                  />
                </div>

                {/* Password */}
                <div className="relative group">
                  <label className="block text-xs font-mono text-[#0891B2] uppercase mb-2 tracking-widest">
                    &gt; Access_Key
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full bg-[#050505]/50 border-b-2 ${errors.password ? 'border-red-500' : 'border-[#0891B2]/30'} focus:border-[#00F2FF] outline-none py-3 px-4 font-sans text-[#E5E7EB] transition-all transform focus:scale-[1.02] pr-12`}
                      placeholder="SECURE_PHRASE"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0891B2] hover:text-[#00F2FF]"
                    >
                      {showPassword ? 'HIDE' : 'SHOW'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full py-5 font-display text-xl md:text-2xl font-bold tracking-[0.3em] bg-transparent border-2 border-[#00F2FF] text-[#00F2FF] hover:bg-[#00F2FF] hover:text-[#050505] transition-all duration-300 transform active:scale-95 shadow-[0_0_15px_rgba(0,242,255,0.3)] hover:shadow-[0_0_30px_rgba(0,242,255,0.6)] uppercase"
                >
                  Initiate Registration
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-10 text-center border-t border-[#0891B2]/10 bg-[#050505]/80 backdrop-blur-md">
        <p className="font-mono text-[10px] md:text-xs text-[#9CA3AF] tracking-[0.4em] uppercase">
          &copy; 2026 VMEDHA – SUDHEE FEST // CBIT
        </p>
      </footer>
    </div>
  );
}
