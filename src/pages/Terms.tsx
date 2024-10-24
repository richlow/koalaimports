import React from 'react';
import Layout from '../components/Layout';

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Terms</h2>
              <p className="text-gray-700">
                By accessing Resume Koala, you agree to be bound by these terms of service and agree that you are responsible for compliance with any applicable local laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p className="text-gray-700">
                Permission is granted to temporarily use Resume Koala for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Service Usage</h2>
              <p className="text-gray-700">
                Free accounts are limited to 3 resume checks per day. Your uploaded documents and job descriptions are automatically deleted after 24 hours.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Disclaimer</h2>
              <p className="text-gray-700">
                The materials on Resume Koala are provided on an 'as is' basis. Resume Koala makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Limitations</h2>
              <p className="text-gray-700">
                In no event shall Resume Koala or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Resume Koala.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Accuracy of Materials</h2>
              <p className="text-gray-700">
                The materials appearing on Resume Koala could include technical, typographical, or photographic errors. Resume Koala does not warrant that any of the materials on its website are accurate, complete, or current.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;