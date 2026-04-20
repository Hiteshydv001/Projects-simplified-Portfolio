'use client';

import React from 'react';
import { cn } from '@/lib/utils/utils';

export function PaperBackground({ className }: { className?: string }) {
  return (
    <div 
      className={cn(
        "fixed inset-0 -z-[1] opacity-60 dark:opacity-40 pointer-events-none select-none",
        className
      )}
    >
      {/* Light mode texture */}
      <div 
        className="absolute inset-0 bg-[url('/textures/paper-light.png')] bg-repeat dark:hidden mix-blend-multiply"
        style={{
          backgroundSize: '500px 500px',
        }}
      />
      
      {/* Dark mode texture */}
      <div 
        className="absolute inset-0 hidden dark:block bg-[url('/textures/paper-dark.png')] bg-repeat mix-blend-soft-light"
        style={{
          backgroundSize: '500px 500px',
        }}
      />
    </div>
  );
}
