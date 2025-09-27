'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Container, Typography, Button, TextField } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { DashboardContent } from 'src/layouts/dashboard';
import DeployButton from '../../../../layouts/components/deploye-button';
import { useMockedUser } from 'src/auth/hooks';

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
)}</>
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

{
  /* <Grid container spacing={3}>
  <Grid xs={12} md={8}>
    <EcommerceWelcome
      title={`Congratulations 🎉  \n ${user?.displayName}`}
      description="Best seller of the month you have done 57.6% more sales today."
      img={<MotivationIllustration hideBackground />}
      action={
        <Button variant="contained" color="primary">
          Go now
        </Button>
      }
    />
  </Grid>

  <Grid xs={12} md={4}>
    <EcommerceNewProducts list={_ecommerceNewProducts} />
  </Grid>

  <Grid xs={12} md={4}>
    <EcommerceWidgetSummary
      title="Product sold"
      percent={2.6}
      total={765}
      chart={{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        series: [22, 8, 35, 50, 82, 84, 77, 12],
      }}
    />
  </Grid>

  <Grid xs={12} md={4}>
    <EcommerceWidgetSummary
      title="Total balance"
      percent={-0.1}
      total={18765}
      chart={{
        colors: [theme.vars.palette.warning.light, theme.vars.palette.warning.main],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        series: [56, 47, 40, 62, 73, 30, 23, 54],
      }}
    />
  </Grid>

  <Grid xs={12} md={4}>
    <EcommerceWidgetSummary
      title="Sales profit"
      percent={0.6}
      total={4876}
      chart={{
        colors: [theme.vars.palette.error.light, theme.vars.palette.error.main],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        series: [40, 70, 75, 70, 50, 28, 7, 64],
      }}
    />
  </Grid>

  <Grid xs={12} md={6} lg={4}>
    <EcommerceSaleByGender
      title="Sale by gender"
      total={2324}
      chart={{
        series: [
          { label: 'Mens', value: 25 },
          { label: 'Womens', value: 50 },
          { label: 'Kids', value: 75 },
        ],
      }}
    />
  </Grid>

  <Grid xs={12} md={6} lg={8}>
    <EcommerceYearlySales
      title="Yearly sales"
      subheader="(+43%) than last year"
      chart={{
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        series: [
          {
            name: '2022',
            data: [
              {
                name: 'Total income',
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
              },
              {
                name: 'Total expenses',
                data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
              },
            ],
          },
          {
            name: '2023',
            data: [
              {
                name: 'Total income',
                data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
              },
              {
                name: 'Total expenses',
                data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
              },
            ],
          },
        ],
      }}
    />
  </Grid>

  <Grid xs={12} md={6} lg={8}>
    <EcommerceSalesOverview title="Sales overview" data={_ecommerceSalesOverview} />
  </Grid>

  <Grid xs={12} md={6} lg={4}>
    <EcommerceCurrentBalance
      title="Current balance"
      earning={25500}
      refunded={1600}
      orderTotal={287650}
      currentBalance={187650}
    />
  </Grid>

  <Grid xs={12} md={6} lg={8}>
    <EcommerceBestSalesman
      title="Best salesman"
      tableData={_ecommerceBestSalesman}
      headLabel={[
        { id: 'name', label: 'Seller' },
        { id: 'category', label: 'Product' },
        { id: 'country', label: 'Country', align: 'center' },
        { id: 'totalAmount', label: 'Total', align: 'right' },
        { id: 'rank', label: 'Rank', align: 'right' },
      ]}
    />
  </Grid>

  <Grid xs={12} md={6} lg={4}>
    <EcommerceLatestProducts title="Latest products" list={_ecommerceLatestProducts} />
  </Grid>
</Grid>; */
}
