import React, { useRef, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useAudioPlayer } from '../../context/AudioPlayerContext';

const YouTubeAudioPlayer: React.FC = () => {
  const playerRef = useRef<any>(null);
  const { videoId, isPlaying, next } = useAudioPlayer();

  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    if (isPlaying) playerRef.current.playVideo();
    else playerRef.current.pauseVideo();
  };

  const onEnd: YouTubeProps['onEnd'] = () => {
    next();
  };

  useEffect(() => {
    if (!playerRef.current) return;
    isPlaying ? playerRef.current.playVideo() : playerRef.current.pauseVideo();
  }, [isPlaying]);

  const opts: YouTubeProps['opts'] = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      showinfo: 0,
    },
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onReady} onEnd={onEnd} />;
};

export default YouTubeAudioPlayer;