import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Briefcase, Archive, ChevronDown, ChevronUp } from 'lucide-react';
import { JobApplication, JobStatus } from '../../types/job';
import { JobStorageService } from '../../services/jobStorage';
import JobCard from './JobCard';

const JobList: React.FC = () => {
  const navigate = useNavigate();
  const [showArchived, setShowArchived] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['active']);
  
  const allJobs = JobStorageService.getAllJobs();
  
  // Split jobs into active and archived
  const { activeJobs, archivedJobs } = allJobs.reduce(
    (acc, job) => {
      if (job.archived) {
        acc.archivedJobs.push(job);
      } else {
        acc.activeJobs.push(job);
      }
      return acc;
    },
    { activeJobs: [] as JobApplication[], archivedJobs: [] as JobApplication[] }
  );

  // Group active jobs by status
  const groupedActiveJobs = activeJobs.reduce((acc, job) => {
    if (!acc[job.status]) {
      acc[job.status] = [];
    }
    acc[job.status].push(job);
    return acc;
  }, {} as Record<JobStatus, JobApplication[]>);

  const statusOrder: JobStatus[] = [
    'interviewing',
    'applied',
    'offered',
    'draft',
    'accepted',
    'declined',
    'rejected'
  ];

  const getStatusLabel = (status: JobStatus): string => {
    const labels: Record<JobStatus, string> = {
      interviewing: 'Interviewing',
      applied: 'Applied',
      offered: 'Offered',
      draft: 'Drafts',
      accepted: 'Accepted',
      declined: 'Declined',
      rejected: 'Rejected'
    };
    return labels[status];
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleAddJob = () => {
    navigate('/jobs/new');
  };

  const toggleArchiveJob = (jobId: string, archive: boolean) => {
    const job = JobStorageService.getJob(jobId);
    if (job) {
      JobStorageService.saveJob({
        ...job,
        archived: archive
      });
      // Force re-render
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Job Applications</h2>
        <button
          onClick={handleAddJob}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus className="h-5 w-5" />
          Add Job
        </button>
      </div>

      {activeJobs.length === 0 && archivedJobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs yet</h3>
          <p className="text-gray-500 mb-4">Start tracking your job applications</p>
          <button
            onClick={handleAddJob}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus className="h-5 w-5" />
            Add Your First Job
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Jobs */}
          <div className="space-y-4">
            <button
              onClick={() => toggleCategory('active')}
              className="flex items-center gap-2 text-lg font-semibold text-gray-900"
            >
              {expandedCategories.includes('active') ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
              Active Applications ({activeJobs.length})
            </button>

            {expandedCategories.includes('active') && (
              <div className="space-y-8">
                {statusOrder.map(status => {
                  const jobs = groupedActiveJobs[status] || [];
                  if (jobs.length === 0) return null;

                  return (
                    <div key={status} className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {getStatusLabel(status)} ({jobs.length})
                      </h3>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.map((job) => (
                          <div key={job.id} className="relative group">
                            <JobCard job={job} />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleArchiveJob(job.id, true);
                              }}
                              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Archive job"
                            >
                              <Archive className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Archived Jobs */}
          {archivedJobs.length > 0 && (
            <div className="space-y-4">
              <button
                onClick={() => toggleCategory('archived')}
                className="flex items-center gap-2 text-lg font-semibold text-gray-900"
              >
                {expandedCategories.includes('archived') ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
                Archived ({archivedJobs.length})
              </button>

              {expandedCategories.includes('archived') && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {archivedJobs.map((job) => (
                    <div key={job.id} className="relative group">
                      <JobCard job={job} />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleArchiveJob(job.id, false);
                        }}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Unarchive job"
                      >
                        <Archive className="h-4 w-4 text-indigo-500 hover:text-indigo-700" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobList;