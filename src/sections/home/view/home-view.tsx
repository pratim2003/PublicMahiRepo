'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Box, Grid, Container, Typography } from '@mui/material';

type HomeData = {
  heading: string;
  body: string;
  image?: string;
};

export function HomeView({ homeData }: { homeData: HomeData }) {
  const [status, setStatus] = useState('');
  return (
    <Box
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        py: { xs: 6, md: 5 },
      }}
    >
      <Container sx={{ maxWidth: '950px !important' }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={7}>
            {/* Heading - Sans Serif */}
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: '2rem',
                letterSpacing: '3px',
                mb: 1,
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
              }}
            >
              {homeData.heading.substring(0, 10)}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: '2rem',
                letterSpacing: '2px',
                mb: 3,
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
              }}
            >
              {homeData.heading.substring(10)}
            </Typography>

            {/* Body - Sans Serif */}
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Roboto Slab', serif",
                mb: 4,
                lineHeight: 2,
                fontSize: '1.4rem',
                fontWeight: 'lighter',
                letterSpacing: '0.2px',
                color: '#fff',
                WebkitTextStroke: '0.5px #000',
              }}
            >
              {homeData.body}
            </Typography>

            {status && (
              <Typography
                sx={{
                  mt: 2,
                  color: status.includes('success') ? 'lightgreen' : 'red',
                  fontFamily: "'Roboto Slab', serif",
                }}
              >
                {status}
              </Typography>
            )}
          </Grid>

          {/* Right Image */}
          <Grid item xs={12} md={5} display="flex" justifyContent="center">
            {homeData.image && (
              // <Image
              //   src={`/${homeData.image}`}
              //   alt="Home"
              //   width={250}
              //   height={300}
              //   style={{ borderRadius: '6px', objectFit: 'cover' }}
              // />
              <img
                src={`/${homeData.image}`}
                alt="Threat Timeline"
                style={{
                  width: '100%',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  height: '500px', // Default to desktop height
                  maxHeight: '200px', // Responsive for xs screens
                }}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
