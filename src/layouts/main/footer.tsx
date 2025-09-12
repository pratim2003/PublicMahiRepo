// import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Divider from '@mui/material/Divider';
// import { useTheme } from '@mui/material/styles';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Unstable_Grid2';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';

// import { paths } from 'src/routes/paths';
// import { RouterLink } from 'src/routes/components';

// import { _socials } from 'src/_mock';
// import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from 'src/assets/icons';

// import { Logo } from 'src/components/logo';

// // ----------------------------------------------------------------------

// const LINKS = [
//   {
//     headline: 'Minimal',
//     children: [
//       { name: 'About us', href: paths.about },
//       { name: 'Contact us', href: paths.contact },
//       { name: 'FAQs', href: paths.faqs },
//     ],
//   },
//   {
//     headline: 'Legal',
//     children: [
//       { name: 'Terms and condition', href: '#' },
//       { name: 'Privacy policy', href: '#' },
//     ],
//   },
//   { headline: 'Contact', children: [{ name: 'support@minimals.cc', href: '#' }] },
// ];

// // ----------------------------------------------------------------------

// export type FooterProps = {
//   layoutQuery: Breakpoint;
//   sx?: SxProps<Theme>;
// };

// export function Footer({ layoutQuery, sx }: FooterProps) {
//   const theme = useTheme();

//   return (
//     <Box component="footer" sx={{ position: 'relative', bgcolor: 'background.default', ...sx }}>
//       <Divider />

//       <Container
//         sx={{
//           pb: 5,
//           pt: 10,
//           textAlign: 'center',
//           [theme.breakpoints.up(layoutQuery)]: { textAlign: 'unset' },
//         }}
//       >
//         <Logo />

//         <Grid
//           container
//           sx={{
//             mt: 3,
//             justifyContent: 'center',
//             [theme.breakpoints.up(layoutQuery)]: { justifyContent: 'space-between' },
//           }}
//         >
//           <Grid {...{ xs: 12, [layoutQuery]: 3 }}>
//             <Typography
//               variant="body2"
//               sx={{
//                 mx: 'auto',
//                 maxWidth: 280,
//                 [theme.breakpoints.up(layoutQuery)]: { mx: 'unset' },
//               }}
//             >
//               The starting point for your next project with Minimal UI Kit, built on the newest
//               version of Material-UI ©, ready to be customized to your style.
//             </Typography>

//             <Stack
//               direction="row"
//               sx={{
//                 mt: 3,
//                 mb: 5,
//                 justifyContent: 'center',
//                 [theme.breakpoints.up(layoutQuery)]: { mb: 0, justifyContent: 'flex-start' },
//               }}
//             >
//               {_socials.map((social) => (
//                 <IconButton key={social.label} color="inherit">
//                   {social.value === 'twitter' && <TwitterIcon />}
//                   {social.value === 'facebook' && <FacebookIcon />}
//                   {social.value === 'instagram' && <InstagramIcon />}
//                   {social.value === 'linkedin' && <LinkedinIcon />}
//                 </IconButton>
//               ))}
//             </Stack>
//           </Grid>

//           <Grid {...{ xs: 12, [layoutQuery]: 6 }}>
//             <Stack
//               spacing={5}
//               sx={{
//                 flexDirection: 'column',
//                 [theme.breakpoints.up(layoutQuery)]: { flexDirection: 'row' },
//               }}
//             >
//               {LINKS.map((list) => (
//                 <Stack
//                   key={list.headline}
//                   spacing={2}
//                   sx={{
//                     width: 1,
//                     alignItems: 'center',
//                     [theme.breakpoints.up(layoutQuery)]: { alignItems: 'flex-start' },
//                   }}
//                 >
//                   <Typography component="div" variant="overline">
//                     {list.headline}
//                   </Typography>

//                   {list.children.map((link) => (
//                     <Link
//                       key={link.name}
//                       component={RouterLink}
//                       href={link.href}
//                       color="inherit"
//                       variant="body2"
//                     >
//                       {link.name}
//                     </Link>
//                   ))}
//                 </Stack>
//               ))}
//             </Stack>
//           </Grid>
//         </Grid>

//         <Typography variant="body2" sx={{ mt: 10 }}>
//           © All rights reserved.
//         </Typography>
//       </Container>
//     </Box>
//   );
// }

// // ----------------------------------------------------------------------

// export type HomeFooterProps = {
//   sx?: SxProps<Theme>;
// };

// export function HomeFooter({ sx }: HomeFooterProps) {
//   return (
//     <Box
//       component="footer"
//       sx={{
//         py: 5,
//         textAlign: 'center',
//         position: 'relative',
//         bgcolor: 'background.default',
//         ...sx,
//       }}
//     >
//       <Container>
//         <Logo />
//         <Box sx={{ mt: 1, typography: 'caption' }}>
//           © All rights reserved.
//           <br /> made by
//           <Link href="https://minimals.cc/"> minimals.cc </Link>
//         </Box>
//       </Container>
//     </Box>
//   );
// }

'use client';

import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export type FooterProps = {
  layoutQuery: Breakpoint;
  sx?: SxProps<Theme>;
};

export function Footer({ layoutQuery, sx }: FooterProps) {
  const theme = useTheme();

  // Contact form state and logic
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

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
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: '#000', // Set the background to black
        color: '#fff', // Set default text color to white
        // py: { xs: 6, md: 10 },
        px: { xs: 2, md: 10 },
        ...sx,
      }}
    >
      {/* <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} /> */}

      <Container
        sx={{
          pb: 5,
          // pt: 10,
          px: { xs: 2, md: 10 },
          textAlign: 'center',
          [theme.breakpoints.up(layoutQuery)]: { textAlign: 'unset' },
        }}
      >
        <Grid container spacing={6} justifyContent="center" alignItems="flex-start">
          {/* Contact Form */}
          <Box sx={{ mt: 8 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontFamily: "'Merriweather', serif",
                fontWeight: 600,
                mb: 3,
              }}
            >
              Contact Maahi
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First name"
                  variant="outlined"
                  InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  variant="outlined"
                  InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Typography variant="body2" sx={{ mt: 10 }}>
          © All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

// The HomeFooter and HomeFooterProps have been removed as per your request
