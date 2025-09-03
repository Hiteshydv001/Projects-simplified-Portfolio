'use client';

import React from 'react';
import { cn } from '@/lib/utils/utils';

export function PaperBackground({ className }: { className?: string }) {
  return (
    <div 
      className={cn(
        "fixed inset-0 -z-[1] opacity-60 dark:opacity-50 pointer-events-none select-none",
        className
      )}
    >
      {/* Light mode texture */}
      <div 
        className="absolute inset-0 bg-[url('/textures/paper-light.png')] bg-repeat dark:hidden"
        style={{
          backgroundSize: '500px 500px',
          animation: 'paper-shift 20s ease-in-out infinite'
        }}
      />
      
      {/* Dark mode texture */}
      <div 
        className="absolute inset-0 hidden dark:block bg-[url('/textures/paper-dark.png')] bg-repeat mix-blend-soft-light"
        style={{
          backgroundSize: '500px 500px',
          animation: 'paper-shift 20s ease-in-out infinite'
        }}
      />

      {/* Overlay for depth */}
      <div 
        className="absolute inset-0 bg-background/50 mix-blend-overlay dark:mix-blend-multiply"
      />

      <style>
        {`
          @keyframes paper-shift {
            from {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            to {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}
