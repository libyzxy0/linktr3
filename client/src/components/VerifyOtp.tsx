"use client";

import type { User } from "@/types";
import { verifyOtp, generateOtp } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { LoaderCircle } from "lucide-react";

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

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [otp, setOtp] = useState("");
  const [cookieLoading, setCookieLoading] = useState(true);

  const handleOtpResend = () => {
    if (timeLeft === null || timeLeft <= 0) {
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
        Math.floor((parseInt(savedExpireTime) - new Date().getTime()) / 1000)
      );
      setTimeLeft(timeLeft);
      setCookieLoading(false);
    } else {
      setCookieLoading(false);
    }
  }, []);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = (prevTime ?? 1) - 1;
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

  const minutes = Math.floor(timeLeft ? timeLeft / 60 : 0);
  const seconds = timeLeft ? timeLeft % 60 : 0;

  return (
    <>
      <main className="h-screen bg-white dark:bg-gray-950">
        <div className="h-[80vh] w-full bg-white dark:bg-gray-950 flex justify-center items-center">
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
            <form className="flex flex-col" action={formAction}>
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
                  otp.length < 6 || e.target.value.length < otp.length
                    ? setOtp(e.target.value)
                    : null
                }
                className="outline-none py-2.5 rounded-lg hover:border-sky-400 mt-7 w-full border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700"
                type="number"
                placeholder="Enter your OTP"
              />
              {timeLeft !== null && (
                <h1
                  onClick={handleOtpResend}
                  className={`font-medium mt-2 text-right hover:underline cursor-pointer ${timeLeft > 0 ? "pointer-events-none text-gray-500 dark:text-gray-300" : "text-sky-400"}`}
                >
                  {cookieLoading ? (
                    <LoaderCircle className="w-4 h-4 inline ml-2 animate-spin" />
                  ) : (
                    timeLeft > 0
                      ? minutes > 0
                        ? `Resend after ${minutes}:${seconds.toString().padStart(2, "0")}m`
                        : `${seconds}s`
                      : "Resend OTP"
                  )}
                </h1>
              )}
              <SubmitButton className="mt-4">Verify OTP</SubmitButton>
            </form>

            <p className="text-center text-gray-700 dark:text-gray-200 mt-20">
              This will redirect you to the Dashboard page if you entered the OTP correctly
            </p>
          </div>
        </div>
      </main>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
