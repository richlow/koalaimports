import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Archive, Briefcase, ChevronDown, ChevronRight, Loader2 } from 'lucide-react';
import { Job } from '../../types/job';
import { getJobs } from '../../services/jobService';
import { useAuth } from '../../contexts/AuthContext';
import JobCard from './JobCard';

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Active']));
  const { currentUser } = useAuth();

  useEffect(() => {
    loadJobs();
  }, [currentUser]);

  const loadJobs = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      const fetchedJobs = await getJobs(currentUser.uid);
      setJobs(fetchedJobs);
      setError(null);
    } catch (err) {
      console.error('Error loading jobs:', err);
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const categorizeJobs = () => {
    const activeJobs = jobs.filter(job => !job.archived);
    const archivedJobs = jobs.filter(job => job.archived);

    const groupedActive = activeJobs.reduce((acc, job) => {
      const status = job.status || 'Other';
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(job);
      return acc;
    }, {} as Record<string, Job[]>);

    return {
      active: Object.entries(groupedActive).sort(([a], [b]) => a.localeCompare(b)),
      archived: archivedJobs
    };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-600">Loading your job applications...</p>
      </div>
    );
  }

  const { active, archived } = categorizeJobs();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
        <Link
          to="/jobs/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus className="h-5 w-5" />
          Add New Job
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Active Jobs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <button
            onClick={() => toggleCategory('Active')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-indigo-600" />
              <span className="font-semibold">Active Applications</span>
              <span className="text-sm text-gray-500">
                ({active.reduce((sum, [_, jobs]) => sum + jobs.length, 0)})
              </span>
            </div>
            {expandedCategories.has('Active') ? (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {expandedCategories.has('Active') && (
            <div className="p-4">
              {active.map(([status, statusJobs]) => (
                <div key={status} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-semibold mb-3">{status}</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {statusJobs.map(job => (
                      <JobCard key={job.id} job={job} onUpdate={loadJobs} />
                    ))}
                  </div>
                </div>
              ))}
              {active.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No active job applications. Click "Add New Job" to get started!
                </p>
              )}
            </div>
          )}
        </div>

        {/* Archived Jobs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <button
            onClick={() => toggleCategory('Archived')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-2">
              <Archive className="h-5 w-5 text-gray-600" />
              <span className="font-semibold">Archived Applications</span>
              <span className="text-sm text-gray-500">({archived.length})</span>
            </div>
            {expandedCategories.has('Archived') ? (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {expandedCategories.has('Archived') && (
            <div className="p-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {archived.map(job => (
                  <JobCard key={job.id} job={job} onUpdate={loadJobs} />
                ))}
              </div>
              {archived.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No archived applications
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobList;