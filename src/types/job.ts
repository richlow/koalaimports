export interface JobNote {
  id: string;
  content: string;
  createdAt: string;
}

export interface JobEvent {
  id: string;
  type: 'interview' | 'application' | 'offer' | 'rejection' | 'follow-up' | 'other';
  title: string;
  description?: string;
  date: string;
  createdAt: string;
}

export interface Job {
  id: string;
  userId: string;
  company: string;
  position: string;
  location: string;
  jobDescription: string;
  status: 'active' | 'archived' | 'rejected' | 'accepted';
  applicationDate?: string;
  salary?: string;
  url?: string;
  notes: JobNote[];
  events: JobEvent[];
  createdAt: string;
  updatedAt?: string;
}