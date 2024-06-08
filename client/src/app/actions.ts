"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { apiBase } from "@/constants";
import { revalidatePath } from "next/cache";
import { upload } from "@/utils/lib/cld";
import { Buffer } from "buffer";
import type { CloudinaryResponseType } from "@/types";

const axiosInstance = axios.create({
  baseURL: apiBase,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthToken = () => cookies().get("authtoken")?.value;

const setAuthToken = (token: string) => {
  cookies().set({
    name: "authtoken",
    value: token,
    httpOnly: true,
    path: "/",
  });
};

const handleRequestError = (error: any) => {
  console.error("Request failed:", error);
  return {
    error: true,
    message: error.response ? error.response.data.message : error.message,
  };
};

const uploadFile = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const cld: CloudinaryResponseType = await upload(buffer);
  return cld.secure_url;
};

export async function makeLogin(_currentData: any, formData: FormData) {
  try {
    const { data } = await axiosInstance.post("/api/login", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    setAuthToken(data.jwt_token);
    return { error: false, message: "Successfully logged in" };
  } catch (error: any) {
    return handleRequestError(error);
  }
}

export async function createUser(_currentData: any, formData: FormData) {
  try {
    const { data } = await axiosInstance.post("/api/register", {
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      avatar: "",
      bio: "",
    });
    if (data.success) setAuthToken(data.jwt_token);
    return { error: false, message: data.message };
  } catch (error: any) {
    return handleRequestError(error);
  }
}

export async function updateUsername(_currentData: any, formData: FormData) {
  try {
    const token = getAuthToken();
    if (!token) return { error: true, message: "No authtoken provided" };

    await axiosInstance.post(
      "/api/update-user",
      { username: formData.get("username") },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    revalidatePath("/dashboard");
    return { error: false, message: "Username updated successfully" };
  } catch (error: any) {
    return handleRequestError(error);
  }
}

export async function verifyOtp(_currentData: any, formData: FormData) {
  try {
    const otp = formData.get("otp");
    if (!otp) return { error: true, message: "Please enter otp" };

    const { data } = await axiosInstance.post("/api/otp", {
      email: formData.get("email"),
      otp,
      f: "verify",
    });
    if (data.success) {
      revalidatePath("/dashboard");
      return { error: false, message: "OTP verified successfully" };
    }
    return { error: true, message: data.message };
  } catch (error: any) {
    return handleRequestError(error);
  }
}

export async function generateOtp(_currentData: any, formData: FormData) {
  try {
    const { data } = await axiosInstance.post("/api/otp", {
      email: formData.get("email"),
      f: "regenerate",
    });
    return { error: !data.success, message: data.message };
  } catch (error: any) {
    return handleRequestError(error);
  }
}

export async function updateUser(_currentData: any, formData: FormData) {
  try {
    const token = getAuthToken();
    if (!token) return { error: true, message: "No authtoken provided" };

    const avatarPromise = formData.get("avatar") ? uploadFile(formData.get("avatar") as File) : undefined;
    const coverPromise = formData.get("cover") ? uploadFile(formData.get("cover") as File) : undefined;

    const [avatar, cover] = await Promise.all([avatarPromise, coverPromise]);

    const requestData = Object.fromEntries(
      Object.entries({
        username: formData.get("username"),
        name: formData.get("name"),
        bio: formData.get("bio"),
        password: formData.get("password"),
        email: formData.get("email"),
        avatar,
        cover,
      }).filter(([_, v]) => v)
    );

    await axiosInstance.post("/api/update-user", requestData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    revalidatePath("/dashboard/profile");
    return { error: false, message: "Account updated successfully" };
  } catch (error: any) {
    return handleRequestError(error);
  }
}

export async function handleLogout() {
  cookies().delete("authtoken");
  revalidatePath("/dashboard/profile");
}

export async function createLink(_currentData: any, formData: FormData) {
  try {
    const token = getAuthToken();
    if (!token) return { error: true, message: "Session not found" };

    const logoPromise = formData.get("logo") ? uploadFile(formData.get("logo") as File) : undefined;
    const logo = await logoPromise;

    const requestData = Object.fromEntries(
      Object.entries({
        name: formData.get("name"),
        url: formData.get("url"),
        logo,
      }).filter(([_, v]) => v)
    );

    await axiosInstance.post("/api/create-link", requestData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    revalidatePath("/dashboard/links");
    return { error: false, message: "Link created successfully" };
  } catch (error: any) {
    return handleRequestError(error);
  }
}