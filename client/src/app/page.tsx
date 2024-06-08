"use client";

import type { User } from "@/types";
import { verifyOtp, generateOtp } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";

export default function VerifyOtp({ user }: { user: User }) {
  const [state, formAction] = useFormState(verifyOtp, {
    message: "",
    error: false,
  });
  const [stateV, formVAction] = useFormState(generateOtp, {
    message: "",
    error: false,
  });

  const [timeLeft, setTimeLeft] = useState<number>(0); 
  const [otp, setOtp] = useState<string>("")
  const [cookieLoading, setCookieLoading] = useState<boolean>(true);

  const handleOtpResend = () => {
    if (timeLeft <= 0) {
      const formData = new FormData();
      formData.append("email", user.email);
      formVAction(formData);
      const expireTime = new Date().getTime() + 180000;
      Cookies.set("otp-timer", expireTime.toString(), { expires: 1 });
      setTimeLeft(180);
    }
  };

  useEffect(() => {
    const savedExpireTime = Cookies.get("otp-timer");
    if (savedExpireTime) {
      const timeLeft = Math.max(
        0,
        Math.floor((parseInt(savedExpireTime) - new Date().getTime()) / 1000),
      );
      setTimeLeft(timeLeft);
      setCookieLoading(false);
    } else {
      setCookieLoading(false);
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0) { // No need to check for null
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(interval);
            Cookies.remove("otp-timer");
          }
          return Math.max(newTime, 0);
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (state?.message) {
      if (state.error) {
        toast.error(state.message);
      } else {
        toast.success(state.message);
      }
    }
  }, [state]);

  useEffect(() => {
    if (stateV?.message) {
      if (stateV.error) {
        toast.error(stateV.message);
      } else {
        toast.success(stateV.message);
      }
    }
  }, [stateV]);

  const minutes = Math.floor(timeLeft / 60); 
  const seconds = timeLeft % 60;

  return (
    <div className="h-screen bg-white dark:bg-gray-950">
      <main className="flex justify-center items-center h-[80vh]">
        <div className="mt-10 text-center flex justify-center flex-col mx-6">
          <h1 className="text-gray-700 text-3xl font-bold dark:text-white">
            <b className="text-sky-400">Link</b>tr3🌲
          </h1>
          <h1 className="mt-12 text-gray-700 dark:text-white font-bold text-[26px]">
            Verify your <b className="text-sky-400">OTP</b>
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Hello <b className="text-sky-400">{user.email}</b>
            {" we've sent an OTP to your email, please enter the OTP here"}
          </p>
          <form className="flex flex-col" onSubmit={formAction}>
            <input
              type="email"
              name="email"
              className="hidden"
              value={user.email}
            />
            <input
              name="otp"
              value={otp}
              onChange={(e) =>
                e.target.value.length <= 6 ? setOtp(e.target.value) : null
              }
              className="outline-none py-2.5 rounded-lg hover:border-sky-400 mt-7 w-full border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700"
              type="number"
              placeholder="Enter your OTP"
            />
            {timeLeft > 0 ? (
              <h1
                onClick={handleOtpResend}
                className={`font-medium mt-2 text-right hover:underline cursor-pointer ${timeLeft > 0 ? "text-gray-500 dark:text-gray-300" : "text-sky-400"}`}
              >
                {minutes > 0
                  ? `Resend after ${minutes}:${seconds
                      .toString()
                      .padStart(2, "0")}m`
                  : `${seconds}s`}
              </h1>
            ) : (
              <button
                onClick={handleOtpResend}
                className="font-medium mt-2 text-right hover:underline cursor-pointer text-sky-400"
                type="button"
              >
                Resend OTP
              </button>
            )}
            <SubmitButton className="mt-4">Verify OTP</SubmitButton>
          </form>

          <p className="text-center text-gray-700 dark:text-gray-200 mt-20">
            This will redirect you to Dashboard page if you entered the OTP
            correctly
          </p>
        </div>
      </main>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}