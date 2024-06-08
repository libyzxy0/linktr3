"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { GoogleOAuthProvider, useGoogleOneTapLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { apiBase } from "@/constants";

export function OneTapGoogleLogin() {
  return (
    <GoogleOAuthProvider clientId="504207588226-2cqdusdfn1prtd9fagep5gp90e9jqdb3.apps.googleusercontent.com">
      <OneTap />
    </GoogleOAuthProvider>
  );
}

function OneTap() {
  const router = useRouter();
  useGoogleOneTapLogin({
    onSuccess: async (credentials) => {
      try {
        const { data } = await axios.post(
          apiBase + "/api/oauth",
          { flow: "one-tap" },
          {
            headers: {
              Authorization: `Bearer ${credentials.credential}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (data.success) {
          Cookies.set("authtoken", data.token, { expires: 7 });
          console.log("Logged In using google one tap");
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        }
      } catch (error: any) {
        console.error("Failed to login using google one tap:", error);
      }
    },
    onError: () => {
      console.error("An error occurred during google one tap login.");
    },
  });
  return <></>;
}
