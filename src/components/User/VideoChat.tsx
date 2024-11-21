import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

interface VideoCallProps {
  roomID: string;
  userID: string;
  onEndCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ roomID, userID, onEndCall }) => {
  const zpRef = useRef<any>(null);

  useEffect(() => {
    const appID = parseInt(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET || '';
    console.log('App ID:', appID);
    console.log('Server Secret:', serverSecret);

    if (!appID || !serverSecret) {
      console.error('Missing Zego App ID or Server Secret');
      return;
    }
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      'User-' + userID,
    );

    try {
      zpRef.current = ZegoUIKitPrebuilt.create(kitToken);
      zpRef.current.joinRoom({
        container: document.querySelector('#video-call-container') as HTMLElement,
        sharedLinks: [
          {
            name: 'Copy link',
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showPreJoinView: true,
        onJoinRoom: () => {
          console.log(`User ${userID} has joined the room.`);
        },
      });
    } catch (error) {
      console.error('Error initializing video chat:', error);
    }

    return () => {
      if (zpRef.current) {
        try {
          zpRef.current.leaveRoom();
        } catch (error) {
          console.error('Error during cleanup - leaving room:', error);
        }
      }
    };
  }, [roomID, userID]);

  const handleEndCall = () => {
    try {
      zpRef.current?.leaveRoom();
    } catch (error) {
      console.error('Error leaving room:', error);
    }
    onEndCall();
  };

  return (
    <div className="flex flex-col h-full">
      <div id="video-call-container" className="flex-grow" />
      <button
        onClick={handleEndCall}
        className="mt-4 mx-auto px-4 py-2 bg-amber-800 text-white rounded-full hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        End Call
      </button>
    </div>
  );
};

export default VideoCall;
