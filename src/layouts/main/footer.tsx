'use client';

import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState } from 'react';
import toast from 'react-hot-toast';

import { useTheme } from '@mui/material/styles';
import { Box, Grid, Button, Container, TextField, Typography } from '@mui/material';

// import contact from './contact';

export type FooterProps = {
  layoutQuery: Breakpoint;
  sx?: SxProps<Theme>;
};

export function Footer({ layoutQuery, sx }: FooterProps) {
  const theme = useTheme();

  // Contact form state
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`https://api.4pillarsinfotechindia.com/api/contactUs/next/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send message');
      toast.success('✅ Message sent successfully!');
      setFormData({ firstname: '', lastname: '', email: '', message: '' });
    } catch (err) {
      toast.error('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: '#000',
        color: '#fff',
        pl: { xs: 7 },
        ...sx,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          pb: 5,
          px: { xs: 2, md: 15 },
          textAlign: 'center',
          [theme.breakpoints.up(layoutQuery)]: { textAlign: 'unset' },
        }}
      >
        <Grid container spacing={6} justifyContent="center" alignItems="flex-start">
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Typography
              sx={{
                fontFamily: "'Century Gothic', 'Futura', 'Poppins', 'Montserrat', sans-serif",
                fontSize: '1.8rem',
                fontWeight: 400,
                letterSpacing: '0.5px',
                mb: 3,
              }}
            >
              Contact Maahi
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: 'white', mb: 1 }}>
                  First name
                </Typography>
                <TextField
                  fullWidth
                  name="firstname"
                  required
                  value={formData.firstname}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{ sx: { bgcolor: 'white', borderRadius: 0, color: 'black' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: 'white', mb: 1 }}>
                  Last name
                </Typography>
                <TextField
                  fullWidth
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{ sx: { bgcolor: 'white', borderRadius: 0, color: 'black' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: 'white', mb: 1 }}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{ sx: { bgcolor: 'white', borderRadius: 0, color: 'black' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: 'white', mb: 1 }}>
                  Message
                </Typography>
                <TextField
                  fullWidth
                  name="message"
                  multiline
                  value={formData.message}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{ sx: { bgcolor: 'white', borderRadius: 0, color: 'black' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="outlined"
                  disabled={loading}
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    px: 10,
                    py: 1,
                    borderRadius: 3,
                    ':hover': { backgroundColor: '#757c88' },
                  }}
                >
                  {loading ? 'Sending...' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
