import React, { createContext, useContext, useState } from 'react';

interface AudioPlayerContextProps {
  videoId: string;
  isPlaying: boolean;
  volume: number;
  setVideoId: (id: string) => void;
  setIsPlaying: (p: boolean) => void;
  setVolume: (v: number) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextProps | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videoId, setVideoId] = useState('dQw4w9WgXcQ');
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(100);

  return (
    <AudioPlayerContext.Provider value={{ videoId, setVideoId, isPlaying, setIsPlaying, volume, setVolume }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};