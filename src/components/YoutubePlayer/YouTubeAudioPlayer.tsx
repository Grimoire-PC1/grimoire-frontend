import React, { useRef, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useAudioPlayer } from '../../context/AudioPlayerContext';

const YouTubeAudioPlayer: React.FC = () => {
  const playerRef = useRef<any>(null);
  const { videoId, isPlaying, volume } = useAudioPlayer();

  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    playerRef.current.setVolume(volume);
    if (isPlaying) playerRef.current.playVideo();
    else playerRef.current.pauseVideo();
  };

  useEffect(() => {
    if (!playerRef.current) return;
    isPlaying ? playerRef.current.playVideo() : playerRef.current.pauseVideo();
  }, [isPlaying]);

  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.setVolume(volume);
  }, [volume]);

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

  return <YouTube videoId={videoId} opts={opts} onReady={onReady} />;
};

export default YouTubeAudioPlayer;