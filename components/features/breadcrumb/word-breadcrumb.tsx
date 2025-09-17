import { Home } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface WordBreadcrumbProps {
  wordSlug: string;
  wordTitle?: string;
  className?: string;
}

export function WordBreadcrumb({
  wordSlug,
  wordTitle,
  className,
}: WordBreadcrumbProps) {
  return (
    <div className="border-b bg-muted/30">
      <div className="mx-auto max-w-screen-2xl px-4 py-3">
        <Breadcrumb className={className}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-1">
                <Home className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Beranda</span>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href="/words">Kata-kata</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>{wordTitle || wordSlug}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}

// Generic breadcrumb untuk halaman lain
interface CustomBreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface GenericBreadcrumbProps {
  items: CustomBreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export function GenericBreadcrumb({
  items,
  showHome = true,
  className,
}: GenericBreadcrumbProps) {
  return (
    <div className="border-b bg-muted/30">
      <div className="mx-auto max-w-screen-2xl px-4 py-3">
        <Breadcrumb className={className}>
          <BreadcrumbList>
            {showHome && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="flex items-center gap-1">
                    <Home className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Beranda</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {items.length > 0 && <BreadcrumbSeparator />}
              </>
            )}

            {items.map((item, index) => (
              <div key={index} className="contents">
                <BreadcrumbItem>
                  {item.isCurrentPage ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href || "#"}>
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {index < items.length - 1 && <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
