import React from 'react';
import { Navigate } from 'react-router-dom';
import { Chat } from '../components/Chat';
import { useAuthStore } from '../store/authStore';

export function ChatPage() {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-12rem)]">
        <Chat />
      </div>
    </div>
  );
}