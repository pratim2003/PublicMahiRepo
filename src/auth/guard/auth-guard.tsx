// 'use client';

// import { useState, useEffect, useCallback } from 'react';

// import { paths } from 'src/routes/paths';
// import { useRouter, usePathname, useSearchParams } from 'src/routes/hooks';

// import { CONFIG } from 'src/config-global';

// import { SplashScreen } from 'src/components/loading-screen';

// import { useAuthContext } from '../hooks';

// // ----------------------------------------------------------------------

// type Props = {
//   children: React.ReactNode;
// };

// export function AuthGuard({ children }: Props) {
//   const router = useRouter();

//   const pathname = usePathname();

//   const searchParams = useSearchParams();

//   const { authenticated, loading } = useAuthContext();

//   const [isChecking, setIsChecking] = useState<boolean>(true);

//   const createQueryString = useCallback(
//     (name: string, value: string) => {
//       const params = new URLSearchParams(searchParams.toString());
//       params.set(name, value);

//       return params.toString();
//     },
//     [searchParams]
//   );

//   const checkPermissions = async (): Promise<void> => {
//     if (loading) {
//       return;
//     }

//     if (!authenticated) {
//       const { method } = CONFIG.auth;

//       const signInPath = {
//         jwt: paths.auth.jwt.signIn,
//         auth0: paths.auth.auth0.signIn,
//         amplify: paths.auth.amplify.signIn,
//         firebase: paths.auth.firebase.signIn,
//         supabase: paths.auth.supabase.signIn,
//       }[method];

//       const href = `${signInPath}?${createQueryString('returnTo', pathname)}`;

//       router.replace(href);
//       return;
//     }

//     setIsChecking(false);
//   };

//   useEffect(() => {
//     checkPermissions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [authenticated, loading]);

//   if (isChecking) {
//     return <SplashScreen />;
//   }

//   return <>{children}</>;
// }

// src/components/auth-guard.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/jwt/sign-in'); // redirect if not logged in
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div />;
  }

  if (!session) {
    return null; // don't render until redirect
  }

  return <>{children}</>;
}
