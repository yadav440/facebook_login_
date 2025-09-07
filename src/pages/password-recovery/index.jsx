import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import RecoveryForm from './components/RecoveryForm';
import SecurityOptions from './components/SecurityOptions';
import HelpSection from './components/HelpSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PasswordRecovery = () => {
  const [currentStep, setCurrentStep] = useState('form'); // 'form', 'options', 'help'
  const [userEmail, setUserEmail] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleMethodSelect = (method) => {
    console.log('Selected recovery method:', method);
    // Here you would typically handle the selected recovery method
    // For now, we'll just go back to the form
    setCurrentStep('form');
  };

  const handleShowOptions = (email) => {
    setUserEmail(email);
    setCurrentStep('options');
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const renderStepIndicator = () => {
    const steps = [
      { id: 'form', label: 'Recovery', icon: 'KeyRound' },
      { id: 'options', label: 'Method', icon: 'Settings' },
      { id: 'help', label: 'Help', icon: 'HelpCircle' }
    ];

    return (
      <div className="flex items-center justify-center space-x-4 mb-8">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className={`flex items-center space-x-2 ${
              currentStep === step?.id ? 'text-primary' : 'text-text-secondary'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === step?.id 
                  ? 'bg-primary text-white' :'bg-muted text-text-secondary'
              }`}>
                <Icon name={step?.icon} size={16} />
              </div>
              <span className="text-sm font-medium hidden sm:block">
                {step?.label}
              </span>
            </div>
            {index < steps?.length - 1 && (
              <div className={`w-8 h-0.5 ${
                currentStep === steps?.[index + 1]?.id ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'options':
        return (
          <SecurityOptions 
            onMethodSelect={handleMethodSelect}
            userEmail={userEmail}
          />
        );
      case 'help':
        return <HelpSection />;
      default:
        return <RecoveryForm />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Password Recovery - Facebook Portal</title>
        <meta name="description" content="Reset your Facebook account password securely. Enter your email or phone number to receive password recovery instructions." />
        <meta name="keywords" content="password recovery, reset password, facebook login, account recovery" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={40} color="var(--color-primary)" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                  Account Recovery
                </h1>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Secure password recovery for your Facebook account. We'll help you regain access quickly and safely.
                </p>
              </div>

              {!showHelp && renderStepIndicator()}
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Primary Content */}
              <div className="flex-1">
                {showHelp ? <HelpSection /> : renderContent()}
              </div>

              {/* Sidebar */}
              <div className="lg:w-80 space-y-6">
                {/* Quick Help Toggle */}
                <div className="bg-card rounded-lg shadow-soft p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-text-primary">
                      Need Help?
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleHelp}
                    >
                      {showHelp ? 'Back to Recovery' : 'View Help'}
                    </Button>
                  </div>
                  <p className="text-sm text-text-secondary mb-4">
                    Get answers to common questions about password recovery and account security.
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <Icon name="Clock" size={12} />
                    <span>Available 24/7</span>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">
                        Security Notice
                      </h4>
                      <ul className="text-sm text-text-secondary space-y-1">
                        <li>• Reset links expire after 24 hours</li>
                        <li>• Only use official Facebook emails</li>
                        <li>• Never share your reset link</li>
                        <li>• Contact support if suspicious activity</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-card rounded-lg shadow-soft p-6">
                  <h3 className="font-semibold text-text-primary mb-4">
                    Quick Links
                  </h3>
                  <div className="space-y-3">
                    <Link 
                      to="/login"
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-smooth"
                    >
                      <Icon name="LogIn" size={16} color="var(--color-text-secondary)" />
                      <span className="text-sm text-text-secondary">Back to Login</span>
                    </Link>
                    <Link 
                      to="/registration"
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-smooth"
                    >
                      <Icon name="UserPlus" size={16} color="var(--color-text-secondary)" />
                      <span className="text-sm text-text-secondary">Create New Account</span>
                    </Link>
                    <button 
                      onClick={() => setCurrentStep('options')}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-smooth w-full text-left"
                    >
                      <Icon name="Settings" size={16} color="var(--color-text-secondary)" />
                      <span className="text-sm text-text-secondary">Recovery Options</span>
                    </button>
                  </div>
                </div>

                {/* Contact Support */}
                <div className="bg-accent rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon name="Headphones" size={20} color="var(--color-primary)" />
                    <h4 className="font-medium text-text-primary">
                      Still Need Help?
                    </h4>
                  </div>
                  <p className="text-sm text-text-secondary mb-4">
                    Our support team is here to help you recover your account.
                  </p>
                  <Button variant="outline" size="sm" fullWidth>
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-muted border-t border-border py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                  <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                    <Icon name="Facebook" size={14} color="white" />
                  </div>
                  <span className="text-sm text-text-secondary">
                    © {new Date()?.getFullYear()} Facebook Portal. All rights reserved.
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <button className="hover:text-text-primary transition-smooth">
                    Privacy Policy
                  </button>
                  <button className="hover:text-text-primary transition-smooth">
                    Terms of Service
                  </button>
                  <button className="hover:text-text-primary transition-smooth">
                    Help Center
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default PasswordRecovery;