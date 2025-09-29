"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface WordsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export default function WordsPagination({
  currentPage,
  totalPages,
  totalItems,
}: WordsPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Don't show pagination if only 1 page
  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/words?${params.toString()}`);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
      {/* Info text */}
      <div className="text-sm text-muted-foreground">
        Halaman{" "}
        <span className="font-medium text-foreground">{currentPage}</span> dari{" "}
        <span className="font-medium text-foreground">{totalPages}</span>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* First page button */}
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-border bg-background p-2 transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          title="Halaman pertama"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>

        {/* Previous button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="mr-1 inline h-4 w-4" />
          Sebelumnya
        </button>

        {/* Page numbers */}
        <div className="hidden items-center gap-1 md:flex">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-muted-foreground"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`min-w-[40px] rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background hover:bg-muted"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          Selanjutnya
          <ChevronRight className="ml-1 inline h-4 w-4" />
        </button>

        {/* Last page button */}
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-border bg-background p-2 transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          title="Halaman terakhir"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
