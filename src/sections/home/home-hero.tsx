'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Box, Grid, TextField, Typography, Button, Container } from '@mui/material';
import ProfilePic from '../../../public/assets/images/home/Party.png';
import { profile } from 'console';

interface FetchedHomeData {
  data: {
    _id: string;
    heading: string;
    body: string;
    image: string;
    __v: number;
  }[];
}

interface HomeHeroProps {
  data: FetchedHomeData; // Use 'data' to be consistent with the previous example
}

export function HomeHero({ data }: HomeHeroProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const homeContent = data.data[0];
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send message');

      setStatus('Message sent successfully!');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (err) {
      setStatus('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              {homeContent.heading.split('', 10)}
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mb: 3 }}>
              {homeContent.heading.substring(10)}
            </Typography>

            <Typography
              variant="body1"
              sx={{ mb: 4, lineHeight: 1.8, fontSize: '1.05rem', maxWidth: '600px' }}
            >
              {homeContent.body}
            </Typography>

            {/* Contact Form */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Contact Maahi
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    label="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    sx={{
                      input: { color: '#fff' },
                      label: { color: '#fff' },
                      '& .MuiOutlinedInput-root fieldset': { borderColor: '#fff' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastName"
                    label="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    sx={{
                      input: { color: '#fff' },
                      label: { color: '#fff' },
                      '& .MuiOutlinedInput-root fieldset': { borderColor: '#fff' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    sx={{
                      input: { color: '#fff' },
                      label: { color: '#fff' },
                      '& .MuiOutlinedInput-root fieldset': { borderColor: '#fff' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="message"
                    label="Message"
                    value={formData.message}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    required
                    variant="outlined"
                    sx={{
                      textarea: { color: '#fff' },
                      label: { color: '#fff' },
                      '& .MuiOutlinedInput-root fieldset': { borderColor: '#fff' },
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="outlined"
                disabled={loading}
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
                {loading ? 'Sending...' : 'Submit'}
              </Button>
            </form>

            {status && (
              <Typography sx={{ mt: 2, color: status.includes('success') ? 'lightgreen' : 'red' }}>
                {status}
              </Typography>
            )}
          </Grid>

          {/* Right Image */}
          <Grid item xs={12} md={5} display="flex" justifyContent="center">
            <Image
              src={ProfilePic}
              alt="Profile"
              width={300}
              height={400}
              style={{ borderRadius: '6px', objectFit: 'cover' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
