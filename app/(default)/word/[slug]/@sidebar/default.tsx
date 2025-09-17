import { TrendingUp, ExternalLink, Crown, Award } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WordSidebarDefault() {
  return (
    <div className="space-y-6">
      {/* Minimal Stats Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Statistik
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Statistik sedang dimuat...
          </p>
        </CardContent>
      </Card>

      {/* Minimal Related Words Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ExternalLink className="h-5 w-5 text-primary" />
            Kata Terkait
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Mencari kata terkait...
          </p>
        </CardContent>
      </Card>

      {/* Minimal Contributors Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Crown className="h-5 w-5 text-primary" />
            Kontributor Teratas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Memuat kontributor...</p>
        </CardContent>
      </Card>

      {/* Minimal Analytics Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="h-5 w-5 text-primary" />
            Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Menganalisis data...</p>
        </CardContent>
      </Card>
    </div>
  );
}
