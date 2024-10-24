import React from 'react';
import { FileText, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

interface ATSAnalysisProps {
  parseResults: {
    sections: Array<{
      title: string;
      content: string;
      confidence: number;
      issues: string[];
    }>;
    overallScore: number;
    formatIssues: string[];
    structureScore: number;
    readabilityScore: number;
    recommendations: string[];
  };
}

const ATSAnalysis: React.FC<ATSAnalysisProps> = ({ parseResults }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
        <h2 className="text-xl sm:text-2xl font-bold">ATS Parsing Analysis</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Overall Score</h3>
          <div className={`text-3xl font-bold ${getScoreColor(parseResults.overallScore)}`}>
            {parseResults.overallScore}%
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Structure Score</h3>
          <div className={`text-3xl font-bold ${getScoreColor(parseResults.structureScore)}`}>
            {parseResults.structureScore}%
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Readability Score</h3>
          <div className={`text-3xl font-bold ${getScoreColor(parseResults.readabilityScore)}`}>
            {parseResults.readabilityScore}%
          </div>
        </div>
      </div>

      {parseResults.formatIssues.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <h3 className="text-base sm:text-lg font-semibold">Formatting Issues</h3>
          </div>
          <ul className="space-y-2 pl-4 sm:pl-7">
            {parseResults.formatIssues.map((issue, index) => (
              <li key={index} className="text-sm sm:text-base text-gray-700 list-disc">
                {issue.replace(/ize/g, 'ise').replace(/yze/g, 'yse')}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold">Detected Sections</h3>
        </div>
        <div className="space-y-4">
          {parseResults.sections.map((section, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold capitalize">{section.title}</h4>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  section.confidence >= 80 ? 'bg-green-100 text-green-800' :
                  section.confidence >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {section.confidence}% Confidence
                </span>
              </div>
              {section.issues.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {section.issues.map((issue, i) => (
                    <li key={i} className="text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      {issue}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-900">Recommendations</h4>
            <ul className="mt-2 space-y-2">
              {parseResults.recommendations.map((rec, index) => (
                <li key={index} className="text-blue-800">{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSAnalysis;