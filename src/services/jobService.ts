import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  getDoc,
  limit,
  startAfter,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { Job } from '../types/job';

const JOBS_PER_PAGE = 20;

export const saveJob = async (userId: string, jobData: Omit<Job, 'id' | 'userId' | 'createdAt'>) => {
  try {
    const jobsRef = collection(db, 'jobs');
    const newJob = {
      ...jobData,
      userId,
      createdAt: new Date().toISOString(),
      status: jobData.status || 'active',
      notes: jobData.notes || [],
      events: jobData.events || []
    };

    const docRef = await addDoc(jobsRef, newJob);
    return {
      id: docRef.id,
      ...newJob
    };
  } catch (error) {
    console.error('Error saving job:', error);
    throw new Error('Failed to save job');
  }
};

export const updateJob = async (jobId: string, jobData: Partial<Job>) => {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    await updateDoc(jobRef, {
      ...jobData,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error updating job:', error);
    throw new Error('Failed to update job');
  }
};

export const deleteJob = async (jobId: string) => {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    await deleteDoc(jobRef);
    return true;
  } catch (error) {
    console.error('Error deleting job:', error);
    throw new Error('Failed to delete job');
  }
};

export const getJobs = async (userId: string) => {
  try {
    const jobsRef = collection(db, 'jobs');
    const q = query(
      jobsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(JOBS_PER_PAGE)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Job[];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Failed to fetch jobs');
  }
};

export const getMoreJobs = async (
  userId: string, 
  lastDoc: QueryDocumentSnapshot
) => {
  try {
    const jobsRef = collection(db, 'jobs');
    const q = query(
      jobsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      startAfter(lastDoc),
      limit(JOBS_PER_PAGE)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Job[];
  } catch (error) {
    console.error('Error fetching more jobs:', error);
    throw new Error('Failed to fetch more jobs');
  }
};

export const getJob = async (jobId: string) => {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    const jobDoc = await getDoc(jobRef);
    if (!jobDoc.exists()) {
      throw new Error('Job not found');
    }
    return {
      id: jobDoc.id,
      ...jobDoc.data()
    } as Job;
  } catch (error) {
    console.error('Error fetching job:', error);
    throw new Error('Failed to fetch job');
  }
};