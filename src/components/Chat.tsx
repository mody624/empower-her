import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';
import { generateResponse } from '../services/gemini';
import { MessageSquare, Send, Trash2 } from 'lucide-react';

export function Chat() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { messagesByUser, addMessage, clearMessages } = useChatStore();
  const { user } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = user ? (messagesByUser[user.id] || []) : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !user) return;

    const userMessage = input.trim();
    setInput('');
    addMessage(userMessage, 'user');
    setIsLoading(true);

    try {
      const response = await generateResponse(userMessage);
      if (response) {
        addMessage(response, 'assistant');
      } else {
        addMessage('I apologize, but I was unable to generate a response. Please try again.', 'assistant');
      }
    } catch (error) {
      console.error('Chat error:', error);
      addMessage(
        'I apologize, but I encountered an error processing your request. Please try again or rephrase your question.',
        'assistant'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear your chat history?')) {
      clearMessages();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Your Chat History</h2>
        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="text-gray-600 hover:text-red-600 transition-colors"
            title="Clear chat history"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-purple-400" />
            <p className="text-lg font-medium">Welcome to Your Health Assistant</p>
            <p className="mt-2">Hi {user.name}, ask me anything about women's health, wellness, or medical concerns.</p>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                message.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-4 rounded-lg bg-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}