'use client';

import React from 'react';
import { m } from 'framer-motion';

import { Box, Container, Typography } from '@mui/material';

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

          {/* Audio Player */}
          {latest.audio && (
            <div style={{ marginTop: 10, marginBottom: 20 }}>
              {latest?.audio && (
                <audio controls className="w-full pointer-events-auto">
                  <source
                    src={`/${latest.audio}`}
                    type={
                      latest.audio.endsWith('.wav')
                        ? 'audio/wav'
                        : latest.audio.endsWith('.ogg')
                          ? 'audio/ogg'
                          : 'audio/mpeg'
                    }
                  />
                  <track
                    kind="captions"
                    src="/audio/captions.vtt"
                    srcLang="en"
                    label="English captions"
                  />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          )}

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
