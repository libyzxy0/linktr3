"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { apiBase } from "@/constants";
import { revalidatePath } from "next/cache";
import { upload } from "@/utils/lib/cld";
import { Buffer } from "buffer";
import type { CloudinaryResponseType } from "@/types";

export async function makeLogin(_currentData: any, formData: FormData) {
  try {
    console.log(formData);
    const { data } = await axios.post(
      apiBase + "/api/login",
      {
        email: formData.get("email"),
        password: formData.get("password"),
      },
      { headers: { "Content-Type": "application/json" } },
    );
    const token = data.jwt_token;
    console.log("Token saved:", token);
    cookies().set({
      name: "authtoken",
      value: token,
      httpOnly: true,
      path: "/",
    });
    return {
      error: false,
      message: "Successfully logged in",
    };
  } catch (error: any) {
    console.error("Failed to login:", error);
    return {
      error: true,
      message: error.response ? error.response.data.message : error.message,
    };
  }
}

export async function createUser(_currentData: any, formData: FormData) {
  try {
    console.log(formData);
    const { data } = await axios.post(
      apiBase + "/api/register",
      {
        name: formData.get("name"),
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        avatar: "",
        bio: "",
      },
      { headers: { "Content-Type": "application/json" } },
    );
    if(data.success) {
      cookies().set({
        name: "authtoken",
        value: data.jwt_token,
        httpOnly: true,
        path: "/",
    });
    }
    return {
      error: false,
      message: data.message,
    };
  } catch (error: any) {
    console.error("Failed to create your account:", error);
    return {
      error: true,
      message: error.response ? error.response.data.message : error.message,
    };
  }
}

export async function updateUsername(_currentData: any, formData: FormData) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("authtoken");

    if (token) {
      const { data } = await axios.post(
        apiBase + "/api/update-user",
        {
          username: formData.get("username"),
        },
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
            "Content-Type": "application/json",
          },
        },
      );

      revalidatePath("/dashboard");
    } else {
      return {
        error: true,
        message: "No authtoken provided",
      };
    }
  } catch (error: any) {
    console.error("Failed to create your account:", error);
    return {
      error: true,
      message: error.response ? error.response.data.message : error.message,
    };
  }
}
export async function verifyOtp(_currentData: any, formData: FormData) {
  try {
    const otp = formData.get('otp');
    if(!otp) {
      return {
        error: true,
        message: "Please enter otp",
      };
    }
    const { data } = await axios.post(apiBase + '/api/verify-otp', {
      email: formData.get('email'), 
      otp, 
      f: 'verify'
    })
    if(data.success) {
      revalidatePath("/dashboard");
    } else {
      return {
        error: true,
        message: data.message,
      };
    }
  } catch (error: any) {
    console.error("Failed to verify your otp:", error);
    return {
      error: true,
      message: error.response ? error.response.data.message : error.message,
    };
  }
}
export async function generateOtp(_currentData: any, formData: FormData) {
  try {
    const { data } = await axios.post(apiBase + '/api/verify-otp', {
      email: formData.get('email'), 
      f: 'regenerate'
    })
    if(data.success) {
      revalidatePath("/dashboard");
    } else {
      return {
        error: true,
        message: data.message,
      };
    }
  } catch (error: any) {
    console.error("Failed to regenerate your otp:", error);
    return {
      error: true,
      message: error.response ? error.response.data.message : error.message,
    };
  }
}

export async function updateUser(_currentData: any, formData: FormData) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("authtoken");

    if (!token) {
      return {
        error: true,
        message: "No authtoken provided",
      };
    }
    let avatar;
    let cover;

    const av = formData.get("avatar") as unknown as File;

    if (av) {
      const arrayBuffer = await av.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const cld: CloudinaryResponseType = await upload(buffer);
      avatar = cld?.secure_url;
    }

    const cv = formData.get("cover") as unknown as File;

    if (cv) {
      const arrayBuffer = await cv.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const cld: CloudinaryResponseType = await upload(buffer);
      cover = cld?.secure_url;
    }

    const formDataEntries = {
      username: formData.get("username"),
      name: formData.get("name"),
      bio: formData.get("bio"),
      password: formData.get("password"),
      email: formData.get("email"),
      avatar: avatar,
      cover: cover,
    };
    const requestData = Object.fromEntries(
      Object.entries(formDataEntries).filter(([_, v]) => v),
    );
    const { data } = await axios.post(
      apiBase + "/api/update-user",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
          "Content-Type": "application/json",
        },
      },
    );

    revalidatePath("/dashboard/profile");
    return {
      error: false,
      message: "Success",
    };
  } catch (error: any) {
    console.error("Failed to update your account:", error);
    return {
      error: true,
      message: error.response ? error.response.data.message : error.message,
    };
  }
}

export async function handleLogout() {
  cookies().delete("authtoken");
  revalidatePath("/dashboard/profile");
}

export async function createLink(_currentData: any, formData: FormData) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("authtoken");

    if (!token) {
      return {
        error: true,
        message: "Session not found",
      };
    }

    let logo;

    const file = formData.get("logo") as unknown as File;

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const cld: CloudinaryResponseType = await upload(buffer);
      logo = cld?.secure_url;
    }

    type RequestType = {
      name: string;
      url: string;
      logo?: string;
    };

    const requestBody = {
      name: formData.get("name"),
      url: formData.get("url"),
      logo,
    };

    const requestData = Object.fromEntries(Object.entries(requestBody).filter(([_, v]) => v));

    const { data } = await axios.post(
      apiBase + "/api/create-link",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
          "Content-Type": "application/json",
        },
      },
    );
    revalidatePath("/dashboard/links");
    return {
      error: false,
      message: "Link created successfully",
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error.response ? error.response.data.message : error.message,
    };
  }
}
