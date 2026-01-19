export enum TechStatus {
  AVAILABLE = 'AVAILABLE',
  ON_JOB = 'ON_JOB',
  EN_ROUTE = 'EN_ROUTE',
  OFF_DUTY = 'OFF_DUTY'
}

export interface Technician {
  id: string;
  name: string;
  avatar: string;
  status: TechStatus;
  currentLocation: string;
  eta?: string;
}

export interface RebateParams {
  heatingType: 'furnace' | 'electric' | 'oil';
  homeType: 'detached' | 'semi' | 'townhouse';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
  isAudio?: boolean;
}

export interface KnowledgeNode {
  category: string;
  title: string;
  content: string;
  tags: string[];
}