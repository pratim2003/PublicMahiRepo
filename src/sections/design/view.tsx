'use client';

import React from 'react';
import Image from 'next/image';

import { Box, Grid, Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export function DesignView({ broadcastData }: { broadcastData: any[] }) {
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
      <Container sx={{ maxWidth: '950px !important' }}>
        {' '}
        {/* Header */}
        <Container sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            sx={{
              fontFamily: "'Merriweather', serif",
              fontSize: { xs: '2rem', md: '5.2rem' },
              fontWeight: 400,
              mb: 2,
              mt: 6,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            {latest?.heading}
          </Typography>
        </Container>
        {/* Content */}
        <Box
          sx={{
            fontFamily: "'Roboto Slab', serif",
            fontSize: '1.05rem',
            lineHeight: 1.9,
            '& p': { marginBottom: '1.5rem' },
            mb: 6,
            color: '#ccc',
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: latest.containt }} />
        </Box>
        {/* Images with captions */}
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
          {latest.images?.map((img: any, index: any) => (
            <Grid item xs={12} md={6} key={index} textAlign="center">
              <Image
                // component="img"
                src={`/${img}`}
                alt={`Design ${index + 1}`}
                width={800}
                height={580}
                priority
                style={{
                  width: '100%',
                  height: 400, // ✅ Fixed height for uniform size
                  objectFit: 'cover', // ✅ crops the image without distortion
                  borderRadius: 1,
                  // boxShadow: 1,
                  // mb: 1,
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "'Roboto Slab', serif",
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                {index === 0 ? latest.subHead1 : latest.subHead2}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
