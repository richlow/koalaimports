import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Percent } from 'lucide-react';

const ResultsPanel = ({ results }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Analysis Results</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Match Score</h3>
            <div className="flex items-center gap-3">
              <div className={`text-4xl font-bold ${getScoreColor(results.matchScore)}`}>
                {results.matchScore}%
              </div>
              <Percent className="h-6 w-6 text-gray-400" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Key Findings</h3>
            <ul className="space-y-3">
              {results.findings.map((finding, index) => (
                <li key={index} className="flex items-start gap-2">
                  {finding.type === 'positive' ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-1" />
                  )}
                  <span>{finding.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Missing Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {results.missingKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Matched Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {results.matchedKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-900">Improvement Suggestions</h4>
            <ul className="mt-2 space-y-2 text-blue-800">
              {results.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;