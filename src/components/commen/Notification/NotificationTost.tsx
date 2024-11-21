'use client'

import React, { useState } from 'react';

interface NotificationProps {
  title: string;
  body: string;
  imageUrl: string;
  auctionTitle?: string;
  redirectUrl?: string; 
}

export default function CustomNotification({ title, body, imageUrl, auctionTitle, redirectUrl }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a href={redirectUrl} className="fixed left-1/2 top-3 transform -translate-x-1/2 cursor-pointer w-full max-w-xs bg-white border border-amber-200 rounded-md shadow-sm z-50" target="_blank" rel="noopener noreferrer">
      <div className="p-3">
        <div className="flex items-start space-x-3">
          <div className="relative flex-shrink-0">
            <img
              src={imageUrl}
              alt="Auction Item"
              className="w-12 h-12 rounded-sm object-cover"
            />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start">
              <div className="truncate">
                <h3 className="font-medium text-sm text-amber-900 truncate">{title}</h3>
                {auctionTitle && (
                  <p className="text-xs text-amber-700 truncate">{auctionTitle}</p>
                )}
              </div>
              <button 
                className="text-amber-600 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ml-2"
                onClick={(e) => {
                  e.preventDefault(); 
                  setIsVisible(false);
                }}
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="sr-only">Dismiss</span>
              </button>
            </div>
            <p className="text-xs mt-1 text-amber-800 line-clamp-2">{body}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs text-amber-600">
          <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Just now</span>
        </div>
      </div>
    </a>
  );
}
