import React from 'react';
import Layout from '../components/Layout';
import ResetPasswordForm from '../components/Auth/ResetPassword';

const ResetPassword: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <ResetPasswordForm />
      </div>
    </Layout>
  );
};

export default ResetPassword;