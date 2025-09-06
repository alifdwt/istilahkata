import { Metadata } from "next";
import { redirect } from "next/navigation";

import { ProfileForm } from "@/components/profile/profile-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/auth/server";
import { getCurrentUserExtended } from "@/lib/auth/user-utils";

export const metadata: Metadata = {
  title: "Profil - IstilahKata",
  description: "Kelola profil dan pengaturan akun Anda",
};

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // Get extended user data from database
  const extendedUser = await getCurrentUserExtended();

  if (!extendedUser) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-4xl py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profil</h1>
          <p className="text-muted-foreground">
            Kelola informasi profil dan pengaturan akun Anda.
          </p>
        </div>

        <Separator />

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Akun</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <p className="text-sm text-muted-foreground">
                    {extendedUser.username
                      ? `@${extendedUser.username}`
                      : "Belum diset"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground">
                    {extendedUser.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <div>
                    <Badge
                      variant={
                        extendedUser.role === "admin"
                          ? "destructive"
                          : extendedUser.role === "moderator"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {extendedUser.role}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Bergabung</label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(extendedUser.createdAt).toLocaleDateString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistik Kontribusi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {extendedUser.totalVotes}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Votes</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {extendedUser.totalWordCount}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Kata</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <ProfileForm user={extendedUser} />
        </div>
      </div>
    </div>
  );
}
