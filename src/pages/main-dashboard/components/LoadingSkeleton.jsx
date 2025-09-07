import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3]?.map(index => (
        <div key={index} className="bg-surface rounded-lg shadow-soft border border-border p-4 animate-pulse">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-muted rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-muted rounded w-32 mb-2"></div>
              <div className="h-3 bg-muted rounded w-20"></div>
            </div>
            <div className="w-6 h-6 bg-muted rounded"></div>
          </div>
          
          {/* Content */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
          
          {/* Image placeholder */}
          {index % 2 === 0 && (
            <div className="h-48 bg-muted rounded-lg mb-4"></div>
          )}
          
          {/* Actions */}
          <div className="flex items-center justify-around pt-3 border-t border-border">
            <div className="h-8 bg-muted rounded w-16"></div>
            <div className="h-8 bg-muted rounded w-20"></div>
            <div className="h-8 bg-muted rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;