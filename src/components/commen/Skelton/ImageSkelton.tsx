import React from 'react';

export const ImageGallerySkeleton: React.FC = () => {
  return (
    <div className="flex space-x-4 animate-pulse">
      {/* Left side thumbnail skeleton */}
      <div className="flex flex-col space-y-2">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden rounded-lg bg-gray-300 w-full h-24"
          >
            {/* Empty div to maintain layout */}
          </div>
        ))}
      </div>

      {/* Main image skeleton */}
      <div 
        className="relative flex-1 flex justify-center items-center bg-gray-300 rounded-lg"
        style={{ height: '500px' }}
      >
        <svg 
          className="w-12 h-12 text-gray-200" 
          aria-hidden="true" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="currentColor" 
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM9 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-7 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1h-16v-1Z"/>
        </svg>
      </div>
    </div>
  );
};

export default ImageGallerySkeleton;