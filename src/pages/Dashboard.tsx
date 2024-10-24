import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, Settings, LogOut } from 'lucide-react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { RateLimitService } from '../services/rateLimit';

const Dashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const remainingChecks = RateLimitService.getRemainingChecks();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {currentUser?.displayName || 'User'}
                </h1>
                <p className="text-gray-600">Manage your resume checks and job applications</p>
              </div>
              <button
                onClick={() => logout()}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-6 w-6 text-indigo-600" />
                  <h2 className="text-lg font-semibold">Resume Checks</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  You have {remainingChecks} resume {remainingChecks === 1 ? 'check' : 'checks'} remaining today
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Check Resume
                </Link>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="h-6 w-6 text-indigo-600" />
                  <h2 className="text-lg font-semibold">Job Applications</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Track and manage your job applications
                </p>
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  View Applications
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="h-6 w-6 text-indigo-600" />
              <h2 className="text-lg font-semibold">Account Settings</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-600">{currentUser?.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Account Type</label>
                <p className="mt-1 text-gray-600">Free Plan</p>
              </div>

              <div className="pt-4">
                <Link
                  to="#upgrade"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Upgrade to Pro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;