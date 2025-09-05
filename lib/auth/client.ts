"use client";

import { createAuthClient } from "better-auth/react";

import { env } from "@/env.mjs";

export const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_URL,
  cookiePrefix: "istilahkata",
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
  forgetPassword,
  resetPassword,
  changePassword,
  updateUser,
  sendVerificationEmail,
  verifyEmail,
} = authClient;
