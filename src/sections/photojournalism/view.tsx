'use client';

import React from 'react';
import { m } from 'framer-motion';

import { Box, Container, Typography, Grid } from '@mui/material';

import { varFade, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function ComponentsView({ homeData }: { homeData: any }) {
  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: 6, pb: 15 }}>
      <Container maxWidth="lg">
        {/* Heading */}
        <Typography
          sx={{
            fontFamily: "'Merriweather', serif",
            fontSize: { xs: '2rem', md: '5.2rem' },
            fontWeight: 400,
            textAlign: 'center',
            mb: 6,
            textTransform: 'uppercase',
          }}
        >
         {homeData[0]?.heading}
        </Typography>

        {/* Image + Content */}
        <Grid container spacing={4} alignItems="flex-start">
          {/* Image */}
          <Grid item xs={12} md={6}>
            <img
              src={`/${homeData[0]?.image}`}
              alt={homeData[0]?.heading}
              style={{
                width: '80%',
                height: '100%', // fill available height
                maxHeight: '350px', // control max height
                objectFit: 'cover', // keeps aspect ratio, crops nicely
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                marginLeft: '20%',
              }}
            />
          </Grid>

          {/* Text */}
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontFamily: "'Roboto Slab', serif",
                fontSize: '1.05rem',
                lineHeight: 1.9,
                color: '#ccc',
                textAlign: 'justify',
                marginRight: '30%',
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

// Shared styles
const bodyStyle = {
  fontFamily: "'Roboto Slab', serif",
  fontSize: '1.2rem',
  lineHeight: 1.9,
  mb: 3,
};

const italicStyle = {
  ...bodyStyle,
  fontStyle: 'italic',
};
