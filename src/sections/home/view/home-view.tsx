'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Box, Grid, Container, Typography } from '@mui/material';

// import DeployButton from '../../../components/deploye/DeployButton';

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
        // py: { xs: 8, md: 10 },
        py: { xs: 8, md: 8 },
      }}
    >
      <Container sx={{ maxWidth: '950px !important' }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={8}>
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
                lineHeight: 1.6,
                fontSize: '1.4rem',
                fontWeight: '300',
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

            {/* <DeployButton /> */}
          </Grid>

          {/* Right Image */}
          <Grid item xs={12} md={4} display="flex" justifyContent="center">
            {homeData.image && (
              // <Image
              //   src={`/${homeData.image}`}
              //   alt="Home"
              //   width={250}
              //   height={300}
              //   style={{ borderRadius: '6px', objectFit: 'cover' }}
              // />
              <Image
                src={`/${homeData.image}`}
                alt="Home"
                width={250}
                height={300}
                style={{
                  borderRadius: '1px',
                  objectFit: 'cover',
                  borderColor: '#fff',
                  borderWidth: 2,
                  borderStyle: 'solid',
                }}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
