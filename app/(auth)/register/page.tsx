import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { SignUpForm } from "@/components/auth/sign-up-form";
import { getSession } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Daftar - IstilahKata",
  description:
    "Buat akun IstilahKata untuk mulai berkontribusi dalam komunitas bahasa gaul",
};

export default async function RegisterPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Buat akun baru
          </h1>
          <p className="text-sm text-muted-foreground">
            Bergabunglah dengan komunitas IstilahKata
          </p>
        </div>

        <SignUpForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
