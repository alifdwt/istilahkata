import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { SignInForm } from "@/components/auth/sign-in-form";
import { getSession } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Masuk - IstilahKata",
  description: "Masuk ke akun IstilahKata Anda untuk mulai berkontribusi",
};

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Selamat datang kembali
          </h1>
          <p className="text-sm text-muted-foreground">
            Masukkan email Anda untuk masuk ke akun
          </p>
        </div>

        <SignInForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
