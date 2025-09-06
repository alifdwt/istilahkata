import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-mono text-2xl font-bold text-primary">
            IstilahKata
          </Link>
          <span className="text-sm text-muted-foreground">Beta</span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Beranda
          </Link>
          <Link href="/words" className="font-medium">
            Kata-kata
          </Link>
          <Link
            href="/contribute"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Kontribusi
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Tentang
          </Link>
        </nav>

        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90">
          Masuk
        </button>
      </div>
    </header>
  );
};

export default Header;
