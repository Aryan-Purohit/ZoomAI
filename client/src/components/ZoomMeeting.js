import React, { useEffect } from 'react';
import { ZoomMtg } from '@zoomus/websdk';

// Preload Zoom libraries
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

const ZoomMeeting = () => {
  useEffect(() => {
    // Replace these with your actual meeting details
    const meetingNumber = '82109182628';
    const userName = 'Test User';
    const userEmail = 'test@example.com';
    const passWord = 'YOUR_MEETING_PASSWORD';
    const role = 0; // 0 for attendee, 1 for host

    // Fetch signature from our Node.js backend (note the updated port: 5005)
    fetch('http://localhost:5005/api/zoom/signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meetingNumber, role })
    })
      .then(res => res.json())
      .then(data => {
        const signature = data.signature;
        console.log('Received signature:', signature);

        // Initialize the meeting using the Zoom Web SDK
        ZoomMtg.init({
          leaveUrl: 'http://localhost:3000',
          isSupportAV: true,
          success: () => {
            ZoomMtg.join({
              signature,
              meetingNumber,
              userName,
              apiKey: process.env.REACT_APP_ZOOM_API_KEY || 'fubHcSLDThqvRT2u4Lngdw', // Optionally use an env variable
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
      .catch(err => console.error('Error fetching signature', err));
  }, []);

  return (
    <div id="zmmtg-root">
      {/* The Zoom meeting UI will render inside this element */}
    </div>
  );
};

export default ZoomMeeting;
