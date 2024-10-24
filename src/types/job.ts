import { InterviewStage, JobStatus } from './jobStatus';

export interface TimelineEvent {
  id: string;
  type: 'note' | 'email' | 'call' | 'interview' | 'application' | 'offer' | 'other';
  date: string;
  title: string;
  description?: string;
  outcome?: string;
}

export interface JobApplication {
  id: string;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  status: JobStatus;
  dateAdded: string;
  dateApplied?: string;
  location: string;
  salary?: string;
  resumeVersion?: string;
  coverLetter?: string;
  notes?: string;
  interviews: Interview[];
  timeline: TimelineEvent[];
  url?: string;
  contactName?: string;
  contactEmail?: string;
  followUpDate?: string;
  archived?: boolean;
}

export interface Interview {
  id: string;
  stage: InterviewStage;
  date: string;
  notes?: string;
  completed: boolean;
  feedback?: string;
}