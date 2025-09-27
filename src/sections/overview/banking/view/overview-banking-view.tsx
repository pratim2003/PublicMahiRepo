// 'use client';

// import Image from 'next/image';
// import toast from 'react-hot-toast';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// import { Box, Grid, Button, Container, TextField, Typography } from '@mui/material';

// import { DashboardContent } from 'src/layouts/dashboard';

// export function OverviewBankingView({ designData }: { designData: any[] }) {
//   const latest = designData[0];
//   const router = useRouter();

//   // If no data
//   if (!latest) {
//     return (
//       <Box sx={{ py: 6, textAlign: 'center' }}>
//         <Typography>No broadcast data found.</Typography>
//       </Box>
//     );
//   }

//   // State for edit/view
//   const [isEditing, setIsEditing] = useState(false);

//   // Editable form data
//   const [editableData, setEditableData] = useState({
//     heading: latest.heading || '',
//     containt: latest.containt || '',
//     subHead1: latest.subHead1 || '',
//     subHead2: latest.subHead2 || '',
//     images: latest.images || [], // existing images
//   });

//   // Files to upload
//   const [files, setFiles] = useState<{ [key: number]: File | null }>({});

//   // Handle text input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setEditableData({ ...editableData, [name]: value });
//   };

//   // Handle image file change
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     if (e.target.files && e.target.files[0]) {
//       const newFiles = { ...files, [index]: e.target.files[0] };
//       setFiles(newFiles);

//       // Optional: preview new image
//       const newImages = [...editableData.images];
//       newImages[index] = URL.createObjectURL(e.target.files[0]);
//       setEditableData({ ...editableData, images: newImages });
//     }
//   };

//   // Add new image slot
//   const handleAddImage = () => {
//     setEditableData({ ...editableData, images: [...editableData.images, ''] });
//   };

//   // Submit form
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('heading', editableData.heading);
//       formData.append('containt', editableData.containt);
//       formData.append('subHead1', editableData.subHead1);
//       formData.append('subHead2', editableData.subHead2);

//       // Append files
//       Object.keys(files).forEach((key) => {
//         const f = files[Number(key)];
//         if (f) formData.append('files', f);
//       });

//       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL1}/api/fpii/design`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!res.ok) throw new Error('Failed to update');
//       await res.json();
//       setIsEditing(false);
//       router.refresh();
//       toast.success('Content updated successfully!');
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to update content');
//     }
//   };

//   return (
//     <DashboardContent maxWidth="xl">
//       <Box sx={{ bgcolor: 'black', color: 'white', py: 6 }}>
//         <Container sx={{ maxWidth: '950px !important', position: 'relative' }}>
//           {/* Edit Button */}
//           {!isEditing && (
//             <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
//               <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
//                 Edit
//               </Button>
//             </Box>
//           )}

//           {/* Edit Form */}
//           {isEditing ? (
//             <Box
//               component="form"
//               onSubmit={handleSubmit}
//               sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
//             >
//               <TextField
//                 label="Heading"
//                 name="heading"
//                 value={editableData.heading}
//                 onChange={handleChange}
//                 fullWidth
//                 InputProps={{
//                   style: { color: 'white' }, // text inside field
//                 }}
//                 InputLabelProps={{
//                   style: { color: 'white' }, // label color
//                 }}
//               />
//               <TextField
//                 label="Content"
//                 name="containt"
//                 value={editableData.containt}
//                 onChange={handleChange}
//                 fullWidth
//                 multiline
//                 rows={6}
//                 InputProps={{
//                   style: { color: 'white' }, // text inside field
//                 }}
//                 InputLabelProps={{
//                   style: { color: 'white' }, // label color
//                 }}
//               />
//               <TextField
//                 label="Sub Head 1"
//                 name="subHead1"
//                 value={editableData.subHead1}
//                 onChange={handleChange}
//                 fullWidth
//                 InputProps={{
//                   style: { color: 'white' }, // text inside field
//                 }}
//                 InputLabelProps={{
//                   style: { color: 'white' }, // label color
//                 }}
//               />
//               <TextField
//                 label="Sub Head 2"
//                 name="subHead2"
//                 value={editableData.subHead2}
//                 onChange={handleChange}
//                 fullWidth
//                 InputProps={{
//                   style: { color: 'white' }, // text inside field
//                 }}
//                 InputLabelProps={{
//                   style: { color: 'white' }, // label color
//                 }}
//               />

//               {/* Existing images */}
//               {editableData.images.map((img: string, index: number) => (
//                 <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                   {/* {img && (
//                     <img
//                       src={`/${img}`}
//                       alt={`Preview ${index}`}
//                       style={{ width: '120px', height: '80px', objectFit: 'cover' }}
//                     />
//                   )} */}
//                   <TextField
//                     type="file"
//                     inputProps={{ accept: 'image/*' }}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                       handleFileChange(e, index)
//                     }
//                   />
//                 </Box>
//               ))}

//               {/* <Button variant="outlined" onClick={handleAddImage}>
//                 Add Image
//               </Button> */}

//               <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
//                 <Button type="submit" variant="contained" color="primary">
//                   Save
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="outlined"
//                   color="secondary"
//                   onClick={() => setIsEditing(false)}
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             </Box>
//           ) : (
//             // View Mode
//             <>
//               <Container sx={{ textAlign: 'center', mb: 6 }}>
//                 <Typography
//                   sx={{
//                     fontFamily: "'Merriweather', serif",
//                     fontSize: { xs: '2rem', md: '5.2rem' },
//                     fontWeight: 400,
//                     mb: 2,
//                     mt: 6,
//                     textTransform: 'uppercase',
//                     letterSpacing: 1,
//                   }}
//                 >
//                   {latest.heading}
//                 </Typography>
//               </Container>

//               <Box
//                 sx={{
//                   fontFamily: "'Roboto Slab', serif",
//                   fontSize: '1.05rem',
//                   lineHeight: 1.9,
//                   '& p': { marginBottom: '1.5rem' },
//                   mb: 6,
//                   color: '#ccc',
//                 }}
//               >
//                 <div dangerouslySetInnerHTML={{ __html: latest.containt }} />
//               </Box>

//               <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
//                 {latest.images?.map((img: any, index: number) => (
//                   <Grid item xs={12} md={6} key={index} textAlign="center">
//                     <Image
//                       src={`/${img}`}
//                       alt={`Design ${index + 1}`}
//                       width={800}
//                       height={580}
//                       priority
//                       style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 1 }}
//                     />
//                     <Typography
//                       variant="subtitle1"
//                       sx={{
//                         fontFamily: "'Roboto Slab', serif",
//                         fontWeight: 600,
//                         textTransform: 'uppercase',
//                       }}
//                     >
//                       {index === 0 ? latest.subHead1 : latest.subHead2}
//                     </Typography>
//                   </Grid>
//                 ))}
//               </Grid>
//             </>
//           )}
//         </Container>
//       </Box>
//     </DashboardContent>
//   );
// }

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Grid, Container, Typography, TextField, Button } from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import DeployButton from '../../../../layouts/components/deploye-button';
export function OverviewBankingView({ designData }: { designData: any[] }) {
  const latest = designData[0];
  const router = useRouter();
const [showDeploy, setShowDeploy] = useState(false);
  // If no data
  if (!latest) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography>No broadcast data found.</Typography>
      </Box>
    );
  }

  // State for edit/view
  const [isEditing, setIsEditing] = useState(false);

  // Editable form data
  const [editableData, setEditableData] = useState({
    heading: latest.heading || '',
    containt: latest.containt || '',
    subHead1: latest.subHead1 || '',
    subHead2: latest.subHead2 || '',
    images: latest.images || [], // existing images
  });

  // Files to upload
  const [files, setFiles] = useState<{ [key: number]: File | null }>({});

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  // Handle image file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = { ...files, [index]: e.target.files[0] };
      setFiles(newFiles);

      // Optional: preview new image
      const newImages = [...editableData.images];
      newImages[index] = URL.createObjectURL(e.target.files[0]);
      setEditableData({ ...editableData, images: newImages });
    }
  };

  // Add new image slot
  const handleAddImage = () => {
    setEditableData({ ...editableData, images: [...editableData.images, ''] });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('heading', editableData.heading);
      formData.append('containt', editableData.containt);
      formData.append('subHead1', editableData.subHead1);
      formData.append('subHead2', editableData.subHead2);

      // Append files
      Object.keys(files).forEach((key) => {
        const f = files[Number(key)];
        if (f) formData.append('files', f);
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL1}/api/fpii/design`, {
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
      <Box sx={{ bgcolor: 'black', color: 'white', py: 6 }}>
        <Container sx={{ maxWidth: '950px !important', position: 'relative' }}>
          {/* Edit Button */}
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

          {/* Edit Form */}
          {isEditing ? (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                label="Heading"
                name="heading"
                value={editableData.heading}
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
                label="Content"
                name="containt"
                value={editableData.containt}
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
                label="Sub Head 1"
                name="subHead1"
                value={editableData.subHead1}
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
                label="Sub Head 2"
                name="subHead2"
                value={editableData.subHead2}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  style: { color: 'white' }, // text inside field
                }}
                InputLabelProps={{
                  style: { color: 'white' }, // label color
                }}
              />

              {/* Existing images */}
              {editableData.images.map((img: string, index: number) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {/* {img && (
                    <img
                      src={`/${img}`}
                      alt={`Preview ${index}`}
                      style={{ width: '120px', height: '80px', objectFit: 'cover' }}
                    />
                  )} */}
                  <TextField
                    type="file"
                    inputProps={{ accept: 'image/*' }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleFileChange(e, index)
                    }
                  />
                </Box>
              ))}

              {/* <Button variant="outlined" onClick={handleAddImage}>
                Add Image
              </Button> */}

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
            // View Mode
            <>
              <Container sx={{ textAlign: 'center', mb: 6 }}>
                <Typography
                  sx={{
                    fontFamily: "'Merriweather', serif",
                    fontSize: { xs: '2rem', md: '5.2rem' },
                    fontWeight: 400,
                    mb: 2,
                    mt: 6,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}
                >
                  {latest.heading}
                </Typography>
              </Container>

              <Box
                sx={{
                  fontFamily: "'Roboto Slab', serif",
                  fontSize: '1.05rem',
                  lineHeight: 1.9,
                  '& p': { marginBottom: '1.5rem' },
                  mb: 6,
                  color: '#ccc',
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: latest.containt }} />
              </Box>

              <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
                {latest.images?.map((img: any, index: number) => (
                  <Grid item xs={12} md={6} key={index} textAlign="center">
                    <Image
                      src={`/${img}`}
                      alt={`Design ${index + 1}`}
                      width={800}
                      height={580}
                      priority
                      style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 1 }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: "'Roboto Slab', serif",
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}
                    >
                      {index === 0 ? latest.subHead1 : latest.subHead2}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Container>
      </Box>
    </DashboardContent>
  );
}
