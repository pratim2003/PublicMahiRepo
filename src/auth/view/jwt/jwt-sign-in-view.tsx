'use client';

import { z } from 'zod';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Field } from 'src/components/hook-form';
// import { FormHead } from 'src/components/form-head';

// -------------------- Validation Schema --------------------
const SignInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInFormType = z.infer<typeof SignInSchema>;

// -------------------- Component --------------------
export function SignInPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const password = useBoolean();

  // Initialize useForm
  const methods = useForm<SignInFormType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: 'mahidev@gmail.com', password: 'Test@1234' },
  });

  const { handleSubmit, formState } = methods;

  // -------------------- Submit handler --------------------
  const onSubmit = async (data: SignInFormType) => {
    setErrorMsg('');
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        setErrorMsg(res.error);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong!');
    }
  };

  return (
    <Box maxWidth={400} mx="100" mt={5}>
      {/* Form header */}
      {/* <FormHead
        title="Sign in to your account"
        description={
          <>
            Don’t have an account?{' '}
            <Link component={RouterLink} href={paths.auth.jwt.signUp} variant="subtitle2">
              Get started
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      /> */}

      {/* Info alert */}
      <Alert severity="info" sx={{ mb: 3 }}>
        {/* Use <strong>mahidev@gmail.com</strong> with password <strong>@demo1</strong> */}
        Login for More Details..
      </Alert>

      {/* Error alert */}
      {errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      {/* -------------------- Form -------------------- */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box gap={3} display="flex" flexDirection="column">
            {/* Email field */}
            <Field.Text name="email" label="Email" />

            {/* Password field */}
            <Field.Text
              name="password"
              label="Password"
              type={password.value ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Forgot password */}
            <Link
              component={RouterLink}
              href="#"
              variant="body2"
              color="inherit"
              sx={{ alignSelf: 'flex-end' }}
            >
              Forgot password?
            </Link>

            {/* Submit button */}
            <LoadingButton
              type="submit"
              variant="contained"
              loading={formState.isSubmitting}
              fullWidth
            >
              Sign In
            </LoadingButton>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}
