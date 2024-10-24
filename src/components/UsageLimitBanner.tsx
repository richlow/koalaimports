import React from 'react';
import { AlertCircle, Lock } from 'lucide-react';

interface UsageLimitBannerProps {
  remainingChecks: number;
  isLimited: boolean;
}

const UsageLimitBanner: React.FC<UsageLimitBannerProps> = ({ remainingChecks, isLimited }) => {
  if (!isLimited) return null;

  return (
    <div className="bg-white border-l-4 border-yellow-400 rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-start gap-3">
        {remainingChecks > 0 ? (
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
        ) : (
          <Lock className="h-5 w-5 text-red-500 mt-0.5" />
        )}
        <div>
          <h3 className="font-semibold text-gray-900">
            {remainingChecks > 0
              ? `${remainingChecks} free ${remainingChecks === 1 ? 'check' : 'checks'} remaining today`
              : 'Daily limit reached'}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {remainingChecks > 0
              ? 'Free accounts are limited to 3 resume checks per day.'
              : 'Upgrade to our Pro plan for unlimited resume checks and advanced features.'}
          </p>
          {remainingChecks === 0 && (
            <a
              href="#upgrade"
              className="inline-block mt-3 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
            >
              Upgrade to Pro
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsageLimitBanner;