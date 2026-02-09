'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { HudFrame, HudButton, HudBadge } from '@/components/ui/hud-frame'
import { Navigation } from '@/components/sections/navigation'
import { Footer } from '@/components/sections/footer'
import { submitRegistration } from '@/lib/register'

interface FormData {
  fullName: string
  rollNumber: string
  isCBIT: boolean // true = CBIT, false = Non-CBIT
  college: string // "CBIT" or actual college name
  branch: string
  year: '1' | '2' | '3' | '4'
  email: string
  phoneNumber: string
  events: string[]
}

const EVENTS = [
  { id: 'dsa-master', name: 'DSA MASTER CBIT' },
  { id: 'cipherville', name: 'CIPHERVILLE' },
  { id: 'ethitech-mania', name: 'ETHITECH MANIA' },
  { id: 'all-events', name: 'All 3 Events' }
]

function RegisterForm() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    rollNumber: '',
    isCBIT: true,
    college: 'CBIT',
    branch: '',
    year: '1',
    email: '',
    phoneNumber: '',
    events: []
  })

  useEffect(() => {
    const eventParam = searchParams.get('event')
    if (eventParam && EVENTS.some(e => e.id === eventParam)) {
      setFormData(prev => ({ ...prev, events: [eventParam] }))
    }
  }, [searchParams])

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    // Full Name
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required'
    else if (formData.fullName.length < 3) newErrors.fullName = 'Name must be at least 3 characters'

    // Roll Number
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll Number is required'

    // College (if Non-CBIT, must have value)
    if (!formData.isCBIT && (!formData.college.trim() || formData.college === 'CBIT')) {
      newErrors.college = 'College Name is required'
    }

    // Branch
    if (!formData.branch.trim()) newErrors.branch = 'Branch is required'

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format'

    // Phone Number (10 digits)
    const phoneRegex = /^[0-9]{10}$/
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required'
    else if (!phoneRegex.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone number must be exactly 10 digits'

    // Event
    if (formData.events.length === 0) newErrors.events = 'Please select at least one event'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const toggleEvent = (eventId: string) => {
    setFormData(prev => {
      const current = prev.events
      let newEvents: string[] = []

      if (eventId === 'all-events') {
        // Toggle All Logic
        const allRealEvents = EVENTS.filter(e => e.id !== 'all-events').map(e => e.id)
        const isAllSelected = current.includes('all-events')

        if (isAllSelected) {
          // Deselect all
          newEvents = []
        } else {
          // Select all
          newEvents = [...allRealEvents, 'all-events']
        }
      } else {
        // Toggle Individual Logic
        const isSelected = current.includes(eventId)
        let updated = isSelected
          ? current.filter(e => e !== eventId)
          : [...current, eventId]

        // Check if all real events are now selected
        const allRealEvents = EVENTS.filter(e => e.id !== 'all-events').map(e => e.id)
        const areAllRealSelected = allRealEvents.every(id => updated.includes(id))

        if (areAllRealSelected) {
          if (!updated.includes('all-events')) updated.push('all-events')
        } else {
          updated = updated.filter(id => id !== 'all-events')
        }

        newEvents = updated
      }

      return { ...prev, events: newEvents }
    })

    if (errors.events) {
      setErrors(prev => ({ ...prev, events: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await submitRegistration({
        fullName: formData.fullName,
        rollNumber: formData.rollNumber,
        college: formData.isCBIT ? 'CBIT' : formData.college,
        branch: formData.branch,
        year: formData.year,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        // Filter out 'all-events' ID before sending to backend
        events: formData.events.filter(e => e !== 'all-events')
      })

      if (result.success) {
        setIsSuccess(true)
        window.scrollTo(0, 0)
      } else {
        setSubmitError(result.message)
      }
    } catch (error: any) {
      setSubmitError('Something went wrong. Please try again.')
      console.error('Registration error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    // Define group links - REPLACE THESE WITH ACTUAL LINKS
    const GROUPS = {
      'dsa-master': { name: 'DSA Master', link: 'https://chat.whatsapp.com/JGxZoJdWVaJ5SkzhzXh2tU?mode=gi_t' },
      'cipherville': { name: 'Cipherville', link: 'https://chat.whatsapp.com/LObYfIPDpup7yhDjQzFKxr?mode=gi_t' },
      'ethitech-mania': { name: 'Ethitech Mania', link: 'https://chat.whatsapp.com/Gh6EBNwaskZBSGNvUyU0ES?mode=gi_t' },
    }

    // Determine which cards to show
    const groupsToShow = formData.events
      .map(id => GROUPS[id as keyof typeof GROUPS])
      .filter(Boolean)

    return (
      <div className="min-h-screen bg-[#080B1F] text-[#E6E9FF] font-sans selection:bg-[#00F2FF]/30 selection:text-[#00F2FF]">
        <Navigation />
        <div className="pt-32 pb-20 px-4 min-h-screen flex flex-col items-center justify-center">
          <HudFrame className="max-w-2xl w-full text-center py-10 px-6" glowing>
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-[#00FF88]/10 flex items-center justify-center border border-[#00FF88] shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                <svg className="w-10 h-10 text-[#00FF88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-display font-bold text-[#FFFFFF] mb-3">Registration Successful!</h2>
            <p className="text-[#7D7DBE] text-lg mb-8 max-w-lg mx-auto">
              You have successfully registered for <span className="text-[#00F2FF]">
                {formData.events.map(id => EVENTS.find(e => e.id === id)?.name).join(', ')}
              </span>.
            </p>

            <div className="bg-[#1A1C3D]/40 rounded-xl border border-[#3A3F7A] p-6 mb-8">
              <h3 className="text-xl font-bold text-[#E6E9FF] mb-4 flex items-center justify-center gap-2">
                <svg viewBox="0 0 448 512" fill="currentColor" className="w-6 h-6 text-[#25D366]">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-31.9-28.2-68.1-28.2-106.2 0-110.6 90-200.5 200.5-200.5 53.6 0 104 20.9 141.9 58.9 37.9 37.9 58.9 88.3 58.9 141.9 0 110.8-89.9 200.5-200.5 200.5zm102.2-150c-5.6-2.8-33.1-16.3-38.3-18.2-5.1-1.9-8.9-2.8-12.6 2.8-3.7 5.6-14.3 18.2-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.6-30.3-17.1-41.5-4.5-11.1-9.1-9.6-12.6-9.8-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 33.1-13.5 37.7-26.6 4.6-13.1 4.6-24.4 3.2-26.6-1.4-2.3-5.1-3.7-10.7-6.5z" />
                </svg>
                Join Official WhatsApp Groups
              </h3>
              <p className="text-[#7D7DBE] text-sm mb-6">
                Please join the respective groups to stay updated with event announcements, schedules, and more.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                {groupsToShow.map((group) => (
                  <a
                    key={group.name}
                    href={group.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 hover:border-[#25D366] transition-all duration-300 group w-full max-w-xs"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg viewBox="0 0 448 512" fill="currentColor" className="w-6 h-6 text-[#25D366]">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-31.9-28.2-68.1-28.2-106.2 0-110.6 90-200.5 200.5-200.5 53.6 0 104 20.9 141.9 58.9 37.9 37.9 58.9 88.3 58.9 141.9 0 110.8-89.9 200.5-200.5 200.5zm102.2-150c-5.6-2.8-33.1-16.3-38.3-18.2-5.1-1.9-8.9-2.8-12.6 2.8-3.7 5.6-14.3 18.2-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.6-30.3-17.1-41.5-4.5-11.1-9.1-9.6-12.6-9.8-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 33.1-13.5 37.7-26.6 4.6-13.1 4.6-24.4 3.2-26.6-1.4-2.3-5.1-3.7-10.7-6.5z" />
                      </svg>
                    </div>
                    <span className="text-[#E6E9FF] font-bold text-sm text-center mb-1 group-hover:text-[#25D366] transition-colors">{group.name}</span>
                    <span className="text-[#25D366] text-xs font-medium uppercase tracking-wider">Join Group</span>
                  </a>
                ))}
              </div>
            </div>

            <HudButton href="/" variant="primary" className="mt-4">Back to Home</HudButton>
          </HudFrame>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080B1F] text-[#E6E9FF] font-sans selection:bg-[#00F2FF]/30 selection:text-[#00F2FF] overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,242,255,0.05)_0%,rgba(8,11,31,0)_70%)]" />
        <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-[#6366F1]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[10%] w-64 h-64 bg-[#00F2FF]/10 rounded-full blur-[100px]" />
      </div>

      <Navigation />

      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto z-10">
        <div className="text-center mb-10">
          <HudBadge variant="accent" className="mb-4">JOIN THE FUTURE</HudBadge>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-[#FFFFFF] via-[#E6E9FF] to-[#7D7DBE] bg-clip-text text-transparent">
            Event Registration
          </h1>
          <p className="text-[#7D7DBE]">Fill out the details below to secure your spot.</p>
        </div>

        <HudFrame className="w-full" glowing>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#00F2FF] uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-[#080B1F]/50 border border-[#3A3F7A] rounded px-4 py-3 text-[#E6E9FF] focus:border-[#00F2FF] focus:outline-none focus:ring-1 focus:ring-[#00F2FF] transition-all placeholder:text-[#7D7DBE]/50"
                suppressHydrationWarning
              />
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Roll Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#00F2FF] uppercase tracking-wider">Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  placeholder="e.g. 1601..."
                  className="w-full bg-[#080B1F]/50 border border-[#3A3F7A] rounded px-4 py-3 text-[#E6E9FF] focus:border-[#00F2FF] focus:outline-none focus:ring-1 focus:ring-[#00F2FF] transition-all placeholder:text-[#7D7DBE]/50"
                  suppressHydrationWarning
                />
                {errors.rollNumber && <p className="text-red-400 text-xs mt-1">{errors.rollNumber}</p>}
              </div>

              {/* Year */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#00F2FF] uppercase tracking-wider">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full bg-[#080B1F]/50 border border-[#3A3F7A] rounded px-4 py-3 text-[#E6E9FF] focus:border-[#00F2FF] focus:outline-none focus:ring-1 focus:ring-[#00F2FF] transition-all"
                  suppressHydrationWarning
                >
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>

            {/* College Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#00F2FF] uppercase tracking-wider">College</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-4 h-4 border rounded-full flex items-center justify-center transition-all ${formData.isCBIT ? 'border-[#00F2FF] bg-[#00F2FF]/20' : 'border-[#3A3F7A] group-hover:border-[#00F2FF]/50'}`}>
                    {formData.isCBIT && <div className="w-2 h-2 rounded-full bg-[#00F2FF]" />}
                  </div>
                  <input
                    type="radio"
                    name="isCBIT"
                    checked={formData.isCBIT}
                    onChange={() => setFormData(prev => ({ ...prev, isCBIT: true, college: 'CBIT' }))}
                    className="hidden"
                  />
                  <span className="text-[#E6E9FF]">CBIT</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-4 h-4 border rounded-full flex items-center justify-center transition-all ${!formData.isCBIT ? 'border-[#00F2FF] bg-[#00F2FF]/20' : 'border-[#3A3F7A] group-hover:border-[#00F2FF]/50'}`}>
                    {!formData.isCBIT && <div className="w-2 h-2 rounded-full bg-[#00F2FF]" />}
                  </div>
                  <input
                    type="radio"
                    name="isCBIT"
                    checked={!formData.isCBIT}
                    onChange={() => setFormData(prev => ({ ...prev, isCBIT: false, college: '' }))}
                    className="hidden"
                  />
                  <span className="text-[#E6E9FF]">Non-CBIT</span>
                </label>
              </div>
            </div>

            {/* Dynamic College Name Input */}
            {!formData.isCBIT && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-sm font-medium text-[#00F2FF] uppercase tracking-wider">College Name</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter your college name"
                  className="w-full bg-[#080B1F]/50 border border-[#3A3F7A] rounded px-4 py-3 text-[#E6E9FF] focus:border-[#00F2FF] focus:outline-none focus:ring-1 focus:ring-[#00F2FF] transition-all placeholder:text-[#7D7DBE]/50"
                  suppressHydrationWarning
                />
                {errors.college && <p className="text-red-400 text-xs mt-1">{errors.college}</p>}
              </div>
            )}

            {/* Branch */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#00F2FF] uppercase tracking-wider">Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full bg-[#080B1F]/50 border border-[#3A3F7A] rounded px-4 py-3 text-[#E6E9FF] focus:border-[#00F2FF] focus:outline-none focus:ring-1 focus:ring-[#00F2FF] transition-all"
                suppressHydrationWarning
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="AIML">AIML</option>
                <option value="AI&DS">AI&DS</option>
                <option value="CET">CET (CSE-IOT)</option>
                <option value="CSM">CSM (CSE-AIML)</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="VLSI">VLSI</option>
                <option value="Mech">Mech</option>
                <option value="Prod">Prod</option>
                <option value="Civil">Civil</option>
                <option value="Biotech">Biotech</option>
                <option value="Chemical">Chemical</option>
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
                <option value="Other">Other</option>
              </select>
              {errors.branch && <p className="text-red-400 text-xs mt-1">{errors.branch}</p>}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#00F2FF] uppercase tracking-wider">Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-[#080B1F]/50 border border-[#3A3F7A] rounded px-4 py-3 text-[#E6E9FF] focus:border-[#00F2FF] focus:outline-none focus:ring-1 focus:ring-[#00F2FF] transition-all placeholder:text-[#7D7DBE]/50"
                  suppressHydrationWarning
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#00F2FF] uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    // Only allow numbers
                    const val = e.target.value.replace(/\D/g, '')
                    setFormData(prev => ({ ...prev, phoneNumber: val }))
                    if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: undefined }))
                  }}
                  placeholder="10 digit mobile number"
                  className="w-full bg-[#080B1F]/50 border border-[#3A3F7A] rounded px-4 py-3 text-[#E6E9FF] focus:border-[#00F2FF] focus:outline-none focus:ring-1 focus:ring-[#00F2FF] transition-all placeholder:text-[#7D7DBE]/50"
                  suppressHydrationWarning
                />
                {errors.phoneNumber && <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>
            </div>

            {/* Event Selection */}
            <div className="space-y-4 pt-4 border-t border-[#3A3F7A]/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                <label className="text-sm font-medium text-[#00F2FF] uppercase tracking-wider block">Select Event(s) to Register</label>
                <span className="text-xs text-[#00F2FF]/70 bg-[#00F2FF]/10 px-2 py-1 rounded border border-[#00F2FF]/20">
                  Tip: You can select multiple events
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EVENTS.map((evt) => {
                  const isSelected = formData.events.includes(evt.id)
                  return (
                    <label
                      key={evt.id}
                      className={`
                                  relative p-4 rounded-lg border cursor-pointer transition-all duration-300
                                  ${isSelected
                          ? 'bg-[#00F2FF]/10 border-[#00F2FF] shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                          : 'bg-[#080B1F]/30 border-[#3A3F7A] hover:border-[#00F2FF]/50 hover:bg-[#00F2FF]/5'
                        }
                              `}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isSelected ? 'border-[#00F2FF] bg-[#00F2FF]' : 'border-[#7D7DBE]'}`}>
                          {isSelected && (
                            <svg className="w-3.5 h-3.5 text-black font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className={`block font-display font-bold ${isSelected ? 'text-[#FFFFFF]' : 'text-[#E6E9FF]'}`}>
                        {evt.name}
                      </span>
                      <input
                        type="checkbox"
                        name="events"
                        value={evt.id}
                        checked={isSelected}
                        onChange={() => toggleEvent(evt.id)}
                        className="hidden"
                      />
                    </label>
                  )
                })}
              </div>
              {errors.events && <p className="text-red-400 text-xs mt-1">{errors.events}</p>}
            </div>


            {/* Submit Button */}
            <div className="pt-6">
              {/* Error Message */}
              {submitError && (
                <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-center">
                  {submitError}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                        w-full relative inline-flex items-center justify-center px-8 py-4 
                        font-bold tracking-wider uppercase overflow-hidden
                        transition-all duration-300
                        ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'group hover:shadow-[0_0_20px_rgba(0,242,255,0.4)]'}
                    `}
                style={{
                  border: '1px solid #00F2FF',
                  color: '#00F2FF'
                }}
                suppressHydrationWarning
              >
                {/* Hover animation */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F2FF]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </div>
                ) : (
                  <span className="relative z-10">Register Now</span>
                )}
              </button>
            </div>

          </form>
        </HudFrame>
      </main>

      <Footer />
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#080B1F] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00F2FF]"></div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
}
