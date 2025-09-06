import { Clock, MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ContributionsSlot() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-2xl font-bold">
          <Clock className="h-6 w-6 text-secondary" />
          Kontribusi Baru
        </h3>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-l-4 border-l-secondary bg-card p-4">
          <div className="mb-2 flex items-start justify-between">
            <h5 className="font-mono font-semibold text-primary">bucin</h5>
            <span className="text-xs text-muted-foreground">2 jam lalu</span>
          </div>
          <p className="mb-2 text-sm text-foreground">
            Budak cinta, seseorang yang sangat tergila-gila pada pasangannya
          </p>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Image
                src="/placeholder/potrait-placeholder.png"
                alt="@rani"
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="font-mono font-medium">@rani</span>
              <span className="rounded bg-blue-100 px-1 py-0.5 text-xs text-blue-700">
                Gen Z
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 text-secondary hover:text-secondary/80">
                <ThumbsUp className="h-3 w-3" />5
              </button>
              <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <MessageCircle className="h-3 w-3" />1
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
