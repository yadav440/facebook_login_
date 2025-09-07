import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityOptions = ({ onMethodSelect, userEmail }) => {
  const [selectedMethod, setSelectedMethod] = useState('email');

  const recoveryMethods = [
    {
      id: 'email',
      title: 'Email Recovery',
      description: `Send reset link to ${userEmail || 'your email address'}`,
      icon: 'Mail',
      available: true,
      estimatedTime: '2-5 minutes'
    },
    {
      id: 'sms',
      title: 'SMS Recovery',
      description: 'Send verification code to your phone',
      icon: 'MessageSquare',
      available: true,
      estimatedTime: '1-2 minutes'
    },
    {
      id: 'security',
      title: 'Security Questions',
      description: 'Answer your security questions',
      icon: 'HelpCircle',
      available: false,
      estimatedTime: 'Immediate'
    },
    {
      id: 'backup',
      title: 'Backup Codes',
      description: 'Use your saved backup codes',
      icon: 'Key',
      available: false,
      estimatedTime: 'Immediate'
    }
  ];

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
  };

  const handleContinue = () => {
    onMethodSelect(selectedMethod);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-soft-lg p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={32} color="var(--color-warning)" />
        </div>
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          Choose Recovery Method
        </h2>
        <p className="text-text-secondary">
          Select how you'd like to recover your account access.
        </p>
      </div>
      <div className="space-y-3 mb-8">
        {recoveryMethods?.map((method) => (
          <div
            key={method?.id}
            className={`relative border rounded-lg p-4 cursor-pointer transition-smooth ${
              method?.available
                ? selectedMethod === method?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50' :'border-border bg-muted/30 cursor-not-allowed opacity-60'
            }`}
            onClick={() => method?.available && handleMethodSelect(method?.id)}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                method?.available
                  ? selectedMethod === method?.id
                    ? 'bg-primary text-white' :'bg-muted' :'bg-muted/50'
              }`}>
                <Icon 
                  name={method?.icon} 
                  size={20} 
                  color={
                    method?.available
                      ? selectedMethod === method?.id
                        ? 'white' :'var(--color-text-secondary)' :'var(--color-text-secondary)'
                  }
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-medium ${
                    method?.available ? 'text-text-primary' : 'text-text-secondary'
                  }`}>
                    {method?.title}
                  </h3>
                  {!method?.available && (
                    <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
                      Unavailable
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary mb-2">
                  {method?.description}
                </p>
                <div className="flex items-center space-x-2 text-xs text-text-secondary">
                  <Icon name="Clock" size={12} />
                  <span>Est. {method?.estimatedTime}</span>
                </div>
              </div>

              {method?.available && (
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === method?.id
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {selectedMethod === method?.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <Button
          variant="default"
          fullWidth
          onClick={handleContinue}
          disabled={!recoveryMethods?.find(m => m?.id === selectedMethod)?.available}
        >
          Continue with {recoveryMethods?.find(m => m?.id === selectedMethod)?.title}
        </Button>

        <div className="text-center">
          <p className="text-xs text-text-secondary mb-2">
            Can't access any of these options?
          </p>
          <Button variant="ghost" size="sm">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecurityOptions;