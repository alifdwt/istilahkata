"use client";

import {
  CheckCircle,
  Award,
  ChevronDown,
  ChevronUp,
  Plus,
  Clock,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { formatRelativeTime, formatNumber } from "@/lib/word-util";

import { VotingActionsStatic } from "./voting-components";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    username: string | null;
    displayName: string | null;
    avatar: string | null;
  };
}

interface EnhancedExplanationCardProps {
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
  comments?: Comment[];
  index?: number;
  showVoting?: boolean;
}

export function EnhancedExplanationCard({
  explanation,
  comments = [],
  index,
  showVoting = true,
}: EnhancedExplanationCardProps) {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const isAccepted = explanation.isAccepted;

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    // TODO: Implement add comment API
    console.log("Adding comment:", newComment);
    setNewComment("");
    setShowAddComment(false);
    // In real implementation, this would trigger a refresh of comments
  };

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
            <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              <CheckCircle className="h-3 w-3" />
              Penjelasan Terpilih
            </div>
            <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
              <Award className="h-3 w-3" />
              Terpopuler
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
          <Link
            href={`/user/${explanation.user.username}`}
            className="group flex items-center gap-2"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={explanation.user.avatar || undefined}
                alt={
                  explanation.user.displayName ||
                  explanation.user.username ||
                  ""
                }
              />
              <AvatarFallback className="text-xs">
                {(explanation.user.displayName ||
                  explanation.user.username ||
                  "U")[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium transition-colors group-hover:text-primary">
                {explanation.user.displayName || explanation.user.username}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatNumber(explanation.user.totalVotes)} total votes
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatRelativeTime(explanation.createdAt)}
            </span>
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

      {/* Comments Section */}
      {explanation.totalComments > 0 && (
        <Collapsible open={commentsOpen} onOpenChange={setCommentsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="mt-4 h-auto w-full justify-between p-2 text-sm"
            >
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {explanation.totalComments > 0
                  ? `Lihat ${explanation.totalComments} komentar`
                  : "Belum ada komentar"}
              </span>
              {commentsOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-3">
            <Separator className="mb-4" />

            {/* Comments List */}
            <div className="mb-4 space-y-3">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex gap-3 rounded-lg bg-muted/50 p-3"
                >
                  <Avatar className="mt-0.5 h-6 w-6">
                    <AvatarImage
                      src={comment.user.avatar || undefined}
                      alt={
                        comment.user.displayName || comment.user.username || ""
                      }
                    />
                    <AvatarFallback className="text-xs">
                      {(comment.user.displayName ||
                        comment.user.username ||
                        "U")[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Link
                        href={`/user/${comment.user.username}`}
                        className="text-sm font-medium transition-colors hover:text-primary"
                      >
                        {comment.user.displayName || comment.user.username}
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Section */}
            {showAddComment ? (
              <div className="space-y-3">
                <Textarea
                  placeholder="Tulis komentar Anda..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddComment(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    Kirim Komentar
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={() => setShowAddComment(true)}
              >
                <Plus className="h-4 w-4" />
                Tambah Komentar
              </Button>
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
