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
  event: 'dsa-masters' | 'cipherville' | 'ethitech-mania' | 'all-events' | ''
}

const EVENTS = [
  { id: 'dsa-masters', name: 'DSA Masters CBIT' },
  { id: 'cipherville', name: 'Cipherville' },
  { id: 'ethitech-mania', name: 'Ethitech Mania' },
  { id: 'all-events', name: 'All 3 Events (Combo)' }
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
    event: ''
  })

  useEffect(() => {
    const eventParam = searchParams.get('event')
    if (eventParam && EVENTS.some(e => e.id === eventParam)) {
      setFormData(prev => ({ ...prev, event: eventParam as any }))
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
    if (!formData.event) newErrors.event = 'Please select an event'

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
        event: formData.event as any
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
    return (
      <div className="min-h-screen bg-[#080B1F] text-[#E6E9FF] font-sans selection:bg-[#00F2FF]/30 selection:text-[#00F2FF]">
        <Navigation />
        <div className="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center">
          <HudFrame className="max-w-md w-full text-center py-12" glowing>
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-[#00F2FF]/20 flex items-center justify-center border border-[#00F2FF]">
                <svg className="w-8 h-8 text-[#00F2FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-display font-bold text-[#FFFFFF] mb-2">Thank You for Registration!</h2>
            <p className="text-[#7D7DBE] mb-8">Your registration has been successfully submitted.</p>
            <HudButton href="/" variant="primary">Back to Home</HudButton>
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
                />
                {errors.college && <p className="text-red-400 text-xs mt-1">{errors.college}</p>}
              </div>
            )}

            {/* Branch */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#00F2FF] uppercase tracking-wider">Branch</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="e.g. CSE, IT, ECE..."
                className="w-full bg-[#080B1F]/50 border border-[#3A3F7A] rounded px-4 py-3 text-[#E6E9FF] focus:border-[#00F2FF] focus:outline-none focus:ring-1 focus:ring-[#00F2FF] transition-all placeholder:text-[#7D7DBE]/50"
              />
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
                />
                {errors.phoneNumber && <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>
            </div>

            {/* Event Selection */}
            <div className="space-y-4 pt-4 border-t border-[#3A3F7A]/30">
              <label className="text-sm font-medium text-[#00F2FF] uppercase tracking-wider block mb-2">Select Event to Register</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EVENTS.map((evt) => (
                  <label
                    key={evt.id}
                    className={`
                                relative p-4 rounded-lg border cursor-pointer transition-all duration-300
                                ${formData.event === evt.id
                        ? 'bg-[#00F2FF]/10 border-[#00F2FF] shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                        : 'bg-[#080B1F]/30 border-[#3A3F7A] hover:border-[#00F2FF]/50 hover:bg-[#00F2FF]/5'
                      }
                            `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.event === evt.id ? 'border-[#00F2FF]' : 'border-[#7D7DBE]'}`}>
                        {formData.event === evt.id && <div className="w-2 h-2 rounded-full bg-[#00F2FF]" />}
                      </div>
                    </div>
                    <span className={`block font-display font-bold ${formData.event === evt.id ? 'text-[#FFFFFF]' : 'text-[#E6E9FF]'}`}>
                      {evt.name}
                    </span>
                    <input
                      type="radio"
                      name="event"
                      value={evt.id}
                      checked={formData.event === evt.id}
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                ))}
              </div>
              {errors.event && <p className="text-red-400 text-xs mt-1">{errors.event}</p>}
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
                  background: 'rgba(0, 242, 255, 0.1)',
                  border: '1px solid #00F2FF',
                  color: '#00F2FF'
                }}
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
