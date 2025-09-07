import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import SocialLoginOptions from './components/SocialLoginOptions';
import CreateAccountSection from './components/CreateAccountSection';
import SecurityBadges from './components/SecurityBadges';
import Icon from '../../components/AppIcon';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Header />
      {/* Main Content */}
      <div className="pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Branding */}
              <div className="text-center lg:text-left">
                <div className="mb-8">
                  <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon name="Facebook" size={32} color="white" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-primary">
                      facebook
                    </h1>
                  </div>
                  
                  <h2 className="text-2xl lg:text-3xl font-light text-gray-700 mb-4">
                    Connect with friends and the world around you on Facebook.
                  </h2>
                  
                  <p className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
                    Facebook helps you connect and share with the people in your life.
                  </p>
                </div>

                {/* Features List */}
                <div className="hidden lg:block space-y-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Users" size={20} color="var(--color-primary)" />
                    <span className="text-gray-600">Connect with friends and family</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Share2" size={20} color="var(--color-primary)" />
                    <span className="text-gray-600">Share photos and updates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="MessageCircle" size={20} color="var(--color-primary)" />
                    <span className="text-gray-600">Send messages and chat</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Calendar" size={20} color="var(--color-primary)" />
                    <span className="text-gray-600">Discover events and groups</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="w-full">
                <div className="bg-white rounded-2xl shadow-soft-lg p-8 border border-gray-100">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      Log in to Facebook
                    </h3>
                    <p className="text-gray-600">
                      Welcome back! Please sign in to your account.
                    </p>
                  </div>

                  {/* Login Form Component */}
                  <LoginForm />

                  {/* Social Login Options Component */}
                  <SocialLoginOptions />

                  {/* Create Account Section Component */}
                  <CreateAccountSection />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Badges Component */}
        <SecurityBadges />

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><Link to="#" className="hover:text-primary transition-colors">About</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">Careers</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">Press</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">Blog</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Community</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><Link to="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">Community Standards</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">Safety</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">Support</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">Data Policy</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Connect</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><Link to="#" className="hover:text-primary transition-colors">Instagram</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">WhatsApp</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">Messenger</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">Oculus</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-2">
                    <Icon name="Facebook" size={20} color="var(--color-primary)" />
                    <span className="text-sm text-gray-600">
                      © {new Date()?.getFullYear()} Facebook Portal. All rights reserved.
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select className="text-sm text-gray-600 bg-transparent border-none focus:outline-none">
                      <option>English (US)</option>
                      <option>Español</option>
                      <option>Français</option>
                      <option>Deutsch</option>
                    </select>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Icon name="Globe" size={16} />
                      <span>United States</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;