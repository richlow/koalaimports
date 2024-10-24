import { JobApplication, Interview } from '../types/job';

const STORAGE_KEY = 'resume_koala_jobs';

export class JobStorageService {
  static getAllJobs(): JobApplication[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static getJob(id: string): JobApplication | null {
    const jobs = this.getAllJobs();
    return jobs.find(job => job.id === id) || null;
  }

  static saveJob(job: JobApplication): void {
    const jobs = this.getAllJobs();
    const existingIndex = jobs.findIndex(j => j.id === job.id);
    
    if (existingIndex >= 0) {
      jobs[existingIndex] = job;
    } else {
      jobs.push(job);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }

  static deleteJob(id: string): void {
    const jobs = this.getAllJobs();
    const filtered = jobs.filter(job => job.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }

  static addInterview(jobId: string, interview: Interview): void {
    const job = this.getJob(jobId);
    if (job) {
      job.interviews.push(interview);
      this.saveJob(job);
    }
  }

  static updateInterview(jobId: string, interview: Interview): void {
    const job = this.getJob(jobId);
    if (job) {
      const index = job.interviews.findIndex(i => i.id === interview.id);
      if (index >= 0) {
        job.interviews[index] = interview;
        this.saveJob(job);
      }
    }
  }

  static deleteInterview(jobId: string, interviewId: string): void {
    const job = this.getJob(jobId);
    if (job) {
      job.interviews = job.interviews.filter(i => i.id !== interviewId);
      this.saveJob(job);
    }
  }
}