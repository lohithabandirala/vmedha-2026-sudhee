# Firestore Schema Design for VMEDHA 2026

This schema is designed to efficiently store registration details while maintaining real-time counters for analytics (Events, Colleges, Total).

## 1. Overview
We will use two main collections:
- `registrations`: Stores the individual user data.
- `counters`: Stores the aggregated statistics (counts).

## 2. Collections

### Collection: `registrations`
Stores each participant's details.
**Document ID**: Use the **Email Address** (sanitized) or **Phone Number** as the Document ID.
*Why?* This automatically enforces the "Unique Email" constraint. If a user tries to register with the same email, the write will fail (if using `create`) or overwrite (if using `set`). To strictly prevent duplicates, check for existence first or use a transaction.

**Fields**:
```json
{
  "fullName": "string",
  "rollNumber": "string",
  "college": "CBIT" | "Non-CBIT",
  "collegeName": "string", // Optional, required if Non-CBIT
  "branch": "string",
  "year": "number", // 1, 2, 3, 4
  "email": "string", // Unique Index
  "phoneNumber": "string", // Unique Index
  "event": "dsa-masters" | "cipherville" | "ethitech-mania" | "all-events",
  "registeredAt": "timestamp",
  "paymentStatus": "pending" | "completed" // Optional for future
}
```

### Collection: `counters`
Stores the aggregated counts.
**Document ID**: `stats` (Single document to hold all counts)

**Fields**:
```json
{
  "totalRegistrations": number,
  "cbitCount": number,
  "nonCbitCount": number,
  "events": {
    "dsa-masters": number,
    "cipherville": number,
    "ethitech-mania": number,
    "all-events": number
  }
}
```

---

## 3. Implementation Logic (Transaction)

To ensure counts are accurate and email/phone are unique, perform the registration in a **Firebase Transaction**.

### Steps for `submitRegistration(data)`:

1. **Sanitize Inputs**: Lowercase email, strip spaces.
2. **References**:
   - `regRef`: `db.collection('registrations').doc(data.email)`
   - `statsRef`: `db.collection('counters').doc('stats')`
3. **Transaction**:
   - **Read**:
     - Check if `regRef` exists. If yes, **ABORT** (User already registered).
     - (Optional) Query `registrations` where `phoneNumber` == `data.phoneNumber` to check phone uniqueness. If found, **ABORT**.
     - Read `statsRef`.
   - **Write**:
     - Create `regRef` with `data`.
     - Update `statsRef`:
       - Increment `totalRegistrations` by 1.
       - Increment `cbitCount` by 1 (if college is CBIT) OR `nonCbitCount` by 1.
       - Increment `events[data.event]` by 1.

### Example Firestore Update Data
```javascript
// Inside Transaction
transaction.set(regRef, { ...formData, registeredAt: admin.firestore.FieldValue.serverTimestamp() });

transaction.update(statsRef, {
    totalRegistrations: admin.firestore.FieldValue.increment(1),
    [`events.${formData.event}`]: admin.firestore.FieldValue.increment(1),
    [formData.college === 'CBIT' ? 'cbitCount' : 'nonCbitCount']: admin.firestore.FieldValue.increment(1)
});
```

## 4. Security Rules (firestore.rules)
Ensure data integrity on the server side.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Registrations: Users can create if they don't exist
    match /registrations/{email} {
      allow create: if request.resource.data.email == email
                    && !exists(/databases/$(database)/documents/registrations/$(email));
      allow read: if false; // Admin only
    }
    
    // Counters: Public read (optional), No public write
    match /counters/stats {
      allow read: if true;
      allow write: if false; // Only updated via Admin SDK or Cloud Functions
    }
  }
}
```
*Note: For client-side counters updates to work securely without Cloud Functions, you would need complex rules validating the increment logic. It is strictly recommended to use a **Next.js API Route (Backend)** using `firebase-admin` to handle the transaction.*
