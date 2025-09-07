import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PostCreationBox = ({ onCreatePost }) => {
  const [postText, setPostText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedPrivacy, setSelectedPrivacy] = useState('public');

  const currentUser = {
    id: 1,
    name: "John Smith",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  const privacyOptions = [
    { value: 'public', label: 'Public', icon: 'Globe' },
    { value: 'friends', label: 'Friends', icon: 'Users' },
    { value: 'private', label: 'Only me', icon: 'Lock' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (postText?.trim()) {
      const newPost = {
        id: Date.now(),
        author: currentUser,
        content: postText,
        timestamp: new Date(),
        privacy: selectedPrivacy,
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false
      };
      onCreatePost(newPost);
      setPostText('');
      setShowOptions(false);
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-soft border border-border p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Image
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e?.target?.value)}
              placeholder={`What's on your mind, ${currentUser?.name?.split(' ')?.[0]}?`}
              className="w-full p-3 bg-muted rounded-lg border-0 resize-none focus:outline-none focus:ring-2 focus:ring-primary text-text-primary placeholder-text-secondary"
              rows={showOptions ? 4 : 2}
              onFocus={() => setShowOptions(true)}
            />
            
            {showOptions && (
              <div className="mt-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      iconName="Image"
                      iconPosition="left"
                      className="text-success hover:bg-success/10"
                    >
                      Photo/Video
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      iconName="Smile"
                      iconPosition="left"
                      className="text-warning hover:bg-warning/10"
                    >
                      Feeling
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      iconName="MapPin"
                      iconPosition="left"
                      className="text-destructive hover:bg-destructive/10"
                    >
                      Location
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedPrivacy}
                      onChange={(e) => setSelectedPrivacy(e?.target?.value)}
                      className="px-3 py-1 bg-muted border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {privacyOptions?.map(option => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={privacyOptions?.find(opt => opt?.value === selectedPrivacy)?.icon || 'Globe'} 
                      size={16} 
                      className="text-text-secondary" 
                    />
                    <span className="text-sm text-text-secondary">
                      {privacyOptions?.find(opt => opt?.value === selectedPrivacy)?.label}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setPostText('');
                        setShowOptions(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="default"
                      size="sm"
                      disabled={!postText?.trim()}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostCreationBox;