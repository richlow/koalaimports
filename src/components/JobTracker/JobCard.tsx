import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Clock, Archive as ArchiveIcon } from 'lucide-react';
import { JobApplication } from '../../types/job';

interface JobCardProps {
  job: JobApplication;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      applied: 'bg-blue-100 text-blue-800',
      interviewing: 'bg-yellow-100 text-yellow-800',
      offered: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      accepted: 'bg-emerald-100 text-emerald-800',
      declined: 'bg-orange-100 text-orange-800'
    };
    return colors[status] || colors.draft;
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer
        ${job.archived ? 'opacity-75' : ''}`}
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.jobTitle}</h3>
            <p className="text-gray-600">{job.companyName}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {job.archived && (
              <ArchiveIcon className="h-4 w-4 text-gray-400" />
            )}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {job.location && (
            <div className="flex items-center text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">{job.location}</span>
            </div>
          )}
          
          {job.salary && (
            <div className="flex items-center text-gray-500">
              <DollarSign className="h-4 w-4 mr-2" />
              <span className="text-sm">{job.salary}</span>
            </div>
          )}
          
          <div className="flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">
              Added {new Date(job.dateAdded).toLocaleDateString()}
            </span>
          </div>

          {job.interviews.length > 0 && (
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">
                {job.interviews.length} interview{job.interviews.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;