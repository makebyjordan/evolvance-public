
"use client";

import { cn } from "@/lib/utils";

interface SectionSeparatorProps {
  position: 'top' | 'bottom';
}

export function SectionSeparator({ position }: SectionSeparatorProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute -z-10 w-full h-[50vh] pointer-events-none",
        position === 'top' ? 'top-0' : 'bottom-0'
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 mx-auto w-1/2 h-full bg-gradient-to-b from-primary/20 to-transparent",
           position === 'top' ? 'top-0' : 'bottom-auto',
           "filter blur-3xl"
        )}
      />
    </div>
  );
}
