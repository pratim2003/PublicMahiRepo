'use client';

import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Alert from '@mui/material/Alert';
import { Typography, Box } from '@mui/material';
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

  const homePage = pathname === '/';

  const layoutQuery: Breakpoint = 'md';

  const navData = data?.nav ?? mainNavData;

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          sx={{
            ...header?.sx,
            color: 'white',

            top: 0,
            left: 0,
            width: '100%',
          }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                {/* -- Nav mobile -- */}
                <MenuButton
                  onClick={mobileNavOpen.onTrue}
                  sx={{
                    mr: 1,
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={mobileNavOpen.value}
                  onClose={mobileNavOpen.onFalse}
                />
                {/* -- Logo -- */}

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
              </>
            ),
            rightArea: (
              <>
                {/* -- Nav desktop -- */}
                <Box
                  sx={{
                    display: 'none',
                    [theme.breakpoints.up(layoutQuery)]: { mr: 2.5, display: 'flex' },
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
                      {/* {item.icon} */}
                      <Typography
                        sx={{
                          color: '#e6e6e6',
                          letterSpacing: 0.5,
                          fontSize: '12px',
                          fontFamily:
                            "'Century Gothic', 'Futura', 'Poppins', 'Montserrat', sans-serif",
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Link>
                  ))}
                </Box>

                {/* <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
                 
                  <SettingsButton />
                 
                  <SignInButton />
                 
                  <Button
                    variant="contained"
                    rel="noopener"
                    target="_blank"
                    href={paths.minimalStore}
                    sx={{
                      display: 'none',
                      [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
                    }}
                  >
                    Purchase
                  </Button>
                </Box>   */}
              </>
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={<Footer layoutQuery={layoutQuery} />}
      /** **************************************
       * Style
       *************************************** */
      sx={{ backgroundColor: 'black' }}
    >
      <Main>{children}</Main>

      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />
    </LayoutSection>
  );
}
