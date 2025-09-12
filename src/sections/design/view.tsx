'use client';

import React from 'react';
import { m } from 'framer-motion';

import { Box, Grid, Button, Container, TextField, Typography } from '@mui/material';

import { varFade, MotionContainer } from 'src/components/animate';

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
      <Container maxWidth="lg">
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
              {latest?.heading}
            </Typography>
          </m.div>
        </MotionContainer>

        {/* Content */}
        <Box
          sx={{
            fontFamily: "'Roboto Slab', serif",
            fontSize: '1.05rem',
            lineHeight: 1.9,
            '& p': { marginBottom: '1.5rem' },
            mb: 6,
            textAlign: 'center',
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: latest.containt }} />
        </Box>

        {/* Images with captions */}
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
          {latest.images?.map((img: any, index: any) => (
            <Grid item xs={12} md={6} key={index} textAlign="center">
              <Box
                component="img"
                src={`/${img}`}
                alt={`Design ${index + 1}`}
                sx={{
                  width: '100%',
                  height: 400, // ✅ Fixed height for uniform size
                  objectFit: 'cover', // ✅ crops the image without distortion
                  borderRadius: 2,
                  boxShadow: 3,
                  mb: 2,
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

        {/* Contact Form */}
        {/* <Box sx={{ mt: 8 }}>
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
        </Box> */}
      </Container>
    </Box>
  );
}
