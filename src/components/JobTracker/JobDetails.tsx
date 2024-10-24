import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Link, 
  Mail, 
  User, 
  Edit, 
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { JobStorageService } from '../../services/jobStorage';
import Timeline from './Timeline';
import EventForm from './EventForm';
import { TimelineEvent } from '../../types/job';

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEventForm, setShowEventForm] = useState(false);
  const [isJdExpanded, setIsJdExpanded] = useState(false);
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const job = id ? JobStorageService.getJob(id) : null;

  if (!job) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Job not found</p>
        <button
          onClick={() => navigate('/jobs')}
          className="mt-4 text-indigo-600 hover:text-indigo-700"
        >
          Return to Jobs List
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      JobStorageService.deleteJob(job.id);
      navigate('/jobs');
    }
  };

  const handleAddEvent = (event: TimelineEvent) => {
    const updatedJob = {
      ...job,
      timeline: [...(job.timeline || []), event],
    };
    JobStorageService.saveJob(updatedJob);
  };

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
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Jobs
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/jobs/${id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-red-700 border border-red-300 rounded-lg hover:bg-red-50 transition"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.jobTitle}</h1>
            <p className="text-lg text-gray-600">{job.companyName}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {job.location && (
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{job.location}</span>
              </div>
            )}
            {job.salary && (
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-5 w-5 mr-2" />
                <span>{job.salary}</span>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Added {new Date(job.dateAdded).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-4">
            {job.url && (
              <div className="flex items-center text-gray-600">
                <Link className="h-5 w-5 mr-2" />
                <a 
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  View Job Posting
                </a>
              </div>
            )}
            {job.contactName && (
              <div className="flex items-center text-gray-600">
                <User className="h-5 w-5 mr-2" />
                <span>{job.contactName}</span>
              </div>
            )}
            {job.contactEmail && (
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2" />
                <a 
                  href={`mailto:${job.contactEmail}`}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  {job.contactEmail}
                </a>
              </div>
            )}
          </div>
        </div>

        {job.jobDescription && (
          <div>
            <button
              onClick={() => setIsJdExpanded(!isJdExpanded)}
              className="flex items-center justify-between w-full text-left"
            >
              <h2 className="text-lg font-semibold text-gray-900">Job Description</h2>
              {isJdExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {isJdExpanded && (
              <div 
                className="mt-2 bg-gray-50 rounded-lg p-4 prose prose-sm max-w-none whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: job.jobDescription }}
              />
            )}
          </div>
        )}

        {job.notes && (
          <div>
            <button
              onClick={() => setIsNotesExpanded(!isNotesExpanded)}
              className="flex items-center justify-between w-full text-left"
            >
              <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
              {isNotesExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {isNotesExpanded && (
              <div 
                className="mt-2 bg-gray-50 rounded-lg p-4 prose prose-sm max-w-none whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: job.notes }}
              />
            )}
          </div>
        )}

        <Timeline 
          events={job.timeline || []} 
          onAddEvent={() => setShowEventForm(true)} 
        />

        {showEventForm && (
          <EventForm
            onSubmit={handleAddEvent}
            onClose={() => setShowEventForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default JobDetails;