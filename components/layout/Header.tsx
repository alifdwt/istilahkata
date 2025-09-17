import { Search, Menu, User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUserExtended } from "@/lib/auth/user-utils";

export default async function Header() {
  const user = await getCurrentUserExtended();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src={"/istilah-kata-logo.png"}
              alt="IstilahKata Logo"
              width={110}
              height={24}
              priority
            />
          </Link>
          <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            Beta
          </span>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Beranda
          </Link>
          <Link
            href="/words"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Kata-kata
          </Link>
          <Link
            href="/contribute"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Kontribusi
          </Link>
          <Link
            href="/leaderboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Leaderboard
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Tentang
          </Link>
        </nav>

        {/* Search Bar - Desktop */}
        <div className="relative hidden lg:block">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari kata gaul..."
            className="w-64 rounded-lg border bg-background py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          {/* Search Button - Mobile */}
          <button className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-primary lg:hidden">
            <Search className="h-5 w-5" />
          </button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg border bg-background p-2 transition-colors hover:bg-muted">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={user.avatar || undefined}
                      alt={user.username || "User"}
                    />
                    <AvatarFallback className="text-xs">
                      {user.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium sm:inline">
                    @{user.username}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">@{user.username}</p>
                  {user.displayName && (
                    <p className="text-xs text-muted-foreground">
                      {user.displayName}
                    </p>
                  )}
                  <div className="mt-1 flex gap-2 text-xs text-muted-foreground">
                    <span>{user.totalVotes} votes</span>
                    <span>•</span>
                    <span>{user.totalWordCount} kata</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href={`/user/${user.username}`}
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Profil Saya
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Pengaturan
                  </Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/auth/signout"
                    className="flex items-center gap-2 text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Keluar
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Daftar
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <button className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-primary md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
