'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';

import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { useMockedUser } from 'src/auth/hooks';

import DeployButton from '../../../../layouts/components/deploye-button';

// ----------------------------------------------------------------------
type HomeData = {
  heading: string;
  body: string;
  image?: string; // URL or filename of existing image
};

export function OverviewAppView({ homeData }: { homeData: HomeData }) {
  const router = useRouter();
  const { user } = useMockedUser();
  const theme = useTheme();

  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState('');
  const [showDeploy, setShowDeploy] = useState(false);
  // Editable data including file
  const [editableData, setEditableData] = useState({
    heading: homeData.heading || '',
    body: homeData.body || '',
    file: null as File | null,
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditableData({ ...editableData, file: e.target.files[0] });
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('heading', editableData.heading);
      formData.append('body', editableData.body);
      if (editableData.file) {
        formData.append('file', editableData.file);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL1}/api/fpii/home`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to update');

      await res.json();
      await new Promise((resolve) => setTimeout(resolve, 300));

      setIsEditing(false);
      setShowDeploy(true);
      router.refresh();
      toast.success('Home content updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update content');
    }
  };

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ backgroundColor: '#000', color: '#fff', py: { xs: 8, md: 10 } }}>
        <Container sx={{ maxWidth: '950px !important' }}>
          <Grid container spacing={6} alignItems="center" mt={1}>
            {/* Left Content */}
            <Grid item xs={12} md={8}>
              {/* Heading */}
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
                {homeData.heading ? homeData.heading.substring(0, 10) : ''}
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
                {homeData.heading ? homeData.heading.substring(10) : ''}
              </Typography>

              {/* Body */}
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

              {/* Status Message */}
              {/* {status && (
                <Typography
                  sx={{
                    mt: 2,
                    color: status.includes('success') ? 'lightgreen' : 'red',
                    fontFamily: "'Roboto Slab', serif",
                  }}
                >
                  {status}
                </Typography>
              )} */}

              {/* Edit Button */}
              {!isEditing && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setEditableData({
                        heading: homeData.heading || '',
                        body: homeData.body || '',
                        file: null,
                      });
                      setIsEditing(true);
                    }}
                    sx={{ mt: 2 }}
                  >
                    Edit
                  </Button>
                  {showDeploy && (
                    <Box mt={3}>
                      <DeployButton />
                    </Box>
                  )}
                </>
              )}

              {/* Edit Form */}
              {isEditing && (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                  <TextField
                    label="Heading"
                    name="heading"
                    value={editableData.heading}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />

                  <TextField
                    label="Body"
                    name="body"
                    value={editableData.body}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />

                  <TextField
                    type="file"
                    onChange={handleFileChange}
                    variant="outlined"
                    fullWidth
                    label="Upload Image"
                    InputLabelProps={{ style: { color: '#fff' } }}
                  />

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                      Save
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      color="secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              )}
            </Grid>

            {/* Right file */}
            <Grid item xs={12} md={4} display="flex" justifyContent="center">
              {editableData.file ? (
                <img
                  src={URL.createObjectURL(editableData.file)}
                  alt="Preview"
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
              ) : (
                homeData.image && (
                  <img
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
                )
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardContent>
  );
}
