import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialRegistration = ({ onSocialRegister }) => {
  const socialOptions = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'bg-gray-900 hover:bg-gray-800',
      textColor: 'text-white'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'Twitter',
      color: 'bg-blue-400 hover:bg-blue-500',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-surface text-text-secondary">Or sign up with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {socialOptions?.map((option) => (
          <Button
            key={option?.id}
            variant="outline"
            onClick={() => onSocialRegister(option?.id)}
            className="flex items-center justify-center space-x-2 py-3"
          >
            <Icon name={option?.icon} size={18} />
            <span className="hidden sm:inline">{option?.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialRegistration;