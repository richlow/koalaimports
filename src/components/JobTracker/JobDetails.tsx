import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Briefcase, Calendar, Edit2, Trash2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { JobApplication } from '../../types/job';
import { JobStorageService } from '../../services/jobStorage';
import RichTextEditor from '../RichTextEditor';
import Timeline from './Timeline';

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showJD, setShowJD] = useState(false);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const jobData = await JobStorageService.getJob(id);
      if (jobData) {
        setJob(jobData);
        setError(null);
      } else {
        setError('Job not found');
      }
    } catch (err) {
      setError('Failed to load job details');
      console.error('Error loading job:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!job || !window.confirm('Are you sure you want to delete this job application?')) {
      return;
    }

    try {
      await JobStorageService.deleteJob(job.id);
      navigate('/jobs');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/jobs')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Return to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-gray-600">{job.company}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/jobs/${id}/edit`)}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Briefcase className="h-5 w-5" />
            <span>{job.status}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-5 w-5" />
            <span>{new Date(job.dateAdded).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowJD(!showJD)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
          >
            <h2 className="text-lg font-semibold">Job Description</h2>
            {showJD ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          {showJD && (
            <div className="mt-4 prose max-w-none">
              <RichTextEditor
                value={job.description}
                readOnly={true}
                className="min-h-[200px] bg-gray-50"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Notes</h2>
          <RichTextEditor
            value={job.notes || ''}
            readOnly={true}
            className="min-h-[200px] bg-gray-50"
          />
        </div>

        <Timeline job={job} onUpdate={loadJob} />
      </div>
    </div>
  );
};

export default JobDetails;