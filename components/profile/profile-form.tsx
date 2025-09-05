"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/lib/auth/client";
import { ExtendedUser } from "@/lib/auth/user-utils";

interface ProfileFormProps {
  user: ExtendedUser;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    displayName: user.displayName || "",
    bio: user.bio || "",
    avatar: user.avatar || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", content: "" });

    try {
      const result = await updateUser({
        // @ts-expect-error Type 'string | undefined' is not assignable to type 'string'.
        displayName: formData.displayName,
        bio: formData.bio,
        avatar: formData.avatar,
      });

      if (result.error) {
        setMessage({
          type: "error",
          content: result.error.message || "Terjadi kesalahan",
        });
      } else {
        setMessage({ type: "success", content: "Profil berhasil diperbarui" });
        router.refresh();
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage({
        type: "error",
        content: "Terjadi kesalahan. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profil</CardTitle>
      </CardHeader>
      <CardContent>
        {message.content && (
          <Alert
            variant={message.type === "error" ? "destructive" : "default"}
            className="mb-4"
          >
            <AlertDescription>{message.content}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Nama Tampilan</Label>
            <Input
              id="displayName"
              type="text"
              placeholder="Nama yang akan ditampilkan"
              value={formData.displayName}
              onChange={(e) => handleInputChange("displayName", e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Ceritakan sedikit tentang diri Anda..."
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">URL Avatar</Label>
            <Input
              id="avatar"
              type="url"
              placeholder="https://example.com/avatar.jpg"
              value={formData.avatar}
              onChange={(e) => handleInputChange("avatar", e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Simpan Perubahan
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
