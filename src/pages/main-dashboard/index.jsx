import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import PostCreationBox from './components/PostCreationBox';
import PostCard from './components/PostCard';
import Sidebar from './components/Sidebar';
import ActivityPanel from './components/ActivityPanel';
import NavigationTabs from './components/NavigationTabs';
import LoadingSkeleton from './components/LoadingSkeleton';

const MainDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('feed');
  const [loading, setLoading] = useState(true);
  const [showActivityPanel, setShowActivityPanel] = useState(false);

  // Mock posts data
  const mockPosts = [
    {
      id: 1,
      author: {
        name: "Alice Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      content: `Just finished an amazing hiking trip in the mountains! 🏔️ The views were absolutely breathtaking and the fresh air was exactly what I needed after a busy week at work.\n\nThere's something magical about disconnecting from technology and reconnecting with nature. Already planning my next adventure!`,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      timestamp: new Date(Date.now() - 1800000),
      privacy: 'public',
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false
    },
    {
      id: 2,
      author: {
        name: "Mark Thompson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      content: `Excited to share that I just launched my new web development portfolio! 🚀 It's been months of hard work, learning new technologies, and perfecting every detail.\n\nBuilt with React, Node.js, and deployed on AWS. Check it out and let me know what you think!`,
      timestamp: new Date(Date.now() - 3600000),
      privacy: 'public',
      likes: 42,
      comments: 15,
      shares: 7,
      isLiked: true
    },
    {
      id: 3,
      author: {
        name: "Sarah Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      content: `Coffee shop vibes ☕ Working on some exciting new designs for a client project. There's something about the ambient noise and good coffee that just sparks creativity.\n\nWhat's your favorite place to work when you need inspiration?`,
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop",
      timestamp: new Date(Date.now() - 7200000),
      privacy: 'friends',
      likes: 18,
      comments: 12,
      shares: 2,
      isLiked: false
    },
    {
      id: 4,
      author: {
        name: "David Rodriguez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      content: `Throwback to last weekend's beach volleyball tournament! 🏐 Our team didn't win, but we had an absolute blast and made some great memories.\n\nSports aren't just about winning - they're about friendship, teamwork, and having fun. Can't wait for the next tournament!`,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
      timestamp: new Date(Date.now() - 10800000),
      privacy: 'public',
      likes: 31,
      comments: 6,
      shares: 4,
      isLiked: true
    },
    {
      id: 5,
      author: {
        name: "Emma Davis",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      content: `Book recommendation time! 📚 Just finished reading "The Midnight Library" by Matt Haig and I'm completely blown away. It's a beautiful exploration of life, choices, and the infinite possibilities that exist.\n\nIf you're looking for something thought-provoking and emotionally moving, this is definitely worth your time. What are you reading lately?`,
      timestamp: new Date(Date.now() - 14400000),
      privacy: 'public',
      likes: 27,
      comments: 19,
      shares: 5,
      isLiked: false
    }
  ];

  useEffect(() => {
    // Simulate loading posts
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleCreatePost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleLike = (postId) => {
    setPosts(prevPosts =>
      prevPosts?.map(post =>
        post?.id === postId
          ? {
              ...post,
              isLiked: !post?.isLiked,
              likes: post?.isLiked ? post?.likes - 1 : post?.likes + 1
            }
          : post
      )
    );
  };

  const handleComment = (postId, commentText) => {
    setPosts(prevPosts =>
      prevPosts?.map(post =>
        post?.id === postId
          ? { ...post, comments: post?.comments + 1 }
          : post
      )
    );
  };

  const handleShare = (postId) => {
    setPosts(prevPosts =>
      prevPosts?.map(post =>
        post?.id === postId
          ? { ...post, shares: post?.shares + 1 }
          : post
      )
    );
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId !== 'feed') {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const renderTabContent = () => {
    if (loading) {
      return <LoadingSkeleton />;
    }

    switch (activeTab) {
      case 'feed':
        return (
          <div className="space-y-4">
            {posts?.map(post => (
              <PostCard
                key={post?.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
              />
            ))}
          </div>
        );
      case 'marketplace':
        return (
          <div className="bg-surface rounded-lg shadow-soft border border-border p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛍️</span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Marketplace</h3>
            <p className="text-text-secondary">Discover and buy items from your community</p>
          </div>
        );
      case 'groups':
        return (
          <div className="bg-surface rounded-lg shadow-soft border border-border p-8 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Groups</h3>
            <p className="text-text-secondary">Connect with people who share your interests</p>
          </div>
        );
      case 'events':
        return (
          <div className="bg-surface rounded-lg shadow-soft border border-border p-8 text-center">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Events</h3>
            <p className="text-text-secondary">Discover events happening around you</p>
          </div>
        );
      case 'watch':
        return (
          <div className="bg-surface rounded-lg shadow-soft border border-border p-8 text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📺</span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Watch</h3>
            <p className="text-text-secondary">Enjoy videos from friends and pages you follow</p>
          </div>
        );
      case 'memories':
        return (
          <div className="bg-surface rounded-lg shadow-soft border border-border p-8 text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💭</span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Memories</h3>
            <p className="text-text-secondary">Look back on your favorite moments</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Main Content */}
            <div className="flex-1 max-w-2xl">
              <NavigationTabs activeTab={activeTab} onTabChange={handleTabChange} />
              
              {activeTab === 'feed' && (
                <PostCreationBox onCreatePost={handleCreatePost} />
              )}
              
              {renderTabContent()}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <Sidebar />
            </div>

            {/* Desktop Activity Panel */}
            <div className="hidden xl:block w-80">
              <ActivityPanel />
            </div>
          </div>

          {/* Mobile Activity Panel Toggle */}
          <div className="xl:hidden fixed bottom-6 right-6">
            <button
              onClick={() => setShowActivityPanel(!showActivityPanel)}
              className="w-14 h-14 bg-primary text-white rounded-full shadow-soft-lg flex items-center justify-center hover:bg-primary/90 transition-smooth"
            >
              <span className="text-xl">🔔</span>
            </button>
          </div>

          {/* Mobile Activity Panel Overlay */}
          {showActivityPanel && (
            <div className="xl:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowActivityPanel(false)}>
              <div className="absolute right-0 top-0 h-full w-80 max-w-full" onClick={(e) => e?.stopPropagation()}>
                <ActivityPanel />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;