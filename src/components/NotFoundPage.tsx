import React, { useEffect, useState, useRef } from 'react';
import MoonImage from '../assets/moon.png';
import StarField from './StarField';
import song from '../assets/Co2.mp3';

const NotFoundPage: React.FC = () => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [hasPlayedThisSession, setHasPlayedThisSession] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if we've already played the song this session
    const sessionKey = '404-song-played';
    const hasPlayed = sessionStorage.getItem(sessionKey) === 'true';
    
    if (hasPlayed) {
      setHasPlayedThisSession(true);
      return;
    }

    // Set up the 45-second timer
    timeoutRef.current = setTimeout(() => {
      setShowAudioPlayer(true);
    }, 25000); // 45 seconds

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (showAudioPlayer && audioRef.current && !hasPlayedThisSession) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Autoplay was prevented by the browser:", error);
        });
      }
    }
  }, [showAudioPlayer, hasPlayedThisSession]);

  const handleDismissAudio = () => {
    setShowAudioPlayer(false);
    // Mark as played for this session
    sessionStorage.setItem('404-song-played', 'true');
    setHasPlayedThisSession(true);
    
    // Stop the audio if it's playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleAudioEnded = () => {
    setShowAudioPlayer(false);
    // Mark as played for this session
    sessionStorage.setItem('404-song-played', 'true');
    setHasPlayedThisSession(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white relative overflow-hidden">
      <StarField is404Effect={true} />
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center">
          <span className="text-[10rem] font-bold relative -mr-[100px]">4</span>
          <img src={MoonImage} alt="Moon" className="w-70 h-70 mx-4 drop-shadow-[0_0_80px_rgba(255,255,255,0.7)]" />
          <span className="text-[10rem] font-bold relative -ml-[92px]">4</span>
        </div>
        <span className="mt-8 text-4xl">Page Not Found!</span>
        
        {/* Audio Player */}
        {showAudioPlayer && !hasPlayedThisSession && (
          <div className="fixed bottom-10 left-10 p-4 bg-black/50 backdrop-blur-sm rounded-lg border border-white/20 animate-fade-in w-64 shadow-lg">
            <button
              onClick={handleDismissAudio}
              className="absolute top-2 right-2 text-white/50 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center space-y-3">
              <p className="text-sm text-center">
                🎵 You've been here for a while... <br />
                Here's a song for you! 🎵
              </p>
              <audio 
                ref={audioRef}
                controls
                onEnded={handleAudioEnded}
                className="w-full"
              >
                <source src={song} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotFoundPage; 