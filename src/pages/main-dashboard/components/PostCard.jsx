import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PostCard = ({ post, onLike, onComment, onShare }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const handleCommentSubmit = (e) => {
    e?.preventDefault();
    if (commentText?.trim()) {
      onComment(post?.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-soft border border-border mb-4">
      {/* Post Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={post?.author?.avatar}
              alt={post?.author?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-text-primary hover:underline cursor-pointer">
                {post?.author?.name}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <span>{formatTimeAgo(post?.timestamp)}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={post?.privacy === 'public' ? 'Globe' : post?.privacy === 'friends' ? 'Users' : 'Lock'} 
                    size={12} 
                  />
                </div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-text-secondary hover:bg-muted">
            <Icon name="MoreHorizontal" size={20} />
          </Button>
        </div>
      </div>
      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-text-primary whitespace-pre-wrap">{post?.content}</p>
      </div>
      {/* Post Image (if exists) */}
      {post?.image && (
        <div className="px-4 pb-3">
          <div className="rounded-lg overflow-hidden">
            <Image
              src={post?.image}
              alt="Post content"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}
      {/* Engagement Stats */}
      {(post?.likes > 0 || post?.comments > 0 || post?.shares > 0) && (
        <div className="px-4 py-2 border-t border-border">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <div className="flex items-center space-x-4">
              {post?.likes > 0 && (
                <span className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="ThumbsUp" size={12} color="white" />
                  </div>
                  <span>{post?.likes}</span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {post?.comments > 0 && (
                <button 
                  onClick={() => setShowComments(!showComments)}
                  className="hover:underline"
                >
                  {post?.comments} comments
                </button>
              )}
              {post?.shares > 0 && <span>{post?.shares} shares</span>}
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="px-4 py-2 border-t border-border">
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(post?.id)}
            className={`flex-1 ${post?.isLiked ? 'text-primary' : 'text-text-secondary'} hover:bg-muted`}
            iconName="ThumbsUp"
            iconPosition="left"
          >
            Like
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex-1 text-text-secondary hover:bg-muted"
            iconName="MessageCircle"
            iconPosition="left"
          >
            Comment
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(post?.id)}
            className="flex-1 text-text-secondary hover:bg-muted"
            iconName="Share"
            iconPosition="left"
          >
            Share
          </Button>
        </div>
      </div>
      {/* Comments Section */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-border">
          <form onSubmit={handleCommentSubmit} className="mt-3">
            <div className="flex items-start space-x-2">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e?.target?.value)}
                  placeholder="Write a comment..."
                  className="w-full px-3 py-2 bg-muted rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-primary text-sm text-text-primary placeholder-text-secondary"
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostCard;