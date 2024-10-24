import React, { useState } from 'react';
import { FileText, Briefcase, Zap, Upload, RotateCcw } from 'lucide-react';
import Layout from '../components/Layout';
import ResultsPanel from '../components/ResultsPanel';
import ATSAnalysis from '../components/ATSAnalysis';
import FileUpload from '../components/FileUpload';
import JobUrlInput from '../components/JobUrlInput';
import UsageLimitBanner from '../components/UsageLimitBanner';
import { analyzeText } from '../utils/textAnalysis';
import { simulateATSParsing } from '../utils/atsParser';
import { RateLimitService } from '../services/rateLimit';
import { fireConfetti } from '../utils/confetti';

const Home: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState(null);
  const [atsResults, setAtsResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const remainingChecks = RateLimitService.getRemainingChecks();
  const canUseService = RateLimitService.canUseService();

  const handleAnalyze = () => {
    if (!canUseService) return;
    
    setIsAnalyzing(true);
    RateLimitService.incrementUsage();

    setTimeout(() => {
      const analysisResults = analyzeText(resumeText, jobDescription);
      const atsParseResults = simulateATSParsing(resumeText);
      setResults(analysisResults);
      setAtsResults(atsParseResults);
      setIsAnalyzing(false);
      fireConfetti();
    }, 1500);
  };

  const handleReset = () => {
    setResumeText('');
    setJobDescription('');
    setResults(null);
    setAtsResults(null);
    setIsAnalyzing(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Optimise Your Resume for ATS
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Maximise your chances of getting past Applicant Tracking Systems (ATS) and landing your dream job.
            </p>
            <p className="text-gray-700">
              In today's competitive job market, up to 75% of resumes are rejected by ATS before reaching human recruiters. 
              Our tool helps you optimise your resume to ensure it gets through these systems and into the hands of hiring managers.
            </p>
          </div>

          <UsageLimitBanner remainingChecks={remainingChecks} isLimited={true} />

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="text-indigo-600" />
                <h2 className="text-xl font-semibold">Resume</h2>
              </div>
              <FileUpload onTextExtracted={setResumeText} />
              <textarea
                className="w-full h-64 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Paste your resume text here or upload a file above..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="text-indigo-600" />
                <h2 className="text-xl font-semibold">Job Description</h2>
              </div>
              <JobUrlInput onJobDescriptionParsed={setJobDescription} />
              <textarea
                className="w-full h-64 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Paste the job description here or enter a LinkedIn job URL above..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={handleAnalyze}
              disabled={!resumeText || !jobDescription || isAnalyzing || !canUseService}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg text-white font-semibold transition
                ${isAnalyzing || !resumeText || !jobDescription || !canUseService
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {isAnalyzing ? (
                <>
                  <Upload className="animate-spin" />
                  Analysing...
                </>
              ) : (
                <>
                  <Zap />
                  Analyse Resume
                </>
              )}
            </button>

            {(resumeText || jobDescription || results) && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-8 py-3 rounded-lg text-gray-700 font-semibold transition
                  border-2 border-gray-300 hover:bg-gray-50"
              >
                <RotateCcw className="h-5 w-5" />
                Reset
              </button>
            )}
          </div>

          {atsResults && <ATSAnalysis parseResults={atsResults} />}
          {results && <ResultsPanel results={results} />}
        </div>
      </div>
    </Layout>
  );
};

export default Home;