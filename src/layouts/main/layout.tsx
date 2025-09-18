'use client';

import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Alert from '@mui/material/Alert';
import { Typography, Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'src/routes/hooks';
import Link from 'next/link';
import { useBoolean } from 'src/hooks/use-boolean';

import { Logo } from 'src/components/logo';

import { Main } from './main';
import { Footer } from './footer';
import { NavMobile } from './nav/mobile';
import { NavDesktop } from './nav/desktop';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { navData as mainNavData } from '../config-nav-main';

import type { NavMainProps } from './nav/types';

// ----------------------------------------------------------------------

export type MainLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  data?: {
    nav?: NavMainProps['data'];
  };
};

export function MainLayout({ sx, data, children, header }: MainLayoutProps) {
  const theme = useTheme();
  const pathname = usePathname();
  const mobileNavOpen = useBoolean();
  const layoutQuery: Breakpoint = 'md';
  const navData = data?.nav ?? mainNavData;

  return (
    <>
      {/* ---------- Full-width header (outside any centered parent) ---------- */}
      <Box
        component="header"
        sx={{
          position: 'sticky', // or 'fixed' if you prefer
          top: 0,
          left: 0,
          width: '100vw', // span the viewport
          zIndex: 1300,
          backgroundColor: 'black',
        }}
      >
        {/* Content is centered inside the Container, but the header wrapper is full-width */}
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // pushes left block to left, right block to right
            py: 1,
            px: { xs: 2, md: 5 },
          }}
        >
          {/* Left block */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MenuButton
              onClick={mobileNavOpen.onTrue}
              sx={{
                mr: 1,
                ml: -1,
                [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
              }}
            />
            <Logo />
            <Typography
              sx={{
                pl: '10px',
                color: '#e6e6e6',
                letterSpacing: 0.5,
                fontSize: '12px',
                fontFamily: "'Century Gothic', 'Futura', 'Poppins', 'Montserrat', sans-serif",
              }}
            >
              Maahi Dev&apos;s Portfolio
            </Typography>
          </Box>

          {/* Right block (desktop links) */}
          <Box
            sx={{
              display: 'none',
              [theme.breakpoints.up(layoutQuery)]: { display: 'flex' },
              gap: 3,
              alignItems: 'center',
            }}
          >
            {navData.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <Typography
                  sx={{
                    color: '#e6e6e6',
                    letterSpacing: 0.5,
                    fontSize: '12px',
                    fontFamily: "'Century Gothic', 'Futura', 'Poppins', 'Montserrat', sans-serif",
                  }}
                >
                  {item.title}
                </Typography>
              </Link>
            ))}
          </Box>
        </Container>

        {/* Mobile drawer (keeps it at top-level so it overlays correctly) */}
        <NavMobile data={navData} open={mobileNavOpen.value} onClose={mobileNavOpen.onFalse} />
      </Box>

      {/* ---------- Page content (leave LayoutSection / Footer as-is) ---------- */}
      <LayoutSection
        footerSection={<Footer layoutQuery={layoutQuery} />}
        sx={{ backgroundColor: 'black' }}
      >
        <Main>{children}</Main>

        {/* Toast container */}
        <Toaster position="top-right" reverseOrder={false} />
      </LayoutSection>
    </>
  );
}
