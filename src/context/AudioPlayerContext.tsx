import React, { createContext, useContext, useState } from 'react';

interface AudioPlayerContextProps {
  queue: string[];
  currentIndex: number;
  videoId: string;
  isPlaying: boolean;
  activeCampaign: number,
  activePlaylist: number,
  setActiveCampaign: (id:number) => void;
  setActivePlaylist: (id:number) => void;
  setIsPlaying: (b: boolean) => void;
  next: () => void;
  previous: () => void;
  shuffle: () => void;
  setQueue: (ids: string[]) => void;
  setCurrentIndex: (i: number) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextProps | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queue, setQueueState] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeCampaign, setActiveCampaign] = useState<number>(0);
  const [activePlaylist, setActivePlaylist] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const setQueue = (ids: string[]) => {
    setQueueState(ids);
    setCurrentIndex(0);
    setIsPlaying(true); // começa a tocar automaticamente
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1 < queue.length ? prev + 1 : 0));
    setIsPlaying(true);
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : queue.length - 1));
    setIsPlaying(true);
  };

  const shuffle = () => {
    const shuffled = [...queue].sort(() => Math.random() - 0.5);
    setQueueState(shuffled);
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const videoId = queue[currentIndex];

  return (
    <AudioPlayerContext.Provider
      value={{
        queue,
        currentIndex,
        videoId,
        isPlaying,
        activeCampaign,
        activePlaylist,
        setIsPlaying,
        next,
        previous,
        shuffle,
        setQueue,
        setCurrentIndex,
        setActiveCampaign,
        setActivePlaylist
      }}
    >
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