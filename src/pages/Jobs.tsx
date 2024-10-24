import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import JobList from '../components/JobTracker/JobList';
import JobForm from '../components/JobTracker/JobForm';
import JobDetails from '../components/JobTracker/JobDetails';
import AuthPrompt from '../components/Auth/AuthPrompt';

const Jobs: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {currentUser ? (
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/new" element={<JobForm />} />
            <Route path="/:id" element={<JobDetails />} />
            <Route path="/:id/edit" element={<JobForm />} />
          </Routes>
        ) : (
          <AuthPrompt />
        )}
      </div>
    </Layout>
  );
};

export default Jobs;