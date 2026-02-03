import { EventType } from './types';

export const COLORS = {
  deepSpaceBlack: '#050505',
  midnightBlue: '#0B1120',
  neonCyan: '#0891B2',
  electricCyan: '#00F2FF',
  softWhite: '#E5E7EB',
  mutedGray: '#9CA3AF',
};

export const TARGET_DATE = new Date('2026-02-16T12:00:00+05:30');

export const EVENTS = [
  {
    id: EventType.CIPHERVILLE,
    title: 'CIPHERVILLE',
    description: 'Two-round mystery hunt. Round 1 features a scavenger hunt with posters and digital clues. Round 2 dives into SQL-based database investigations. Focus: Logical thinking, investigation, analysis.',
    icon: '🔍',
  },
  {
    id: EventType.ETHI_TECH_MANIA,
    title: 'ETHI TECH MANIA',
    description: 'Test your aptitude and logical reasoning alongside ethical decision-making in tech. Cover core Computer Science fundamentals. Focus: Thinking ability and ethics.',
    icon: '⚖️',
  },
  {
    id: EventType.CBIT_DSA_MASTER,
    title: 'CBIT DSA MASTER',
    description: 'A competitive Data Structures & Algorithms event where efficient solutions visually grow a digital ecosystem. Focus: Optimization and algorithmic thinking.',
    icon: '🌱',
  },
];
