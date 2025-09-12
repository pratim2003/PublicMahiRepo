'use client';

import React from 'react';
import { m } from 'framer-motion';
import { Box, Grid, Button, Container, TextField, Typography } from '@mui/material';

import { varFade, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function BroadcastView({ broadcastData }: { broadcastData: any[] }) {
  const latest = broadcastData[0]; // show the latest broadcast first

  if (!latest) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography>No broadcast data found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: 6 }}>
      <Container maxWidth="md">
        {/* Header */}
        <MotionContainer sx={{ textAlign: 'center', mb: 6 }}>
          <m.div variants={varFade().inUp}>
            <Typography
              sx={{
                fontFamily: "'Merriweather', serif",
                fontSize: { xs: '2rem', md: '4rem' },
                fontWeight: 600,
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: 1,
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
                  fontSize: { xs: '1.25rem', md: '1.75rem' },
                  fontWeight: 500,
                  textAlign: 'center',
                  mb: 1,
                  color: '#ccc',
                }}
              >
                {latest.subHead1}
              </Typography>
            </m.div>
          )}

          {latest.subHead2 && (
            <Typography
              sx={{
                fontFamily: "'Roboto Slab', serif",
                fontSize: '1.25rem',
                color: '#aaa',
                mb: 1,
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
            fontSize: '1.05rem',
            lineHeight: 1.9,
            '& p': { marginBottom: '1.5rem' },
            mb: 6,
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: latest.containt }} />
        </Box>

        {/* Audio Player */}
      {latest.audio && (
  <div className="mt-4">
    <audio
      controls
      className="w-full pointer-events-auto"
    >
      <source
        src={latest.audio}
        type={
          latest.audio.endsWith(".wav")
            ? "audio/wav"
            : latest.audio.endsWith(".ogg")
            ? "audio/ogg"
            : "audio/mpeg" // default (mp3)
        }
      />
      Your browser does not support the audio element.
    </audio>
  </div>
)}


        {/* Contact Form (same style as article) */}
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontFamily: "'Merriweather', serif",
              fontWeight: 600,
              mb: 3,
            }}
          >
            Contact Maahi
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First name"
                variant="outlined"
                InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last name"
                variant="outlined"
                InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                variant="outlined"
                InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
