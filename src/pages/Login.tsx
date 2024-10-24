import React from 'react';
import Layout from '../components/Layout';
import LoginForm from '../components/Auth/LoginForm';

const Login: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;