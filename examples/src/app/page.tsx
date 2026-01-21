import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://magicmove.saktichourasia.dev"),
  title: "MagicMove – React View Transitions Library",
  description:
    "A lightweight React library that brings Apple Keynote's Magic Move transitions to the web using the native View Transitions API. Create smooth, animated transitions between UI states with minimal code.",
  keywords: [
    "React",
    "View Transitions",
    "animations",
    "Magic Move",
    "UI transitions",
    "React library",
    "web animations",
  ],
  authors: [
    {
      name: "Sakti Kumar Chourasia",
      url: "https://github.com/shakcho",
    },
    {
      name: "Sakti Kumar Chourasia",
      url: "https://linkedin.com/in/shakcho",
    },
  ],
  creator: "Sakti Kumar Chourasia",
  openGraph: {
    title: "MagicMove – React View Transitions Library",
    description:
      "A lightweight React library that brings Apple Keynote's Magic Move transitions to the web using the native View Transitions API.",
    type: "website",
    url: "https://magicmove.saktichourasia.dev",
    siteName: "MagicMove",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MagicMove – React View Transitions Library",
    description:
      "A lightweight React library that brings Apple Keynote's Magic Move transitions to the web using the native View Transitions API.",
  },
  alternates: {
    canonical: "https://magicmove.saktichourasia.dev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const examples = [
  {
    title: "Master-Detail",
    description: "List to detail view with shared element transitions.",
    href: "/examples/master-detail",
  },
  {
    title: "List ↔ Grid",
    description: "Toggle between list and grid layouts.",
    href: "/examples/list-grid",
  },
  {
    title: "Text Transitions",
    description: "Headlines, quotes, and content animations.",
    href: "/examples/text-transitions",
  },
  {
    title: "Card Expand",
    description: "Expandable cards with zoom transitions.",
    href: "/examples/card-expand",
  },
  {
    title: "Image Gallery",
    description: "Photo gallery with lightbox transitions.",
    href: "/examples/image-gallery",
  },
  {
    title: "Layout Animation",
    description: "Elements animate to new positions.",
    href: "/examples/layout-animation",
  },
  {
    title: "List Reordering",
    description: "Shuffle and reverse with animations.",
    href: "/examples/list-reordering",
  },
  {
    title: "Tabs",
    description: "Animated tab switching.",
    href: "/examples/tabs",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 pt-12 pb-10">
        <div className="flex items-center justify-between mb-10">
          <span className="text-[13px] text-[var(--text-secondary)]">MagicMove</span>
          <ThemeToggle />
        </div>

        <h1 className="text-xl font-medium text-[var(--text)] mb-3">
          React View Transitions Library
        </h1>
        <p className="text-[var(--text-secondary)] leading-relaxed max-w-xl">
          A lightweight library that brings Apple Keynote&apos;s Magic Move
          transitions to the web using the native{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API"
            className="text-[var(--text)] underline underline-offset-2 decoration-[var(--border)] hover:decoration-[var(--text-tertiary)] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Transitions API
          </a>
          .
        </p>
      </header>

      {/* Install */}
      <section className="max-w-3xl mx-auto px-6 pb-8">
        <CodeBlock
          language="bash"
          code="npm install magicmove"
        />
      </section>

      {/* Usage */}
      <section className="max-w-3xl mx-auto px-6 pb-12">
        <h2 className="text-[13px] text-[var(--text-secondary)] mb-3">Usage</h2>
        <CodeBlock
          code={`import { MagicMoveProvider, MagicMove, useMagicMove } from 'magicmove';

function App() {
  const { trigger } = useMagicMove();
  const [expanded, setExpanded] = useState(false);

  return (
    <MagicMoveProvider>
      <MagicMove id="card" className={expanded ? 'large' : 'small'}>
        <button onClick={() => trigger(() => setExpanded(!expanded))}>
          Toggle
        </button>
      </MagicMove>
    </MagicMoveProvider>
  );
}`}
        />
      </section>

      {/* Examples */}
      <section className="max-w-3xl mx-auto px-6 pb-12">
        <h2 className="text-[13px] text-[var(--text-secondary)] mb-4">Examples</h2>
        <div className="grid gap-px bg-[var(--border)] rounded-lg overflow-hidden border border-[var(--border)]">
          {examples.map((example) => (
            <Link
              key={example.href}
              href={example.href}
              className="flex items-center justify-between gap-4 px-4 py-3 bg-[var(--bg)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <span className="text-[var(--text)]">{example.title}</span>
              <span className="text-[13px] text-[var(--text-tertiary)]">
                {example.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto px-6 pb-12">
        <div className="pt-6 border-t border-[var(--border)]">
          <a
            href="https://github.com"
            className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
