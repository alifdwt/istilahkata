"use client";

import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  CheckCircleIcon,
} from "lucide-react";
import { useState, useOptimistic } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/word-util";

interface VotingActionsProps {
  explanationId: string;
  initialVotes: number;
  initialUserVote?: "up" | "down" | null;
  totalComments: number;
  variant?: "default" | "accepted";
}

export function VotingActions({
  explanationId,
  initialVotes,
  initialUserVote = null,
  totalComments,
  variant = "default",
}: VotingActionsProps) {
  const [userVote, setUserVote] = useState<"up" | "down" | null>(
    initialUserVote
  );
  const [optimisticVotes, addOptimisticVote] = useOptimistic(
    { votes: initialVotes, userVote },
    (state, newVote: "up" | "down" | null) => {
      let voteDelta = 0;

      if (state.userVote === "up" && newVote !== "up") voteDelta -= 1;
      if (state.userVote === "down" && newVote !== "down") voteDelta += 1;
      if (newVote === "up" && state.userVote !== "up") voteDelta += 1;
      if (newVote === "down" && state.userVote !== "down") voteDelta -= 1;

      return {
        votes: state.votes + voteDelta,
        userVote: newVote,
      };
    }
  );

  const handleVote = async (voteType: "up" | "down") => {
    const newVote = userVote === voteType ? null : voteType;

    // Optimistic update
    addOptimisticVote(newVote);
    setUserVote(newVote);

    try {
      // TODO: Implement API call
      const response = await fetch(`/api/explanations/${explanationId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vote: newVote }),
      });

      if (!response.ok) {
        throw new Error("Failed to vote");
      }

      // Success feedback
      if (newVote === "up") {
        toast.success("👍 Vote positif diberikan!");
      } else if (newVote === "down") {
        toast.success("👎 Vote negatif diberikan!");
      } else {
        toast.success("Vote dibatalkan");
      }
    } catch (err) {
      console.error("Vote error:", err);
      // Revert optimistic update on error
      setUserVote(userVote);
      toast.error("Gagal memberikan vote");
    }
  };

  const acceptedStyles =
    variant === "accepted" ? "text-green-600 hover:text-green-700" : "";

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className={`gap-1 ${
          optimisticVotes.userVote === "up" ? "bg-primary/10 text-primary" : ""
        } ${acceptedStyles}`}
        onClick={() => handleVote("up")}
      >
        <ThumbsUp
          className={`h-4 w-4 ${
            optimisticVotes.userVote === "up" ? "fill-current" : ""
          }`}
        />
        {formatNumber(optimisticVotes.votes)}
      </Button>

      {variant !== "accepted" && (
        <Button
          variant="ghost"
          size="sm"
          className={`gap-1 ${
            optimisticVotes.userVote === "down"
              ? "bg-destructive/10 text-destructive"
              : ""
          }`}
          onClick={() => handleVote("down")}
        >
          <ThumbsDown
            className={`h-4 w-4 ${
              optimisticVotes.userVote === "down" ? "fill-current" : ""
            }`}
          />
        </Button>
      )}

      <Button variant="ghost" size="sm" className="gap-1">
        <MessageCircle className="h-4 w-4" />
        {totalComments > 0 ? formatNumber(totalComments) : ""}
      </Button>
    </div>
  );
}

// Static version for server components
export function VotingActionsStatic({
  votes,
  totalComments,
  variant = "default",
}: {
  votes: number;
  totalComments: number;
  variant?: "default" | "accepted";
}) {
  const acceptedStyles = variant === "accepted" ? "text-green-600" : "";

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" className={`gap-1 ${acceptedStyles}`}>
        <ThumbsUp className="h-4 w-4" />
        {formatNumber(votes)}
      </Button>

      {variant !== "accepted" && (
        <Button variant="ghost" size="sm" className="gap-1">
          <ThumbsDown className="h-4 w-4" />
        </Button>
      )}

      <Button variant="ghost" size="sm" className="gap-1">
        <MessageCircle className="h-4 w-4" />
        {totalComments > 0 ? formatNumber(totalComments) : ""}
      </Button>
    </div>
  );
}

// Add explanation button component
interface AddExplanationButtonProps {
  wordId: string;
  wordTerm: string;
  onAdd?: () => void;
}

export function AddExplanationButton({
  wordId,
  wordTerm,
  onAdd,
}: AddExplanationButtonProps) {
  const handleClick = () => {
    // TODO: Open explanation form modal or navigate to form page
    console.log("Adding explanation for word:", wordId, wordTerm);
    onAdd?.();
  };

  return (
    <Button className="gap-2" onClick={handleClick}>
      <MessageCircle className="h-4 w-4" />
      Tambah Penjelasan
    </Button>
  );
}

// Static version
export function AddExplanationButtonStatic() {
  return (
    <Button className="gap-2">
      <MessageCircle className="h-4 w-4" />
      Tambah Penjelasan
    </Button>
  );
}

// Explanation card component
interface ExplanationCardProps {
  explanation: {
    id: string;
    content: string;
    example: string | null;
    votes: number;
    wordCount: number;
    isAccepted: boolean;
    createdAt: Date;
    totalComments: number;
    user: {
      username: string | null;
      displayName: string | null;
      avatar: string | null;
      totalVotes: number;
    };
  };
  index?: number;
  showVoting?: boolean;
}

export function ExplanationCard({
  explanation,
  index,
  showVoting = true,
}: ExplanationCardProps) {
  const isAccepted = explanation.isAccepted;

  return (
    <div
      className={`rounded-xl border p-6 transition-shadow hover:shadow-md ${
        isAccepted ? "border border-secondary bg-card" : "bg-card"
      }`}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        {isAccepted ? (
          <>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-secondary" />
              <h2 className="text-xl font-semibold">Penjelasan Utama</h2>
              <span className="rounded bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                Diterima
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-full border bg-background px-2 py-0.5 font-mono text-xs">
              #{(index || 0) + 1}
            </div>
            <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              Kontributor
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="mb-3 text-base leading-relaxed">{explanation.content}</p>

        {explanation.example && (
          <div
            className={`rounded-lg border-l-4 p-4 ${
              isAccepted
                ? "border-primary bg-muted/50"
                : "border-muted bg-muted/50"
            }`}
          >
            <p className="mb-1 text-sm text-muted-foreground">
              Contoh{isAccepted ? " penggunaan" : ""}:
            </p>
            <p className="text-sm italic">&quot;{explanation.example}&quot;</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className={`flex items-center justify-between border-t pt-4 ${
          isAccepted ? "border-green-200" : ""
        }`}
      >
        {/* Author info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
              {(explanation.user.displayName ||
                explanation.user.username ||
                "U")[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium">
                {explanation.user.displayName || explanation.user.username}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatNumber(explanation.user.totalVotes)} total votes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{explanation.wordCount} kata</span>
          </div>
        </div>

        {/* Voting actions */}
        {showVoting && (
          <VotingActionsStatic
            votes={explanation.votes}
            totalComments={explanation.totalComments}
            variant={isAccepted ? "accepted" : "default"}
          />
        )}
      </div>
    </div>
  );
}
