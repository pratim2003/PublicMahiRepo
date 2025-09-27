'use client';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import React, { useRef, useState, useEffect } from 'react';

import { Pause, PlayArrow } from '@mui/icons-material';
import { Box, Slider, Button, Container, TextField, Typography, IconButton } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import DeployButton from '../../../../layouts/components/deploye-button';
// ----------------------------------------------------------------------

export function OverviewBookingView({ broadcastData }: { broadcastData: any[] }) {
  const router = useRouter();
  const latest = broadcastData?.[0]; // show the latest broadcast first
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showDeploy, setShowDeploy] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // current time
  const [duration, setDuration] = useState(0); // total duration

  // 🔹 Edit mode states
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({
    heading: '',
    subHead1: '',
    subHead2: '',
    containt: '',
    file: null,
  });

  useEffect(() => {
    if (latest) {
      setFormData({
        heading: latest.heading || '',
        subHead1: latest.subHead1 || '',
        subHead2: latest.subHead2 || '',
        containt: latest.containt || '',
        file: null,
      });
    }
  }, [latest]);

  // Attach listeners when audio changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev: any) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async () => {
    try {
      const fd = new FormData();
      fd.append('heading', formData.heading);
      fd.append('subHead1', formData.subHead1);
      fd.append('subHead2', formData.subHead2);
      fd.append('containt', formData.containt);
      if (formData.file) {
        fd.append('file', formData.file);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL1}/api/fpii/broadcast`, {
        method: 'POST',
        body: fd,
      });

      if (res.ok) {
        setEditMode(false);
        setShowDeploy(true);
        router.refresh();
        toast.success('Content updated successfully!');
      } else {
        console.error('Failed to update broadcast');
        toast.error('Failed to update content');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!latest) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography>No broadcast data found.</Typography>
      </Box>
    );
  }

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ bgcolor: 'black', color: 'white', py: 6, position: 'relative' }}>
        <Container sx={{ maxWidth: '950px !important' }}>
          {/* 🔹 Edit Button Top-right */}
          {!editMode && (
            <>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setEditMode(true)}
                sx={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  color: 'white',
                  backgroundColor: '#00a76f',
                }}
              >
                Edit
              </Button>
              {showDeploy && (
                <Box mt={3}>
                  <DeployButton />
                </Box>
              )}
            </>
          )}

          {/* 🔹 Edit Mode Form */}
          {editMode ? (
            <Box sx={{ color: 'black', bgcolor: 'white', p: 4, borderRadius: 2 }}>
              <TextField
                fullWidth
                label="Heading"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Sub Heading 1"
                name="subHead1"
                value={formData.subHead1}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Sub Heading 2"
                name="subHead2"
                value={formData.subHead2}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Content"
                name="containt"
                value={formData.containt}
                onChange={handleChange}
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" component="label" sx={{ mb: 2 }}>
                Upload Audio
                <input type="file" hidden accept="audio/*" onChange={handleFileChange} />
              </Button>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" onClick={handleSubmit}>
                  Save
                </Button>
                <Button variant="outlined" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <>
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

                    <Typography
                      variant="body2"
                      sx={{ minWidth: 80, textAlign: 'center', color: '#ccc' }}
                    >
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
                <div dangerouslySetInnerHTML={{ __html: latest.containt }} />
              </Box>
            </>
          )}
        </Container>
      </Box>
    </DashboardContent>
  );
}
