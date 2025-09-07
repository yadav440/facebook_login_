import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLoginOptions = () => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      name: 'Apple',
      icon: 'Apple',
      color: 'bg-black hover:bg-gray-800',
      textColor: 'text-white'
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'bg-blue-400 hover:bg-blue-500',
      textColor: 'text-white'
    }
  ];

  const handleSocialLogin = (provider) => {
    // Mock social login - in real app would redirect to OAuth provider
    console.log(`Initiating ${provider} login...`);
    // For demo purposes, show alert
    alert(`${provider} login would redirect to OAuth provider in a real application`);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      <div className="space-y-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.name}
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleSocialLogin(provider?.name)}
            className={`${provider?.color} ${provider?.textColor} border-0 flex items-center justify-center space-x-2 py-3 transition-colors`}
          >
            <Icon name={provider?.icon} size={20} />
            <span>Continue with {provider?.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLoginOptions;