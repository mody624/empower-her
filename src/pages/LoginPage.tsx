import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { useAuthStore } from '../store/authStore';

export function LoginPage() {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/chat" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Welcome Back
        </h2>
        <AuthForm defaultIsLogin={true} />
      </div>
    </div>
  );
}