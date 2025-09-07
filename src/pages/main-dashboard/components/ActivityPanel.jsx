import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ActivityPanel = () => {
  const [activeTab, setActiveTab] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'like',
      user: {
        name: "Jessica Williams",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      action: "liked your post",
      content: "Beautiful sunset photo!",
      timestamp: new Date(Date.now() - 300000),
      isRead: false
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      action: "commented on your post",
      content: "Great insights on the tech industry!",
      timestamp: new Date(Date.now() - 900000),
      isRead: false
    },
    {
      id: 3,
      type: 'friend_request',
      user: {
        name: "Lisa Thompson",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
      },
      action: "sent you a friend request",
      content: "",
      timestamp: new Date(Date.now() - 1800000),
      isRead: true
    },
    {
      id: 4,
      type: 'share',
      user: {
        name: "Robert Martinez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      action: "shared your post",
      content: "Amazing article about React development",
      timestamp: new Date(Date.now() - 3600000),
      isRead: true
    },
    {
      id: 5,
      type: 'birthday',
      user: {
        name: "Amanda Foster",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      action: "has a birthday today",
      content: "",
      timestamp: new Date(Date.now() - 7200000),
      isRead: true
    }
  ];

  const tabs = [
    { id: 'all', label: 'All', count: notifications?.length },
    { id: 'unread', label: 'Unread', count: notifications?.filter(n => !n?.isRead)?.length },
    { id: 'mentions', label: 'Mentions', count: 3 }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like': return { name: 'Heart', color: 'text-destructive' };
      case 'comment': return { name: 'MessageCircle', color: 'text-primary' };
      case 'friend_request': return { name: 'UserPlus', color: 'text-success' };
      case 'share': return { name: 'Share', color: 'text-warning' };
      case 'birthday': return { name: 'Gift', color: 'text-secondary' };
      default: return { name: 'Bell', color: 'text-text-secondary' };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return 'Yesterday';
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (activeTab === 'unread') return !notification?.isRead;
    if (activeTab === 'mentions') return notification?.type === 'comment';
    return true;
  });

  return (
    <div className="bg-surface rounded-lg shadow-soft border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Notifications</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-text-secondary">
              <Icon name="Settings" size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="text-text-secondary">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1">
          {tabs?.map(tab => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                activeTab === tab?.id
                  ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              {tab?.label}
              {tab?.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab?.id
                    ? 'bg-white/20 text-white' :'bg-muted text-text-secondary'
                }`}>
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Bell" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredNotifications?.map(notification => {
              const iconConfig = getNotificationIcon(notification?.type);
              
              return (
                <div
                  key={notification?.id}
                  className={`p-4 hover:bg-muted transition-smooth cursor-pointer ${
                    !notification?.isRead ? 'bg-accent/30' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={notification?.user?.avatar}
                        alt={notification?.user?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-surface border-2 border-surface flex items-center justify-center ${iconConfig?.color}`}>
                        <Icon name={iconConfig?.name} size={12} />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-text-primary">
                          <span className="font-medium hover:underline cursor-pointer">
                            {notification?.user?.name}
                          </span>
                          {' '}
                          <span className="text-text-secondary">
                            {notification?.action}
                          </span>
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-text-secondary">
                            {formatTimeAgo(notification?.timestamp)}
                          </span>
                          {!notification?.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                      </div>
                      
                      {notification?.content && (
                        <p className="text-sm text-text-secondary mt-1 truncate">
                          "{notification?.content}"
                        </p>
                      )}
                      
                      {notification?.type === 'friend_request' && (
                        <div className="flex items-center space-x-2 mt-2">
                          <Button variant="default" size="xs">
                            Accept
                          </Button>
                          <Button variant="outline" size="xs">
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-3 border-t border-border">
        <Button variant="ghost" size="sm" fullWidth className="text-primary">
          See all notifications
        </Button>
      </div>
    </div>
  );
};

export default ActivityPanel;