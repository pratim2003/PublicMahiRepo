'use client';

import Image from 'next/image';
import { Box, Grid, TextField, Typography, Button, Container } from '@mui/material';

import ProfilePic from '../../../public/assets/images/home/Party.png';

export function HomeHero() {
  return (
    <Box
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        py: { xs: 6, md: 10 },
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={7}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Maahi Dev
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                mb: 3,
              }}
            >
              Student Journalist
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                lineHeight: 1.8,
                fontSize: '1.05rem',
                maxWidth: '600px',
              }}
            >
              Maahi Dev is currently a freshman at Monta Vista High School. She loves crêpes and
              doing acrobatics and tumbling whenever she can. In her free time, she's often behind a
              camera, traveling with her family, or spending time with friends.
            </Typography>

            {/* Contact Form */}
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
              }}
            >
              Contact Maahi
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="First name"
                  variant="outlined"
                  InputLabelProps={{ style: { color: '#fff' } }}
                  InputProps={{ style: { color: '#fff' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Last name"
                  variant="outlined"
                  InputLabelProps={{ style: { color: '#fff' } }}
                  InputProps={{ style: { color: '#fff' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Email"
                  type="email"
                  variant="outlined"
                  InputLabelProps={{ style: { color: '#fff' } }}
                  InputProps={{ style: { color: '#fff' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Message"
                  variant="outlined"
                  InputLabelProps={{ style: { color: '#fff' } }}
                  InputProps={{ style: { color: '#fff' } }}
                />
              </Grid>
            </Grid>

            <Button
              variant="outlined"
              sx={{
                mt: 3,
                px: 4,
                py: 1,
                borderRadius: '30px',
                borderColor: '#fff',
                color: '#fff',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#000',
                },
              }}
            >
              Submit
            </Button>
          </Grid>

          {/* Right Image */}
          <Grid item xs={12} md={5} display="flex" justifyContent="center">
            <Image
              src={ProfilePic}
              alt="Profile"
              style={{
                borderRadius: '6px',
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
