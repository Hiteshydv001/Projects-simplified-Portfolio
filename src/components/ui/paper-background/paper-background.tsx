'use client';

import React from 'react';
import { cn } from '@/lib/utils/utils';

export function PaperBackground({ className }: { className?: string }) {
  return (
    <div 
      className={cn(
        "fixed inset-0 -z-[1] opacity-35 dark:opacity-25 pointer-events-none select-none",
        className
      )}
    >
      {/* Light mode texture */}
      <div 
        className="absolute inset-0 bg-[url('/textures/paper-light.png')] bg-repeat dark:hidden"
        style={{
          backgroundSize: '500px 500px',
        }}
      />
      
      {/* Dark mode texture */}
      <div 
        className="absolute inset-0 hidden dark:block bg-[url('/textures/paper-dark.png')] bg-repeat"
        style={{
          backgroundSize: '500px 500px',
        }}
      />
    </div>
  );
}
