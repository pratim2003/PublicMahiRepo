'use client';

import React from 'react';
import Image from 'next/image';

import { Box, Grid, Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export function ComponentsView({ homeData }: { homeData: any }) {
  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: { xs: 4, md: 6 }, pb: { xs: 8, md: 10 } }}>
      <Container sx={{ maxWidth: '950px !important' }}>
        {/* Heading */}
        <Typography
          sx={{
            fontFamily: "'Merriweather', serif",
            fontSize: { xs: '2rem', md: '5.2rem' },
            fontWeight: 400,
            textAlign: 'center',
            mb: { xs: 4, md: 6 },
            mt: 6,
            textTransform: 'uppercase',
          }}
        >
          {homeData[0]?.heading}
        </Typography>

        {/* Image + Content */}
        <Grid container spacing={4} alignItems="flex-start">
          {/* Image */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                width: { xs: '100%', sm: '100%', md: '100%' },
                mx: { xs: 'auto', md: 0 },
              }}
            >
              <Image
                src={`/${homeData[0]?.image}`}
                alt={homeData[0]?.heading}
                width={700}
                height={350}
                priority
                style={{
                  maxHeight: '350px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              />
            </Box>
          </Grid>

          {/* Text */}
          <Grid item xs={12} md={5}>
            <Typography
              sx={{
                fontFamily: "'Roboto Slab', serif",
                fontSize: { xs: '1rem', md: '1.05rem' },
                lineHeight: 1.8,
                color: '#ccc',
                textAlign: 'justify',
                px: { xs: 1, sm: 2, md: 0 }, // padding on small screens
                // mr: { md: '20%' }, // Only apply right margin on desktop
              }}
            >
              {homeData[0]?.content}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
