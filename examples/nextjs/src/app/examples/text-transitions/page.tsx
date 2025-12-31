"use client";

import { useState } from "react";
import { ExampleLayout } from "@/components/ExampleLayout";
import { MagicMove, useMagicMove } from "magicmove";

// ============================================================================
// Headline Morph Demo
// ============================================================================

const headlines = [
  { text: "Build faster.", emphasis: "faster" },
  { text: "Ship with confidence.", emphasis: "confidence" },
  { text: "Scale infinitely.", emphasis: "infinitely" },
  { text: "Delight users.", emphasis: "users" },
];

function HeadlineMorphDemo() {
  const { trigger } = useMagicMove();
  const [index, setIndex] = useState(0);
  const current = headlines[index];

  const next = () => {
    trigger(() => {
      setIndex((i) => (i + 1) % headlines.length);
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm text-[var(--text-tertiary)]">Headline Morph</h3>
      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-8 text-center">
        <MagicMove id="headline-container" className="inline-block">
          <MagicMove
            id="headline-text"
            as="h2"
            className="text-3xl md:text-4xl font-medium text-[var(--text)]"
          >
            {current.text.split(current.emphasis).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <MagicMove
                    id="headline-emphasis"
                    as="span"
                    className="underline underline-offset-4 decoration-[var(--text-tertiary)]"
                  >
                    {current.emphasis}
                  </MagicMove>
                )}
              </span>
            ))}
          </MagicMove>
        </MagicMove>
        <button
          onClick={next}
          className="mt-6 px-4 py-2 border border-[var(--border)] rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--text-tertiary)] transition-colors"
        >
          Next headline
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Quote Carousel Demo
// ============================================================================

const quotes = [
  {
    id: "1",
    text: "MagicMove has transformed how we build interactive experiences. The animations feel so natural.",
    author: "Sarah Chen",
    role: "Engineering Lead",
  },
  {
    id: "2",
    text: "Finally, a library that makes view transitions simple. Our users love the smooth feel.",
    author: "Marcus Johnson",
    role: "Product Designer",
  },
  {
    id: "3",
    text: "The API is so intuitive. We integrated MagicMove into our app in less than an hour.",
    author: "Emily Rodriguez",
    role: "Frontend Developer",
  },
];

function QuoteCarouselDemo() {
  const { trigger } = useMagicMove();
  const [currentIndex, setCurrentIndex] = useState(0);
  const quote = quotes[currentIndex];

  const goTo = (index: number) => {
    if (index !== currentIndex) {
      trigger(() => setCurrentIndex(index));
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm text-[var(--text-tertiary)]">Quote Carousel</h3>
      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-8">
        <MagicMove
          id="quote-container"
          className="text-center max-w-xl mx-auto"
        >
          <MagicMove
            id="quote-text"
            as="blockquote"
            className="text-lg text-[var(--text)] leading-relaxed italic"
          >
            &ldquo;{quote.text}&rdquo;
          </MagicMove>
          <div className="mt-4">
            <MagicMove id="quote-author" className="text-[var(--text)] font-medium text-sm">
              {quote.author}
            </MagicMove>
            <MagicMove id="quote-role" className="text-[var(--text-tertiary)] text-sm">
              {quote.role}
            </MagicMove>
          </div>
        </MagicMove>

        <div className="flex justify-center gap-2 mt-6">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? "bg-[var(--text)]" : "bg-[var(--border)] hover:bg-[var(--text-tertiary)]"
              }`}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Text Size Toggle Demo
// ============================================================================

type TextSize = "small" | "medium" | "large";

function TextSizeDemo() {
  const { trigger } = useMagicMove();
  const [size, setSize] = useState<TextSize>("medium");

  const sizes = {
    small: { heading: "text-lg", body: "text-sm", spacing: "space-y-2" },
    medium: { heading: "text-2xl", body: "text-base", spacing: "space-y-3" },
    large: { heading: "text-4xl", body: "text-lg", spacing: "space-y-4" },
  };

  const changeSize = (newSize: TextSize) => {
    trigger(() => setSize(newSize));
  };

  const currentSize = sizes[size];

  return (
    <div className="space-y-6">
      <h3 className="text-sm text-[var(--text-tertiary)]">Text Size Transition</h3>
      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-8">
        <div className="flex gap-2 mb-6">
          {(["small", "medium", "large"] as const).map((s) => (
            <button
              key={s}
              onClick={() => changeSize(s)}
              className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                size === s
                  ? "bg-[var(--text)] text-[var(--bg)]"
                  : "text-[var(--text-secondary)] border border-[var(--border)] hover:text-[var(--text)]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <MagicMove id="text-block" className={currentSize.spacing}>
          <MagicMove
            id="text-heading"
            as="h2"
            className={`${currentSize.heading} font-medium text-[var(--text)]`}
          >
            Welcome to MagicMove
          </MagicMove>
          <MagicMove
            id="text-body"
            as="p"
            className={`${currentSize.body} text-[var(--text-secondary)] max-w-xl`}
          >
            A lightweight library for creating smooth view transitions in React applications.
          </MagicMove>
        </MagicMove>
      </div>
    </div>
  );
}

// ============================================================================
// Stats Counter Demo
// ============================================================================

const statsPresets = [
  { users: "1.2K", revenue: "$45K", growth: "+12%" },
  { users: "5.8K", revenue: "$128K", growth: "+34%" },
  { users: "24.5K", revenue: "$892K", growth: "+67%" },
  { users: "156K", revenue: "$4.2M", growth: "+142%" },
];

function StatsCounterDemo() {
  const { trigger } = useMagicMove();
  const [presetIndex, setPresetIndex] = useState(0);
  const stats = statsPresets[presetIndex];

  const nextPreset = () => {
    trigger(() => {
      setPresetIndex((i) => (i + 1) % statsPresets.length);
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm text-[var(--text-tertiary)]">Stats Counter</h3>
      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-8">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <MagicMove
              id="stat-users"
              className="text-2xl font-medium text-[var(--text)]"
            >
              {stats.users}
            </MagicMove>
            <div className="text-sm text-[var(--text-tertiary)] mt-1">Users</div>
          </div>
          <div>
            <MagicMove
              id="stat-revenue"
              className="text-2xl font-medium text-[var(--text)]"
            >
              {stats.revenue}
            </MagicMove>
            <div className="text-sm text-[var(--text-tertiary)] mt-1">Revenue</div>
          </div>
          <div>
            <MagicMove
              id="stat-growth"
              className="text-2xl font-medium text-[var(--text)]"
            >
              {stats.growth}
            </MagicMove>
            <div className="text-sm text-[var(--text-tertiary)] mt-1">Growth</div>
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={nextPreset}
            className="px-4 py-2 border border-[var(--border)] rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--text-tertiary)] transition-colors"
          >
            Simulate growth
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

function TextTransitionsDemo() {
  return (
    <div className="space-y-8">
      <HeadlineMorphDemo />
      <QuoteCarouselDemo />
      <TextSizeDemo />
      <StatsCounterDemo />
    </div>
  );
}

export default function TextTransitionsPage() {
  return (
    <ExampleLayout
      title="Text Transitions"
      description="Various text animation patterns including headlines, quotes, and content transitions."
    >
      <TextTransitionsDemo />
    </ExampleLayout>
  );
}
