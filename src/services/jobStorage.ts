import { db } from '../config/firebase';
import { collection, doc, getDocs, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { JobApplication, Interview } from '../types/job';
import { auth } from '../config/firebase';

export class JobStorageService {
  private static getJobsCollection() {
    if (!auth.currentUser) throw new Error('User must be logged in');
    return collection(db, 'users', auth.currentUser.uid, 'jobs');
  }

  static async getAllJobs(): Promise<JobApplication[]> {
    try {
      const jobsCollection = this.getJobsCollection();
      const querySnapshot = await getDocs(jobsCollection);
      return querySnapshot.docs.map(doc => doc.data() as JobApplication);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  }

  static async getJob(id: string): Promise<JobApplication | null> {
    try {
      const jobsCollection = this.getJobsCollection();
      const jobDoc = doc(jobsCollection, id);
      const jobSnapshot = await getDocs(query(jobsCollection, where('id', '==', id)));
      
      if (jobSnapshot.empty) return null;
      return jobSnapshot.docs[0].data() as JobApplication;
    } catch (error) {
      console.error('Error fetching job:', error);
      return null;
    }
  }

  static async saveJob(job: JobApplication): Promise<void> {
    try {
      const jobsCollection = this.getJobsCollection();
      await setDoc(doc(jobsCollection, job.id), job);
    } catch (error) {
      console.error('Error saving job:', error);
      throw error;
    }
  }

  static async deleteJob(id: string): Promise<void> {
    try {
      const jobsCollection = this.getJobsCollection();
      await deleteDoc(doc(jobsCollection, id));
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }

  static async addInterview(jobId: string, interview: Interview): Promise<void> {
    const job = await this.getJob(jobId);
    if (job) {
      job.interviews.push(interview);
      await this.saveJob(job);
    }
  }

  static async updateInterview(jobId: string, interview: Interview): Promise<void> {
    const job = await this.getJob(jobId);
    if (job) {
      const index = job.interviews.findIndex(i => i.id === interview.id);
      if (index >= 0) {
        job.interviews[index] = interview;
        await this.saveJob(job);
      }
    }
  }

  static async deleteInterview(jobId: string, interviewId: string): Promise<void> {
    const job = await this.getJob(jobId);
    if (job) {
      job.interviews = job.interviews.filter(i => i.id !== interviewId);
      await this.saveJob(job);
    }
  }
}