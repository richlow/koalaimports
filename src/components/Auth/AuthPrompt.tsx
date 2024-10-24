import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, UserPlus, LogIn } from 'lucide-react';

const AuthPrompt: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-3 rounded-full">
            <Briefcase className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Track Your Job Applications
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Keep track of all your job applications in one place. Monitor application statuses, 
          interview schedules, and follow-ups with our comprehensive job tracking system.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <UserPlus className="h-5 w-5" />
            Sign Up Free
          </Link>
          
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            <LogIn className="h-5 w-5" />
            Sign In
          </Link>
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Track Applications</h3>
            <p className="text-sm text-gray-600">
              Keep all your job applications organised in one place
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Monitor Progress</h3>
            <p className="text-sm text-gray-600">
              Track interview stages and application statuses
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Never Miss Follow-ups</h3>
            <p className="text-sm text-gray-600">
              Set reminders for interviews and follow-up actions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPrompt;