import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is encrypted'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'GDPR compliant'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Trusted by millions'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex items-center justify-center space-x-3 p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0">
              <Icon 
                name={feature?.icon} 
                size={24} 
                color="var(--color-success)" 
              />
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-sm font-semibold text-gray-900">
                {feature?.title}
              </h4>
              <p className="text-xs text-gray-600">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;