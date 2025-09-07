import React from 'react';

import Button from '../../../components/ui/Button';

const NavigationTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'feed', label: 'News Feed', icon: 'Home', count: null },
    { id: 'marketplace', label: 'Marketplace', icon: 'ShoppingBag', count: null },
    { id: 'groups', label: 'Groups', icon: 'Users', count: 3 },
    { id: 'events', label: 'Events', icon: 'Calendar', count: 2 },
    { id: 'watch', label: 'Watch', icon: 'Play', count: null },
    { id: 'memories', label: 'Memories', icon: 'Clock', count: 1 }
  ];

  return (
    <div className="bg-surface rounded-lg shadow-soft border border-border mb-6">
      <div className="p-2">
        <div className="flex items-center space-x-1 overflow-x-auto">
          {tabs?.map(tab => (
            <Button
              key={tab?.id}
              variant={activeTab === tab?.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onTabChange(tab?.id)}
              className={`flex-shrink-0 ${
                activeTab === tab?.id
                  ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
              iconName={tab?.icon}
              iconPosition="left"
            >
              <span className="flex items-center space-x-2">
                <span>{tab?.label}</span>
                {tab?.count && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    activeTab === tab?.id
                      ? 'bg-white/20 text-white' :'bg-primary text-white'
                  }`}>
                    {tab?.count}
                  </span>
                )}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;