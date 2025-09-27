'use client';

import React from 'react';
import Image from 'next/image';

import { Box, Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export function ComponentsView({ homeData }: { homeData: any }) {
  return (
    <Box sx={{ bgcolor: 'black', color: 'white', pt: 13, pb: { xs: 8, md: 10 } }}>
      <Container sx={{ maxWidth: '1000px !important' }}>
        {' '}
        {/* Header */}
        <Box sx={{ textAlign: 'start', mb: 6 }}>
          <Box>
            <Typography
              sx={{
                fontFamily: "'Merriweather', serif",
                fontSize: { xs: '2rem', md: '4.9rem' },
                fontWeight: 400,
                mb: 5,
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: '#fff',
                WebkitTextStroke: '0.1px #000',
              }}
            >
              WRITING & REPORTING
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontFamily: "'Roboto Slab', serif",
                fontSize: { xs: '1.25rem', md: '2rem' },
                fontWeight: 400,
                textAlign: 'left',
                mb: 1,
                color: '#fff',
                WebkitTextStroke: '0.3px #000',
              }}
            >
              {homeData[0]?.title}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: "'Roboto Slab', serif",
              fontSize: '1.75rem',
              color: '#fff',
              mb: 0.5,
              textAlign: 'left',
              WebkitTextStroke: '0.3px #000',
            }}
          >
            {homeData[0]?.subtitle}
          </Typography>

          <Typography
            sx={{
              fontFamily: "'Roboto Slab', serif",
              fontSize: '1.2rem',
              color: '#fff',
              textAlign: 'left',
              WebkitTextStroke: '0.3px #000',
            }}
          >
            By {homeData[0]?.authors?.join(' & ')}
          </Typography>
        </Box>
        {/* </Box> */}
        <Box
          sx={{
            fontFamily: "'Roboto Slab', serif",
            fontSize: '1.2rem',
            lineHeight: 1.9,
            '& p': { marginBottom: '1.5rem' },
            color: '#fff',
            WebkitTextStroke: '0.3px #000',
          }}
        >
          {homeData[0]?.body.split('</p>').map((chunk: any, index: number) => (
            <React.Fragment key={index}>
              <div dangerouslySetInnerHTML={{ __html: `${chunk}</p>` }} />

              {/* First image after 2nd paragraph */}
              {index === 1 && homeData[0]?.images[0] && (
                <Box sx={{ textAlign: 'center', my: 6 }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: { xs: '200px', md: '500px' },
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      overflow: 'hidden', // prevent image overflow
                    }}
                  >
                    <Image
                      src={`/${homeData[0]?.images[0]}`}
                      alt="Threat Timeline"
                      width={800}
                      height={500}
                      priority
                      style={{
                        objectFit: 'cover', // ensures it scales properly
                      }}
                    />
                  </Box>

                  <Box
                    component="figcaption"
                    sx={{
                      fontSize: '0.85rem',
                      color: 'white',
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
                    px: { xs: 2, sm: 4, md: 0 }, // Padding on small screens
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: '100%', sm: '90%', md: '800px' },
                      height: { xs: 'auto', md: '580px' },
                      backgroundColor: '#f9f9f9',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
                      p: { xs: 2, sm: 3 },
                      borderRadius: '12px',
                    }}
                  >
                    <Image
                      src={`/${homeData[0]?.images[1]}`}
                      alt="School Safety Statistics"
                      width={800}
                      height={530}
                      priority
                      style={{
                        borderRadius: '12px',
                        display: 'block',
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
  color: '#fff',
  // WebkitTextStroke: '0.5px #000',
};

const italicStyle = {
  ...bodyStyle,
  fontStyle: 'italic',
};
