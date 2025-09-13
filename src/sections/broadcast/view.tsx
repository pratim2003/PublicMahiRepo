'use client';

import React, { useRef, useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { Box, Container, Typography, Slider, IconButton } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import { varFade, MotionContainer } from 'src/components/animate';

export function BroadcastView({ broadcastData }: { broadcastData: any[] }) {
  const latest = broadcastData?.[0]; // show the latest broadcast first
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0); // current time
  const [duration, setDuration] = useState(0); // total duration

  // while user is dragging the slider we store a temporary value here
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState<number | null>(null);

  // Attach reliable listeners and force metadata load when audio src changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      const d = audio.duration;
      setDuration(Number.isFinite(d) ? d : 0);
      // ensure currentTime is within bounds
      if (audio.currentTime > (Number.isFinite(d) ? d : 0)) {
        audio.currentTime = 0;
      }
    };

    const onTimeUpdate = () => {
      // don't overwrite while user is dragging
      if (!isSeeking) {
        setCurrentTime(audio.currentTime);
      }
    };

    const onCanPlay = () => {
      // sometimes duration is only available at canplay
      onLoadedMetadata();
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(audio.duration || 0);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('ended', onEnded);

    // Ask browser to fetch metadata immediately
    audio.preload = 'metadata';
    try {
      audio.load();
    } catch (err) {
      // ignore; some browsers may throw if already loading
    }

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('ended', onEnded);
    };
    // only re-run when the audio source changes
  }, [latest?.audio, isSeeking === false]); // keep dependency on audio; including isSeeking=false avoids stale listener issue

  // Play/pause toggle using async play() to catch autoplay restrictions
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
        // play() might be blocked by browser autoplay policy; log for debug
        console.error('Audio play prevented:', err);
      }
    }
  };

  // Called continuously while dragging the slider
  const handleSliderChange = (_event: Event, value: number | number[]) => {
    const v = Array.isArray(value) ? value[0] : value;
    setSeekValue(v);
    setIsSeeking(true);
    // update the visible time as user drags
    setCurrentTime(v);
  };

  // Called when user releases the slider (commit)
  const handleSliderCommit = (_event: React.SyntheticEvent | Event, value: number | number[]) => {
    const v = Array.isArray(value) ? value[0] : value;
    const audio = audioRef.current;
    if (audio) {
      // jump audio to the chosen position
      audio.currentTime = v;
    }
    setCurrentTime(v);
    setSeekValue(null);
    // small delay to avoid immediate override from timeupdate while the element seeks
    setTimeout(() => setIsSeeking(false), 50);
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time) || isNaN(time)) return '0:00';
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

  // derive slider show value (use seekValue while dragging)
  const sliderValue = typeof seekValue === 'number' ? seekValue : currentTime;
  const sliderMax = Number.isFinite(duration) && duration > 0 ? duration : 0;

  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: 6 }}>
      <Container sx={{ maxWidth: '1000px !important' }}>
        {/* Header */}
        <MotionContainer>
          <m.div variants={varFade().inUp}>
            <Typography
              sx={{
                fontFamily: "'Merriweather', serif",
                fontSize: { xs: '2rem', md: '5.2rem' },
                fontWeight: 400,
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: 1,
                textAlign: 'center',
              }}
            >
              {latest.heading}
            </Typography>
          </m.div>

          {latest.subHead1 && (
            <m.div variants={varFade().inUp}>
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
            </m.div>
          )}

          {/* --- Robust Custom Audio Player --- */}
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
                onChange={(_, value) => setProgress(value as number)} // updates UI while sliding
                onChangeCommitted={(_, value) => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = value as number; // set audio position on release
                  }
                }}
                sx={{ flexGrow: 1, color: 'white' }}
              />

              <Typography variant="body2" sx={{ minWidth: 80, textAlign: 'center', color: '#ccc' }}>
                {formatTime(progress)} / {formatTime(duration)}
              </Typography>

              {/* Hidden audio tag */}
              <audio ref={audioRef} src={`/${latest.audio}`} hidden />
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
        </MotionContainer>

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
          <div dangerouslySetInnerHTML={{ __html: latest.containt }} />
        </Box>
      </Container>
    </Box>
  );
}
