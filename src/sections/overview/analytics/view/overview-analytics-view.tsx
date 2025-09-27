'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Box, Grid, Button, Container, TextField, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import DeployButton from '../../../../layouts/components/deploye-button';

export function OverviewAnalyticsView({ journalismData }: { journalismData: any }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeploy, setShowDeploy] = useState(false);
  const [editableData, setEditableData] = useState({
    heading: journalismData[0]?.heading || '',
    content: journalismData[0]?.content || '',
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('heading', editableData.heading);
      formData.append('content', editableData.content);
      if (file) formData.append('file', file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL1}/api/fpii/photojournalism`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to update');
      await res.json();
      setIsEditing(false);
      setShowDeploy(true);
      router.refresh();

      toast.success('Content updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update content');
    }
  };

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ bgcolor: 'black', color: 'white', py: { xs: 4, md: 6 }, pb: { xs: 8, md: 10 } }}>
        <Container sx={{ maxWidth: '950px !important', position: 'relative' }}>
          {/* 🔹 Edit Button */}
          {!isEditing && (
            <Box
              sx={{
                position: 'absolute',
                top: -30,
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                right: 0,
              }}
            >
              <>
                <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
                {showDeploy && <DeployButton />}
              </>
            </Box>
          )}

          {/* 🔹 Edit Form */}
          {isEditing ? (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, color: '#fff', mt: 4 }}
            >
              <TextField
                label="Heading"
                name="heading"
                value={editableData.heading}
                onChange={handleChange}
                fullWidth
                InputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <TextField
                label="Content"
                name="content"
                value={editableData.content}
                onChange={handleChange}
                fullWidth
                multiline
                rows={6}
                InputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <TextField
                type="file"
                inputProps={{ accept: 'image/*' }}
                onChange={handleFileChange}
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
            // 🔹 View Mode
            <>
              <Typography
                sx={{
                  fontFamily: "'Merriweather', serif",
                  fontSize: { xs: '2rem', md: '5.2rem' },
                  fontWeight: 400,
                  textAlign: 'center',
                  mb: { xs: 4, md: 6 },
                  mt: 6,
                  textTransform: 'uppercase',
                }}
              >
                {journalismData[0]?.heading}
              </Typography>

              <Grid container spacing={4} alignItems="flex-start">
                <Grid item xs={12} md={7}>
                  <Box sx={{ width: '100%', mx: 'auto' }}>
                    <Image
                      src={file ? URL.createObjectURL(file) : `/${journalismData[0]?.image}`}
                      alt={journalismData[0]?.heading}
                      width={700}
                      height={350}
                      style={{
                        maxHeight: '350px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={5}>
                  <Typography
                    sx={{
                      fontFamily: "'Roboto Slab', serif",
                      fontSize: { xs: '1rem', md: '1.05rem' },
                      lineHeight: 1.8,
                      color: '#ccc',
                      textAlign: 'justify',
                      px: { xs: 1, sm: 2, md: 0 },
                    }}
                  >
                    {journalismData[0]?.content}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
        </Container>
      </Box>
    </DashboardContent>
  );
}
