'use client';

import { GoogleOAuthProvider, useGoogleOneTapLogin } from '@react-oauth/google';

export function OneTapGoogleLogin() {
  return (
    <GoogleOAuthProvider clientId="504207588226-2cqdusdfn1prtd9fagep5gp90e9jqdb3.apps.googleusercontent.com">
      <OneTap />
    </GoogleOAuthProvider>
  )
}

function OneTap() {
  useGoogleOneTapLogin({
    onSuccess: async (credentials) => {
      console.log(credentials);
    },
    onError: errorResponse => console.log(errorResponse),
  });
  return (
    <></>
  )
}