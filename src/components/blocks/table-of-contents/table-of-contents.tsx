import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/utils';

interface TableOfContentsProps {
  contentId: string;
}

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ contentId }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const content = document.getElementById(contentId);
    if (!content) return;

    const elements = content.querySelectorAll('h1, h2, h3');
    const items: HeadingItem[] = Array.from(elements)
      .map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: parseInt(element.tagName[1]),
      }))
      .filter((item) => item.id && item.text);

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [contentId]);

  const hasHeadings = headings.length > 0;

  const renderNav = () => (
    <nav className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
          Table of Contents
        </p>
      </div>
      <div className="space-y-1">
        {hasHeadings ? (
          headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                'block text-sm rounded-xl px-3 py-2 transition-all duration-200',
                heading.level === 1 && 'pl-3',
                heading.level === 2 && 'pl-6',
                heading.level === 3 && 'pl-9',
                activeId === heading.id
                  ? 'text-foreground bg-accent/10 border border-accent/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
              )}
            >
              {heading.text}
            </a>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No sections found.</p>
        )}
      </div>
    </nav>
  );

  return (
    <>
      <div className="hidden xl:block fixed right-8 top-28 w-72 max-h-[calc(100vh-10rem)]">
        <div className="max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-hide rounded-2xl border border-border/30 bg-background/80 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-4">
          {renderNav()}
        </div>
      </div>

      <div className="xl:hidden">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="fixed bottom-6 right-6 z-40 rounded-full border border-border/40 bg-background/80 px-4 py-2 text-xs font-semibold tracking-wide text-foreground shadow-lg backdrop-blur-md"
        >
          {isOpen ? 'Close' : 'Contents'}
        </button>

        {isOpen && (
          <div className="fixed inset-x-4 bottom-20 z-40 max-h-[60vh] overflow-y-auto scrollbar-hide rounded-2xl border border-border/30 bg-background/90 backdrop-blur-lg shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-4">
            {renderNav()}
          </div>
        )}
      </div>
    </>
  );
} 