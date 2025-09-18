import { Plus, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";

import { EnhancedExplanationCard } from "@/components/features/words/enhanced-explanation-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCommentsByExplanationId } from "@/lib/db/queries/comments";
import {
  getWordBySlug,
  getExplanationsByWordSlug,
} from "@/lib/db/queries/words";

interface WordExplanationsProps {
  params: Promise<{ slug: string }>;
}

export default async function WordExplanations({
  params,
}: WordExplanationsProps) {
  const { slug } = await params;
  const word = await getWordBySlug(slug);

  if (!word) {
    notFound();
  }

  // Get explanations
  const explanations = await getExplanationsByWordSlug(slug, 20);

  // Get comments for each explanation (in parallel)
  const explanationsWithComments = await Promise.all(
    explanations.map(async (explanation) => {
      const comments = await getCommentsByExplanationId(explanation.id, 10);
      return {
        ...explanation,
        comments,
      };
    })
  );

  // Separate accepted and other explanations
  const acceptedExplanation = explanationsWithComments.find(
    (exp) => exp.isAccepted
  );
  const otherExplanations = explanationsWithComments.filter(
    (exp) => !exp.isAccepted
  );

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Penjelasan Kata</h2>
          <p className="text-muted-foreground">
            {explanations.length > 0
              ? `${explanations.length} penjelasan dari komunitas`
              : "Belum ada penjelasan untuk kata ini"}
          </p>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Penjelasan
        </Button>
      </div>

      {/* Accepted Explanation - Highlighted */}
      {acceptedExplanation && (
        <EnhancedExplanationCard
          explanation={acceptedExplanation}
          comments={acceptedExplanation.comments}
          showVoting={true}
        />
      )}

      {/* Other Explanations */}
      {otherExplanations.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Penjelasan Lainnya</h3>
            <Badge variant="secondary">{otherExplanations.length}</Badge>
          </div>

          <div className="space-y-4">
            {otherExplanations.map((explanation, index) => (
              <EnhancedExplanationCard
                key={explanation.id}
                explanation={explanation}
                comments={explanation.comments}
                index={index + 1}
                showVoting={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State - No Explanations */}
      {explanations.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full bg-muted p-4">
                <MessageCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium">
                  Belum Ada Penjelasan
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Jadilah yang pertama memberikan penjelasan untuk kata &quot;
                  {word.term}&quot;
                </p>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Penjelasan Pertama
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Load More Button (if needed) */}
      {explanations.length >= 20 && (
        <div className="text-center">
          <Button variant="outline" className="gap-2">
            Muat Lebih Banyak
            <span className="text-xs text-muted-foreground">
              ({explanations.length} dari {word.totalExplanations})
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}
