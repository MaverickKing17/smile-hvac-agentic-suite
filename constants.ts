import { Technician, TechStatus, KnowledgeNode } from './types';

export const TECHNICIANS: Technician[] = [
  {
    id: 't1',
    name: 'Dimitri',
    avatar: 'https://picsum.photos/seed/dimitri/100/100',
    status: TechStatus.ON_JOB,
    currentLocation: 'Etobicoke (finish in 15m)',
    eta: '45m'
  },
  {
    id: 't2',
    name: 'Carl',
    avatar: 'https://picsum.photos/seed/carl/100/100',
    status: TechStatus.AVAILABLE,
    currentLocation: 'Vaughan HQ',
    eta: '20m'
  },
  {
    id: 't3',
    name: 'Valery',
    avatar: 'https://picsum.photos/seed/valery/100/100',
    status: TechStatus.EN_ROUTE,
    currentLocation: 'North York',
    eta: '30m'
  }
];

export const KNOWLEDGE_BASE: KnowledgeNode[] = [
  {
    category: 'Integrity',
    title: "The Rule of 5",
    content: "If the repair costs more than 50% of the unit's value, or the unit is over 15 years old, we recommend replacement. Otherwise, we repair. Honesty first.",
    tags: ['ethics', 'sales']
  },
  {
    category: 'Troubleshooting',
    title: "Furnace: Faulty Circuit Board",
    content: "Symptoms: Blower runs continuously, erratic cycling. Diagnostic: Check LED error codes. If board is charred or solder joints cracked, replace immediately.",
    tags: ['furnace', 'technical']
  },
  {
    category: 'Geography',
    title: "Local Knowledge: Etobicoke",
    content: "Older homes near the Humber River often have outdated venting systems. Check for clay flue liners before high-efficiency installs.",
    tags: ['location', 'installation']
  }
];

export const ROI_DATA = [
  { metric: "Weekly 'No-Heat' Capture", current: 12, projected: 15, value: "$1,800/wk" },
  { metric: "Rebate Lead Qual.", current: "15%", projected: "45%", value: "$12,400/mo" },
  { metric: "After-Hours Response", current: "Voicemail", projected: "Instant AI", value: "$5,000/mo" },
];