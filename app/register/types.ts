export enum EventType {
  CIPHERVILLE = 'CIPHERVILLE',
  ETHI_TECH_MANIA = 'ETHI_TECH_MANIA',
  CBIT_DSA_MASTER = 'CBIT_DSA_MASTER',
}

export interface RegistrationData {
  fullName: string;
  rollNumber: string;
  collegeName: string;
  branch: string;
  section: string;
  email: string;
  phoneNumber: string;
  event: EventType;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
