'use client';

import React, { useRef, useState, useEffect } from 'react';

import { Pause, PlayArrow } from '@mui/icons-material';
import { Box, Slider, Container, Typography, IconButton } from '@mui/material';

export function BroadcastView({ broadcastData }: { broadcastData: any[] }) {
  const latest = broadcastData?.[0]; // show the latest broadcast first
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // current time
  const [duration, setDuration] = useState(0); // total duration

  // Attach listeners when audio changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined; // explicitly return undefined

    const onLoadedMetadata = () => {
      const d = audio.duration;
      setDuration(Number.isFinite(d) ? d : 0);
      if (audio.currentTime > (Number.isFinite(d) ? d : 0)) {
        audio.currentTime = 0;
      }
    };

    const onTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const onCanPlay = () => {
      onLoadedMetadata();
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(audio.duration || 0);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('ended', onEnded);

    audio.preload = 'metadata';
    try {
      audio.load();
    } catch {
      // ignore load() errors
    }

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('ended', onEnded);
    };
  }, [latest?.audio]);

  // Play/pause toggle
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error('Audio play prevented:', err);
      }
    }
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time) || Number.isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!latest) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography>No broadcast data found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: 6 }}>
      <Container sx={{ maxWidth: '950px !important' }}>
        {/* Header */}
        <Container>
          <Typography
            sx={{
              fontFamily: "'Merriweather', serif",
              fontSize: { xs: '2rem', md: '5.2rem' },
              fontWeight: 400,
              mb: 2,
              mt: 6,
              textTransform: 'uppercase',
              letterSpacing: 1,
              textAlign: 'center',
            }}
          >
            {latest.heading}
          </Typography>

          {latest.subHead1 && (
            <Typography
              sx={{
                fontFamily: "'Roboto Slab', serif",
                fontSize: { xs: '1.25rem', md: '1.2rem' },
                fontWeight: 500,
                mb: 1,
                color: '#ccc',
                fontStyle: 'italic',
              }}
            >
              {latest.subHead1}
            </Typography>
          )}

          {/* --- Custom Audio Player --- */}
          {latest.audio && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Play/Pause button */}
              <IconButton onClick={togglePlay} sx={{ color: 'white' }}>
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>

              {/* Seek bar */}
              <Slider
                value={progress}
                min={0}
                max={duration}
                step={0.1}
                onChange={(_, value) => setProgress(value as number)}
                onChangeCommitted={(_, value) => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = value as number;
                  }
                }}
                sx={{ flexGrow: 1, color: 'white' }}
              />

              <Typography variant="body2" sx={{ minWidth: 80, textAlign: 'center', color: '#ccc' }}>
                {formatTime(progress)} / {formatTime(duration)}
              </Typography>

              {/* Hidden audio tag */}
              <audio ref={audioRef} src={`/${latest.audio}`} hidden>
                <track kind="captions" src="" label="captions" />
              </audio>
            </Box>
          )}
          {/* --- end audio player --- */}

          {latest.subHead2 && (
            <Typography
              sx={{
                fontFamily: "'Roboto Slab', serif",
                fontSize: '1.5rem',
                color: '#aaa',
                py: 3,
              }}
            >
              {latest.subHead2}
            </Typography>
          )}
        </Container>

        {/* Content */}
        <Box
          sx={{
            fontFamily: "'Roboto Slab', serif",
            fontSize: '1rem',
            lineHeight: 1.9,
            '& p': { marginBottom: '1.5rem' },
            mb: 3,
            color: '#ccc',
            textAlign: 'justify',
          }}
        >
          {/* ⚠️ Ensure latest.containt is sanitized before using dangerouslySetInnerHTML */}
          <div dangerouslySetInnerHTML={{ __html: latest.containt }} />
        </Box>
      </Container>
    </Box>
  );
}
