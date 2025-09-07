import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const Sidebar = () => {
  const friendSuggestions = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 12,
      workplace: "Google"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 8,
      workplace: "Microsoft"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 15,
      workplace: "Meta"
    }
  ];

  const trendingTopics = [
    { id: 1, topic: "#TechNews", posts: "2.1K posts" },
    { id: 2, topic: "#WorldCup2024", posts: "5.8K posts" },
    { id: 3, topic: "#ClimateChange", posts: "1.3K posts" },
    { id: 4, topic: "#AI", posts: "3.7K posts" },
    { id: 5, topic: "#Photography", posts: "892 posts" }
  ];

  const sponsoredContent = [
    {
      id: 1,
      title: "Learn React Development",
      description: "Master modern web development with our comprehensive React course.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      sponsor: "TechEdu"
    },
    {
      id: 2,
      title: "Premium Coffee Beans",
      description: "Discover the world's finest coffee beans delivered to your door.",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=200&fit=crop",
      sponsor: "CoffeeCo"
    }
  ];

  return (
    <div className="w-80 space-y-6">
      {/* Friend Suggestions */}
      <div className="bg-surface rounded-lg shadow-soft border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">People you may know</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            See all
          </Button>
        </div>
        
        <div className="space-y-3">
          {friendSuggestions?.map(friend => (
            <div key={friend?.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src={friend?.avatar}
                  alt={friend?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-text-primary hover:underline cursor-pointer">
                    {friend?.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {friend?.mutualFriends} mutual friends
                  </p>
                  <p className="text-xs text-text-secondary">{friend?.workplace}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <Button variant="default" size="xs">
                  Add Friend
                </Button>
                <Button variant="ghost" size="xs" className="text-text-secondary">
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trending Topics */}
      <div className="bg-surface rounded-lg shadow-soft border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Trending</h2>
          <Button variant="ghost" size="icon" className="text-text-secondary">
            <Icon name="Settings" size={16} />
          </Button>
        </div>
        
        <div className="space-y-3">
          {trendingTopics?.map(trend => (
            <div key={trend?.id} className="cursor-pointer hover:bg-muted rounded-md p-2 -m-2 transition-smooth">
              <h3 className="font-medium text-primary hover:underline">
                {trend?.topic}
              </h3>
              <p className="text-sm text-text-secondary">{trend?.posts}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Sponsored Content */}
      <div className="bg-surface rounded-lg shadow-soft border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Sponsored</h2>
          <Button variant="ghost" size="icon" className="text-text-secondary">
            <Icon name="Info" size={16} />
          </Button>
        </div>
        
        <div className="space-y-4">
          {sponsoredContent?.map(ad => (
            <div key={ad?.id} className="cursor-pointer hover:bg-muted rounded-md p-2 -m-2 transition-smooth">
              <div className="rounded-lg overflow-hidden mb-3">
                <Image
                  src={ad?.image}
                  alt={ad?.title}
                  className="w-full h-32 object-cover"
                />
              </div>
              <h3 className="font-medium text-text-primary mb-1">{ad?.title}</h3>
              <p className="text-sm text-text-secondary mb-2">{ad?.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">Sponsored by {ad?.sponsor}</span>
                <Button variant="outline" size="xs">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;