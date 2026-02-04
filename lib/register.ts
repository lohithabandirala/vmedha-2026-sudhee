import { db } from './firebase'
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    serverTimestamp,
    collection,
    query,
    where,
    getDocs
} from 'firebase/firestore'

export interface RegistrationData {
    fullName: string
    rollNumber: string
    college: string // "CBIT" or actual college name for Non-CBIT
    branch: string
    year: string
    email: string
    phoneNumber: string
    event: 'dsa-masters' | 'cipherville' | 'ethitech-mania' | 'all-events'
}

export interface RegistrationResult {
    success: boolean
    message: string
    error?: string
}

/**
 * Submits a registration to Firebase Firestore
 * - Checks for duplicate email/phone
 * - Creates registration document
 * - Updates counters
 */
export async function submitRegistration(data: RegistrationData): Promise<RegistrationResult> {
    try {
        // Sanitize email and create unique key (email + event)
        const sanitizedEmail = data.email.toLowerCase().trim().replace(/[.#$[\]]/g, '_')
        const docId = `${sanitizedEmail}_${data.event}`

        // References
        const regRef = doc(db, 'registrations', docId)
        const statsRef = doc(db, 'counters', 'stats')

        // 1. Check if this email + event combination already registered
        const existingReg = await getDoc(regRef)
        if (existingReg.exists()) {
            return {
                success: false,
                message: 'You have already registered for this event with this email!',
                error: 'DUPLICATE_EMAIL_EVENT'
            }
        }

        // 2. Check if phone number already used for THIS event
        const phoneQuery = query(
            collection(db, 'registrations'),
            where('phoneNumber', '==', data.phoneNumber),
            where('event', '==', data.event)
        )
        const phoneResults = await getDocs(phoneQuery)
        if (!phoneResults.empty) {
            return {
                success: false,
                message: 'This phone number is already registered for this event!',
                error: 'DUPLICATE_PHONE_EVENT'
            }
        }

        // 3. Create registration document
        await setDoc(regRef, {
            ...data,
            email: data.email.toLowerCase().trim(),
            registeredAt: serverTimestamp()
        })

        // 4. Update counters
        const isCBIT = data.college.toUpperCase() === 'CBIT'
        const collegeField = isCBIT ? 'cbitCount' : 'nonCbitCount'
        await updateDoc(statsRef, {
            totalRegistrations: increment(1),
            [collegeField]: increment(1),
            [`events.${data.event}`]: increment(1)
        })

        return {
            success: true,
            message: 'Registration successful!'
        }

    } catch (error: any) {
        console.error('Registration error:', error)
        return {
            success: false,
            message: 'Something went wrong. Please try again.',
            error: error.message || 'UNKNOWN_ERROR'
        }
    }
}
