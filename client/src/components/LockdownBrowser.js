import React, { useEffect } from 'react';
import { ZoomMtg } from '@zoomus/websdk';

const LockdownBrowser = () => {
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
        (e.ctrlKey && e.keyCode === 85)
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        console.log('Alert: User switched tab or minimized the browser.');
      } else {
        console.log('Notice: User returned to the exam window.');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();

    const meetingNumber = '81673752970'; // Your meeting number
    const userName = 'Test User';
    const userEmail = 'test@example.com';
    const passWord = ''; // Update with your meeting password if needed
    const role = 0; // 0 for attendee

    fetch('http://localhost:5005/api/zoom/signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meetingNumber, role })
    })
      .then((res) => res.json())
      .then((data) => {
        const signature = data.signature;
        console.log('Received signature:', signature);

        ZoomMtg.init({
          leaveUrl: 'http://localhost:3000', 
          isSupportAV: true,
          success: () => {
            ZoomMtg.join({
              signature,
              meetingNumber,
              userName,
              apiKey: 'fubHcSLDThqvRT2u4Lngdw', // Your Zoom API key
              userEmail,
              passWord,
              success: (res) => {
                console.log('Join meeting success', res);
              },
              error: (err) => {
                console.error('Error joining meeting', err);
              }
            });
          },
          error: (err) => {
            console.error('Error initializing Zoom', err);
          }
        });
      })
      .catch((err) => console.error('Error fetching signature', err));
  }, []);

  return (
    <div>
      <div id="zmmtg-root"></div>
    </div>
  );
};

export default LockdownBrowser;