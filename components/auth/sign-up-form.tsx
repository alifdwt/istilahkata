"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth/client";

export function SignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    displayName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Better Auth signUp.email only accepts email, password, and name
      const result = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.displayName || formData.username, // Use displayName as name, fallback to username
        // @ts-expect-error Type 'string | undefined' is not assignable to type 'string'.
        username: formData.username,
      });

      if (result.error) {
        setError(result.error.message || "Terjadi kesalahan.");
      } else {
        // After successful signup, we need to update user with additional fields
        // This would typically be done via a separate API call or during onboarding
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Daftar IstilahKata
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="username_unik"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              required
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Username akan diupdate setelah registrasi berhasil
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Nama Tampilan (Opsional)</Label>
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimal 6 karakter"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Daftar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
