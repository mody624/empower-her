import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Users, Award, Sparkles, ArrowRight } from 'lucide-react';

const heroImages = [
  'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1591338459467-bd1019af7b1d?auto=format&fit=crop&q=80&w=2000',
];

export function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section with Dynamic Background */}
      <div className="relative h-screen">
        <div className="absolute inset-0 transition-opacity duration-1000">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
          >
            <div className="absolute inset-0 bg-purple-900/40 backdrop-blur-sm" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <div className="text-center">
            <div className="animate-float inline-flex items-center justify-center p-4 mb-8 rounded-full bg-white/10 backdrop-blur-md">
              <Sparkles size={32} className="text-purple-200" />
            </div>
            <h1 className="animate-fade-in text-5xl font-bold text-white mb-6 lg:text-6xl">
              Empower Her: Your Personal
              <span className="text-purple-200"> Health Journey</span>
            </h1>
            <p className="animate-fade-in-delay-1 text-xl text-purple-50 max-w-3xl mx-auto mb-12">
              Join thousands of women on their journey to better health. Get personalized support, expert guidance, and a community that understands you.
            </p>

            <div className="flex justify-center space-x-4 mb-16">
              <Link
                to="/signup"
                className="px-8 py-3 text-purple-900 bg-purple-100 rounded-lg hover:bg-white transition-colors flex items-center space-x-2"
              >
                <span>Start Your Journey</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 text-purple-100 border-2 border-purple-100 rounded-lg hover:bg-purple-100 hover:text-purple-900 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Empower Her?</h2>
            <p className="mt-4 text-xl text-gray-600">Your wellness journey, supported by cutting-edge AI and expert knowledge</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors">
                <Heart className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalized Care</h3>
              <p className="text-gray-600">AI-powered insights tailored to your unique health journey</p>
            </div>
            <div className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors">
                <Shield className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Private & Secure</h3>
              <p className="text-gray-600">Your data is protected with enterprise-grade security</p>
            </div>
            <div className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors">
                <Users className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600">Connect with women who understand your journey</p>
            </div>
            <div className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors">
                <Award className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Guidance</h3>
              <p className="text-gray-600">Access to evidence-based health information</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-purple-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Empower Her</h2>
              <p className="text-lg text-gray-600 mb-6">
                Empower Her is more than just a health assistant - it's your personal companion on the journey to better health and wellness. We combine advanced AI technology with expert medical knowledge to provide you with accurate, personalized guidance whenever you need it.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our mission is to make quality health information accessible to every woman, empowering you to make informed decisions about your health with confidence and peace of mind.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-gray-600">Support Available</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                  <div className="text-gray-600">Private & Secure</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1000"
                alt="Women supporting each other"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-purple-600 text-white p-6 rounded-lg shadow-lg">
                <p className="text-lg font-semibold">Join thousands of women who trust Empower Her</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Private</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">AI</div>
              <div className="text-gray-600">Powered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">Safe</div>
              <div className="text-gray-600">& Secure</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}