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
    getDocs,
    writeBatch
} from 'firebase/firestore'

export interface RegistrationData {
    fullName: string
    rollNumber: string
    college: string
    branch: string
    year: string
    email: string
    phoneNumber: string
    event: 'dsa-master' | 'cipherville' | 'ethitech-mania' | 'all-events'
}

export interface RegistrationResult {
    success: boolean
    message: string
    error?: string
}

type DuplicateStatus = 'NONE' | 'SELF_EXISTS' | 'CONFLICT'

/**
 * Checks duplication status:
 * - NONE: Safe to register
 * - SELF_EXISTS: User already registered (Skip)
 * - CONFLICT: Phone number used by someone else (Error)
 */
async function checkDuplicateStatus(
    collectionName: string,
    email: string,
    phoneNumber: string,
    sanitizedEmail: string
): Promise<{ status: DuplicateStatus; message?: string }> {
    // 1. Check Email (ID based) - Self Check
    const docRef = doc(db, collectionName, sanitizedEmail)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return { status: 'SELF_EXISTS' }
    }

    // 2. Check Phone Number (Query based) - Conflict Check
    const phoneQuery = query(
        collection(db, collectionName),
        where('phoneNumber', '==', phoneNumber)
    )
    const phoneSnap = await getDocs(phoneQuery)

    if (!phoneSnap.empty) {
        // If phone exists, ensure it's not the same person (edge case where email diff, phone same)
        // Since we checked email above and it didn't exist, this implies a different email has this phone.
        return {
            status: 'CONFLICT',
            message: `Phone number ${phoneNumber} is already associated with another registration.`
        }
    }

    return { status: 'NONE' }
}

function formatEventName(id: string): string {
    const names: Record<string, string> = {
        'dsa-master': 'DSA MASTER',
        'cipherville': 'Cipherville',
        'ethitech-mania': 'Ethitech Mania'
    }
    return names[id] || id
}

export async function submitRegistration(data: RegistrationData): Promise<RegistrationResult> {
    try {
        const sanitizedEmail = data.email.toLowerCase().trim().replace(/[.#$[\]]/g, '_')

        let targetCollections: string[] = []

        if (data.event === 'all-events') {
            targetCollections = ['dsa-master', 'cipherville', 'ethitech-mania']
        } else {
            targetCollections = [data.event]
        }

        const collectionsToWrite: string[] = []

        // 1. Smart Deduplication Check
        for (const col of targetCollections) {
            const check = await checkDuplicateStatus(col, data.email, data.phoneNumber, sanitizedEmail)

            if (check.status === 'CONFLICT') {
                return {
                    success: false,
                    message: check.message || 'Duplicate entry found.',
                    error: 'DUPLICATE_ENTRY'
                }
            } else if (check.status === 'NONE') {
                collectionsToWrite.push(col)
            }
            // If SELF_EXISTS, acts as a "Skip", effectively preventing redundant data
        }

        if (collectionsToWrite.length === 0) {
            return {
                success: false,
                message: 'You are already registered for the selected event(s).',
                error: 'ALREADY_REGISTERED'
            }
        }

        // 2. Register in NEW collections only
        const batch = writeBatch(db)

        collectionsToWrite.forEach(col => {
            const docRef = doc(db, col, sanitizedEmail)
            const eventData = {
                ...data,
                email: data.email.toLowerCase().trim(),
                registeredAt: serverTimestamp(),
                registrationSource: data.event // Track if they came via combo or direct
            }
            batch.set(docRef, eventData)
        })

        // 3. Update Counters & Unique Tracking
        const statsRef = doc(db, 'counters', 'stats')
        const participantRef = doc(db, 'participants', sanitizedEmail)

        // Check if this human exists globally
        const participantSnap = await getDoc(participantRef)
        const isNewUser = !participantSnap.exists()

        const isCBIT = data.college.toUpperCase() === 'CBIT' || data.college.trim() === ''
        const collegeField = isCBIT ? 'cbitCount' : 'nonCbitCount'
        const uniqueCollegeField = isCBIT ? 'uniqueCbitCount' : 'uniqueNonCbitCount'

        // Base increments (Transaction counts - always increase)
        const increments: any = {
            totalRegistrations: increment(1), // Forms submitted
            [collegeField]: increment(1)
        }

        // Unique increments (Only if new human)
        if (isNewUser) {
            increments.uniqueRegistrations = increment(1)
            increments[uniqueCollegeField] = increment(1)

            // Add to participants collection to mark as "seen"
            batch.set(participantRef, {
                email: data.email,
                isCBIT: isCBIT,
                college: data.college,
                firstRegisteredAt: serverTimestamp()
            })
        }

        // Only increment events that we ACTUALLY wrote to
        collectionsToWrite.forEach(col => {
            increments[`events.${col}`] = increment(1)
        })

        batch.update(statsRef, increments)

        await batch.commit()

        return {
            success: true,
            message: collectionsToWrite.length < targetCollections.length
                ? 'Registration updated! You are now registered for all selected events.'
                : 'Registration successful!'
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
