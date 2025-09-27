'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { useMockedUser } from 'src/auth/hooks';

import DeployButton from '../../../../layouts/components/deploye-button';

// ----------------------------------------------------------------------

export function OverviewEcommerceView({ writingData }: { writingData: any }) {
  const { user } = useMockedUser();
  const theme = useTheme();
  const router = useRouter();
  const [showDeploy, setShowDeploy] = useState(false);

  // State
  const [isEditing, setIsEditing] = useState(false);

  const [editableData, setEditableData] = useState({
    title: writingData[0]?.title || '',
    subtitle: writingData[0]?.subtitle || '',
    authors: writingData[0]?.authors?.join(', ') || '',
    body: writingData[0]?.body || '',
    file1: null as File | null,
    file2: null as File | null,
  });

  // Input handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  const [files, setFiles] = useState<{ [key: string]: File | null }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles((prev) => ({ ...prev, [key]: e.target.files![0] }));
    }
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', editableData.title);
      formData.append('subtitle', editableData.subtitle);
      formData.append('authors', editableData.authors);
      formData.append('body', editableData.body);

      if (files.file1) {
        formData.append('files', files.file1);
      }
      if (files.file2) {
        formData.append('files', files.file2);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL1}/api/fpii/write`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to update');

      await res.json();
      await new Promise((resolve) => setTimeout(resolve, 300));

      setIsEditing(false);
      setShowDeploy(true);
      router.refresh();
      toast.success('Writing content updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update content');
    }
  };

  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          bgcolor: 'black',
          color: 'white',
          pt: 13,
          pb: { xs: 8, md: 10 },
          position: 'relative',
        }}
      >
        <Container sx={{ maxWidth: '1000px !important' }}>
          {/* 🔹 Top-right Edit Button */}
          {!isEditing && (
            <>
              <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
                <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              </Box>
              {showDeploy && (
                <Box mt={3}>
                  <DeployButton />
                </Box>
              )}
            </>
          )}

          {/* 🔹 Edit Form */}
          {isEditing ? (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, color: '#fff' }}
            >
              <TextField
                label="Title"
                name="title"
                value={editableData.title}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  style: { color: 'white' }, // text inside field
                }}
                InputLabelProps={{
                  style: { color: 'white' }, // label color
                }}
              />
              <TextField
                label="Subtitle"
                name="subtitle"
                value={editableData.subtitle}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  style: { color: 'white' }, // text inside field
                }}
                InputLabelProps={{
                  style: { color: 'white' }, // label color
                }}
              />
              <TextField
                label="Authors (comma separated)"
                name="authors"
                value={editableData.authors}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  style: { color: 'white' }, // text inside field
                }}
                InputLabelProps={{
                  style: { color: 'white' }, // label color
                }}
              />
              <TextField
                label="Body"
                name="body"
                value={editableData.body}
                onChange={handleChange}
                fullWidth
                multiline
                rows={6}
                InputProps={{
                  style: { color: 'white' }, // text inside field
                }}
                InputLabelProps={{
                  style: { color: 'white' }, // label color
                }}
              />
              <TextField
                type="file"
                inputProps={{ accept: 'image/*' }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, 'file1')}
              />

              <TextField
                type="file"
                inputProps={{ accept: 'image/*' }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, 'file2')}
              />

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
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
          ) : (
            // 🔹 Normal Page UI
            <>
              <Box sx={{ textAlign: 'start', mb: 6 }}>
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
                  {writingData[0]?.title}
                </Typography>

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
                  {writingData[0]?.subtitle}
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
                  By {writingData[0]?.authors?.join(' & ')}
                </Typography>
              </Box>

              {/* Body with images */}
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
                {writingData[0]?.body.split('</p>').map((chunk: any, index: number) => (
                  <div key={index}>
                    <div dangerouslySetInnerHTML={{ __html: `${chunk}</p>` }} />

                    {index === 1 && writingData[0]?.images[0] && (
                      <Box sx={{ textAlign: 'center', my: 6 }}>
                        <Image
                          src={`/${writingData[0]?.images[0]}`}
                          alt="Threat Timeline"
                          width={800}
                          height={500}
                          style={{ objectFit: 'cover' }}
                        />
                      </Box>
                    )}

                    {index === 7 && writingData[0]?.images[1] && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
                        <Image
                          src={`/${writingData[0]?.images[1]}`}
                          alt="School Safety Statistics"
                          width={800}
                          height={530}
                          style={{ borderRadius: '12px' }}
                        />
                      </Box>
                    )}
                  </div>
                ))}
              </Box>
            </>
          )}
        </Container>
      </Box>
    </DashboardContent>
  );
}
