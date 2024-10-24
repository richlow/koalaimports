import React, { useState } from 'react';
import { Link2, AlertCircle, Loader2, ClipboardCopy } from 'lucide-react';

interface JobUrlInputProps {
  onJobDescriptionParsed: (description: string) => void;
}

const JobUrlInput: React.FC<JobUrlInputProps> = ({ onJobDescriptionParsed }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDetails(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/job-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch job description');
      }

      if (data.description) {
        onJobDescriptionParsed(data.description);
        setUrl('');
      } else {
        throw new Error('No job description found');
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      if (error.message.includes('LinkedIn prevents')) {
        setDetails('Try copying the job description directly from LinkedIn instead.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1">
          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter LinkedIn job URL..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={isLoading}
            />
            <Link2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <button
          type="submit"
          disabled={!url || isLoading}
          className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2
            ${!url || isLoading 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Import'
          )}
        </button>
      </form>

      {error && (
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
          {details && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <ClipboardCopy className="h-4 w-4 flex-shrink-0" />
              <span>{details}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobUrlInput;