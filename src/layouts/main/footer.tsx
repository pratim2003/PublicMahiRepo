'use client';

import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';
import toast from 'react-hot-toast';
import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Grid, Button, Container, TextField, Typography } from '@mui/material';

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/fpii/contactus`, {
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
              variant="h3"
              gutterBottom
              sx={{
                fontFamily: "'Merriweather', serif",
                fontWeight: 500,
                mb: 3,
              }}
            >
              Contact Maahi
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="firstname"
                  label="First name"
                  value={formData.firstname}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="lastname"
                  label="Last name"
                  value={formData.lastname}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="message"
                  label="Message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
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

            {/* Status message
            {status && (
              <Typography sx={{ mt: 2, color: status.startsWith('✅') ? 'lightgreen' : 'red' }}>
                {status}
              </Typography>
            )} */}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

// The HomeFooter and HomeFooterProps have been removed as per your request
