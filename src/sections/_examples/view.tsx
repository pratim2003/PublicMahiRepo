'use client';

import React from 'react';
import { m } from 'framer-motion';

import { Box, Container, Typography } from '@mui/material';

import { varFade, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function ComponentsView({ homeData }: { homeData: any }) {
  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: 6 }}>
      <Container sx={{ maxWidth: '1000px !important' }}>
        {' '}
        {/* Header */}
        <MotionContainer sx={{ textAlign: 'center', mb: 6 }}>
          <m.div variants={varFade().inUp}>
            <Typography
              sx={{
                fontFamily: "'Merriweather', serif",
                fontSize: { xs: '2rem', md: '5.2rem' },
                fontWeight: 400,
                mb: 5,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              WRITING & REPORTING
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Typography
              sx={{
                fontFamily: "'Roboto Slab', serif",
                fontSize: { xs: '1.25rem', md: '1.75rem' },
                fontWeight: 500,
                textAlign: 'left',
                mb: 1,
              }}
            >
              {homeData[0]?.title}
            </Typography>
          </m.div>

          <Typography
            sx={{
              fontFamily: "'Roboto Slab', serif",
              fontSize: '1.75rem',
              color: '#ccc',
              mb: 0.5,
              textAlign: 'left',
            }}
          >
            {homeData[0]?.subtitle}
          </Typography>

          <Typography
            sx={{
              fontFamily: "'Roboto Slab', serif",
              fontSize: '0.95rem',

              color: '#bbb',
              textAlign: 'left',
            }}
          >
            {homeData[0]?.authors?.join(' , ')}
          </Typography>
        </MotionContainer>
        {}
        {/* </Box> */}
        <Box
          sx={{
            fontFamily: "'Roboto Slab', serif",
            fontSize: '1.05rem',
            lineHeight: 1.9,
            '& p': { marginBottom: '1.5rem' }, // style <p> like Typography paragraphs
          }}
        >
          {homeData[0]?.body.split('</p>').map((chunk: any, index: number) => (
            <React.Fragment key={index}>
              <div dangerouslySetInnerHTML={{ __html: `${chunk}</p>` }} />

              {/* First image after 2nd paragraph */}
              {index === 1 && homeData[0]?.images[0] && (
                <Box sx={{ textAlign: 'center', my: 6 }}>
                  <img
                    src={`/${homeData[0]?.images[0]}`}
                    alt="Threat Timeline"
                    style={{
                      height: '500px',
                      width: '100%',
                      // maxWidth: '100%', // full-width for first image
                      // borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                  />
                  <Box
                    component="figcaption"
                    sx={{
                      fontSize: '0.85rem',
                      color: 'gray',
                      mt: 1,
                      fontStyle: 'italic',
                    }}
                  >
                    2024–2025 Email Threat Timeline
                  </Box>
                </Box>
              )}

              {/* Second image after 8th paragraph */}
              {index === 7 && homeData[0]?.images[1] && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    my: 6,
                  }}
                >
                  <Box
                    sx={{
                      height: '670px', 
                      minWidth: '800px', // keeps it big but not too wide
                      backgroundColor: '#f9f9f9',
                      // borderRadius: '10px',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
                      p: 2,
                    }}
                  >
                    <img
                      src={`/${homeData[0]?.images[1]}`}
                      alt="School Safety Statistics"
                      style={{
                       
                        borderRadius: '12px',
                      }}
                    />
                    <Box
                      component="figcaption"
                      sx={{
                        fontSize: '0.85rem',
                        color: 'gray',
                        mt: 1,
                        textAlign: 'center',
                        fontStyle: 'italic',
                      }}
                    >
                      Source: National Center for Education Statistics
                    </Box>
                  </Box>
                </Box>
              )}
            </React.Fragment>
          ))}
        </Box>
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
