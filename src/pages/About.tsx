import React from 'react';
import { Briefcase, Shield, Clock, CheckCircle2, ArrowRight, Upload } from 'lucide-react';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Resume Koala</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">What is Resume Koala?</h2>
            <p className="text-gray-700 mb-6">
              Resume Koala is your intelligent companion in the job search journey. We provide cutting-edge tools to help you optimise your resume for Applicant Tracking Systems (ATS) and increase your chances of landing interviews.
            </p>
            <p className="text-gray-700 mb-6">
              In today's competitive job market, it's crucial to ensure your resume not only impresses human recruiters but also successfully passes through ATS systems. Many qualified candidates are filtered out simply because their resumes aren't optimised for these systems. Resume Koala helps bridge this gap by providing intelligent analysis and actionable recommendations.
            </p>

            <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Upload className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">1. Upload Your Resume</h3>
                  <p className="text-gray-600">Simply upload your resume and paste the job description you're interested in.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Briefcase className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">2. Instant Analysis</h3>
                  <p className="text-gray-600">Our system analyses your resume against ATS requirements and the job description.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">3. Get Recommendations</h3>
                  <p className="text-gray-600">Receive detailed feedback and actionable suggestions to improve your resume.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Our Commitment</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Privacy First</h3>
                <p className="text-gray-600 text-sm">Your data is automatically purged after 24 hours.</p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Fast Results</h3>
                <p className="text-gray-600 text-sm">Get instant feedback on your resume.</p>
              </div>
              <div className="text-center">
                <ArrowRight className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Continuous Updates</h3>
                <p className="text-gray-600 text-sm">We regularly update our analysis engine.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;