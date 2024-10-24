import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useFeature } from '../hooks/useFeature';
import Layout from '../components/Layout';
import JobList from '../components/JobTracker/JobList';
import JobForm from '../components/JobTracker/JobForm';
import JobDetails from '../components/JobTracker/JobDetails';

const Jobs: React.FC = () => {
  const isEnabled = useFeature('jobTrackingCRM');

  if (!isEnabled) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/new" element={<JobForm />} />
          <Route path="/:id" element={<JobDetails />} />
          <Route path="/:id/edit" element={<JobForm />} />
        </Routes>
      </div>
    </Layout>
  );
};

export default Jobs;