import React, { useEffect, useRef, useState } from 'react';
import './Prototype.css';

const Prototype = () => {
  const videoRef = useRef(null);
  const [logs, setLogs] = useState([]);

  // List of simulated proctoring events (excluding tab events, which are handled separately)
  const simulatedEvents = [
    "Student is looking away from the screen.",
    "Multiple faces detected in the camera feed.",
    "Student appears to be distracted.",
    "Student is focused and attentive.",
    "Unusual head movement detected.",
    "Student's face not detected."
  ];

  // Function to add a log event with the current time.
  const addLog = (message) => {
    const newLog = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message,
    };
    // Prepend the new log and keep the latest 10 events.
    setLogs((prevLogs) => [newLog, ...prevLogs].slice(0, 10));
  };

  // Request access to the camera and set the stream to the video element.
  useEffect(() => {
    async function getCameraStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        addLog("Error: Unable to access the camera.");
      }
    }
    getCameraStream();
  }, []);

  // Set an interval to simulate random proctoring events every 4 seconds.
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * simulatedEvents.length);
      addLog(simulatedEvents[randomIndex]);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  // Listen for tab visibility changes to simulate a "tab switch" event.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        addLog("Alert: Student switched tab or left the exam window.");
      } else {
        addLog("Notice: Student returned to the exam window.");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div className="prototype-container">
      <header className="prototype-header">
        <h1>ZoomAI Proctoring System</h1>
        <p>Secure, Transparent, and Fair Online Exams</p>
      </header>
      <div className="prototype-main">
        <div className="meeting-section">
          <h2>Live Zoom Meeting</h2>
          <div className="meeting-placeholder">
            {/* Video element displaying live camera feed */}
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="camera-feed"
            />
          </div>
        </div>
        <div className="report-section">
          <h2>Proctoring Activity Feed</h2>
          <div className="report-placeholder">
            <ul>
              {logs.map((log, index) => (
                <li key={index}>
                  <span className="flag-time">{log.time}</span> – {log.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <footer className="prototype-footer">
        <p>&copy; 2025 ZoomAI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Prototype;