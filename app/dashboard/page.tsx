import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { getSession } from "@/lib/auth/server";
import { getCurrentUserExtended } from "@/lib/auth/user-utils";

export const metadata: Metadata = {
  title: "Dashboard - IstilahKata",
  description: "Dashboard pengguna IstilahKata",
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const extendedUser = await getCurrentUserExtended();

  if (!extendedUser) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-6xl py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Selamat datang kembali,{" "}
              {extendedUser.displayName || extendedUser.username || "User"}!
            </p>
          </div>
          <Button asChild>
            <Link href="/word/create">
              <Icons.plus className="mr-2 h-4 w-4" />
              Request Kata Baru
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
              <Icons.heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {extendedUser.totalVotes}
              </div>
              <p className="text-xs text-muted-foreground">
                Vote yang diterima
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Kontribusi Kata
              </CardTitle>
              <Icons.bookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {extendedUser.totalWordCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Total kata dijelaskan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <Icons.users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">
                {extendedUser.role}
              </div>
              <p className="text-xs text-muted-foreground">Level akun Anda</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bergabung</CardTitle>
              <Icons.clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.floor(
                  (Date.now() - new Date(extendedUser.createdAt).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}
              </div>
              <p className="text-xs text-muted-foreground">hari yang lalu</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Icons.clock className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Belum ada aktivitas</p>
                    <p className="text-xs text-muted-foreground">
                      Mulai berkontribusi untuk melihat aktivitas Anda
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link href="/word/create">
                  <Icons.plus className="mr-2 h-4 w-4" />
                  Request Kata Baru
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link href="/browse">
                  <Icons.search className="mr-2 h-4 w-4" />
                  Jelajahi Kata
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link href="/profile">
                  <Icons.user className="mr-2 h-4 w-4" />
                  Edit Profil
                </Link>
              </Button>
              {(extendedUser.role === "moderator" ||
                extendedUser.role === "admin") && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/moderate">
                    <Icons.shield className="mr-2 h-4 w-4" />
                    Panel Moderasi
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
