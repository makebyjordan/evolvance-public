
"use client";

import React, { useRef } from 'react';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function InteractiveCard({ children, className, ...props }: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  return (
    <Card
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn("group", className)}
      {...props}
    >
      {children}
    </Card>
  );
}
