// components/features/words/word-action-buttons.tsx
"use client";

import {
  Bookmark,
  Share2,
  Flag,
  BookmarkCheck,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WordActionButtonsProps {
  wordId: string;
  wordTerm: string;
  wordSlug: string;
}

export function WordActionButtons({
  wordId,
  wordTerm,
  wordSlug,
}: WordActionButtonsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  const wordUrl = `${window.location.origin}/word/${wordSlug}`;

  const handleBookmark = async () => {
    // TODO: Implement bookmark functionality
    try {
      // API call would use wordId here
      console.log("Bookmarking word:", wordId);
      setIsBookmarked(!isBookmarked);
      toast.success(
        isBookmarked ? "Bookmark dihapus" : "Kata disimpan ke bookmark"
      );
    } catch (err) {
      console.error("Bookmark error:", err);
      toast.error("Gagal menyimpan bookmark");
    }
  };

  const handleShare = async (
    type: "copy" | "twitter" | "whatsapp" | "facebook"
  ) => {
    const text = `Pelajari arti kata "${wordTerm}" di IstilahKata`;

    try {
      switch (type) {
        case "copy":
          await navigator.clipboard.writeText(wordUrl);
          toast.success("Link berhasil disalin!");
          break;

        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              text
            )}&url=${encodeURIComponent(wordUrl)}`,
            "_blank"
          );
          break;

        case "whatsapp":
          window.open(
            `https://wa.me/?text=${encodeURIComponent(`${text} ${wordUrl}`)}`,
            "_blank"
          );
          break;

        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              wordUrl
            )}`,
            "_blank"
          );
          break;
      }
      setShareMenuOpen(false);
    } catch (err) {
      console.error("Share error:", err);
      toast.error("Gagal membagikan kata");
    }
  };

  const handleReport = async (reason: string) => {
    // TODO: Implement report functionality
    try {
      // API call would use wordId and reason here
      console.log("Reporting word:", wordId, "Reason:", reason);
      toast.success("Laporan berhasil dikirim. Terima kasih!");
      setReportDialogOpen(false);
    } catch (err) {
      console.error("Report error:", err);
      toast.error("Gagal mengirim laporan");
    }
  };

  return (
    <div className="flex items-start gap-2">
      {/* Bookmark Button */}
      <Button
        variant="outline"
        size="sm"
        className="h-9 w-9 p-0"
        onClick={handleBookmark}
      >
        {isBookmarked ? (
          <BookmarkCheck className="h-4 w-4 text-primary" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
        <span className="sr-only">
          {isBookmarked ? "Hapus bookmark" : "Bookmark kata"}
        </span>
      </Button>

      {/* Share Dropdown */}
      <DropdownMenu open={shareMenuOpen} onOpenChange={setShareMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Bagikan kata</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleShare("copy")}>
            <Copy className="mr-2 h-4 w-4" />
            Salin Link
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
            <ExternalLink className="mr-2 h-4 w-4" />
            WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("twitter")}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("facebook")}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Facebook
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Report Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
            <Flag className="h-4 w-4" />
            <span className="sr-only">Laporkan kata</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Laporkan Kata &quot;{wordTerm}&quot;</DialogTitle>
            <DialogDescription>
              Pilih alasan mengapa Anda melaporkan kata ini.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {[
              "Konten tidak pantas",
              "Spam atau promosi",
              "Informasi yang salah",
              "Pelanggaran hak cipta",
              "Lainnya",
            ].map((reason) => (
              <Button
                key={reason}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleReport(reason)}
              >
                {reason}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Static version for server components
export function WordActionButtonsStatic() {
  return (
    <div className="flex items-start gap-2">
      <Button variant="outline" size="sm" className="h-9 w-9 p-0">
        <Bookmark className="h-4 w-4" />
        <span className="sr-only">Bookmark</span>
      </Button>

      <Button variant="outline" size="sm" className="h-9 w-9 p-0">
        <Share2 className="h-4 w-4" />
        <span className="sr-only">Share</span>
      </Button>

      <Button variant="outline" size="sm" className="h-9 w-9 p-0">
        <Flag className="h-4 w-4" />
        <span className="sr-only">Report</span>
      </Button>
    </div>
  );
}
