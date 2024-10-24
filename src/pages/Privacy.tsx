import React from 'react';
import Layout from '../components/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Collection</h2>
              <p className="text-gray-700">
                Resume Koala collects the following information when you use our service:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-2">
                <li>Resume content (temporarily stored)</li>
                <li>Job descriptions (temporarily stored)</li>
                <li>Usage statistics</li>
                <li>Cookie preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
              <p className="text-gray-700">
                We prioritise your privacy and data security:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-2">
                <li>All uploaded resumes and job descriptions are automatically deleted after 24 hours</li>
                <li>We do not store or share your personal information with third parties</li>
                <li>Analysis results are temporary and not permanently stored</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
              <p className="text-gray-700">
                We use cookies to:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-2">
                <li>Remember your usage limits</li>
                <li>Analyse website traffic</li>
                <li>Improve our service</li>
              </ul>
              <p className="mt-4 text-gray-700">
                You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
              <p className="text-gray-700">
                We use Google Analytics to understand how our service is used. This helps us improve our website and provide a better user experience. The data collected is anonymous and includes:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-2">
                <li>Pages visited</li>
                <li>Time spent on site</li>
                <li>Browser type</li>
                <li>Geographic location (country level only)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p className="text-gray-700">
                If you have any questions about our privacy policy or how we handle your data, please contact us.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;