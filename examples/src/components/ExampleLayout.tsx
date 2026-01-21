"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { MagicMoveProvider } from "magicmove";
import { ThemeToggle } from "./ThemeToggle";

const examples = [
  { title: "Layout Animation", href: "/examples/layout-animation" },
  { title: "Card Expand", href: "/examples/card-expand" },
  { title: "List ↔ Grid", href: "/examples/list-grid" },
  { title: "List Reordering", href: "/examples/list-reordering" },
  { title: "Tabs", href: "/examples/tabs" },
  { title: "Master-Detail", href: "/examples/master-detail" },
  { title: "Text Transitions", href: "/examples/text-transitions" },
  { title: "Image Gallery", href: "/examples/image-gallery" },
];

interface ExampleLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ExampleLayout({ title, description, children }: ExampleLayoutProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentExample = examples.find((e) => e.href === pathname);
  const currentIndex = examples.findIndex((e) => e.href === pathname);
  const prevExample = currentIndex > 0 ? examples[currentIndex - 1] : null;
  const nextExample = currentIndex < examples.length - 1 ? examples[currentIndex + 1] : null;

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 100);
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
          >
            ← MagicMove
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Title + Example Selector */}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-medium text-[var(--text)]">{title}</h1>
            <p className="text-[var(--text-secondary)] mt-1">{description}</p>
          </div>
          
          {/* Example Selector Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-[var(--text)] border border-[var(--border)] rounded-lg hover:border-[var(--text-tertiary)] transition-colors"
            >
              <span>{currentExample?.title || "Select"}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`transition-transform duration-200 ${isOpen && !isClosing ? "rotate-180" : ""}`}
              >
                <path d="M3 4.5L6 7.5L9 4.5" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div
                data-closing={isClosing}
                className="dropdown-menu absolute right-0 top-full mt-2 w-48 py-1 bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-lg z-20"
              >
                {examples.map((example) => (
                  <Link
                    key={example.href}
                    href={example.href}
                    onClick={closeMenu}
                    className={`block px-3 py-2 text-[13px] transition-colors ${
                      pathname === example.href
                        ? "text-[var(--text)] bg-[var(--bg-secondary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)]"
                    }`}
                  >
                    {example.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 pb-8">
        <div className="p-6 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
          <MagicMoveProvider duration={350} easing="cubic-bezier(0.22, 1, 0.36, 1)">
            {children}
          </MagicMoveProvider>
        </div>
      </main>

      {/* Prev/Next Navigation */}
      <nav className="max-w-5xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between pt-6 border-t border-[var(--border)]">
          {prevExample ? (
            <Link
              href={prevExample.href}
              className="group text-[13px]"
            >
              <span className="text-[var(--text-tertiary)]">Previous</span>
              <span className="block text-[var(--text-secondary)] group-hover:text-[var(--text)] transition-colors">
                ← {prevExample.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextExample ? (
            <Link
              href={nextExample.href}
              className="group text-[13px] text-right"
            >
              <span className="text-[var(--text-tertiary)]">Next</span>
              <span className="block text-[var(--text-secondary)] group-hover:text-[var(--text)] transition-colors">
                {nextExample.title} →
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </div>
  );
}
