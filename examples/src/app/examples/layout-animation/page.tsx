"use client";

import { useState } from "react";
import { ExampleLayout } from "@/components/ExampleLayout";
import { MagicMove, useMagicMove } from "magicmove";

type Layout = "horizontal" | "vertical" | "grid" | "centered";

const items = [
  { id: "1", label: "A" },
  { id: "2", label: "B" },
  { id: "3", label: "C" },
  { id: "4", label: "D" },
];

function LayoutSelector({
  current,
  onChange,
}: {
  current: Layout;
  onChange: (layout: Layout) => void;
}) {
  const layouts: { value: Layout; label: string }[] = [
    { value: "horizontal", label: "Horizontal" },
    { value: "vertical", label: "Vertical" },
    { value: "grid", label: "Grid" },
    { value: "centered", label: "Centered" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {layouts.map((layout) => (
        <button
          key={layout.value}
          onClick={() => onChange(layout.value)}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
            current === layout.value
              ? "bg-[var(--text)] text-[var(--bg)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text)] border border-[var(--border)]"
          }`}
        >
          {layout.label}
        </button>
      ))}
    </div>
  );
}

function getLayoutStyles(layout: Layout) {
  switch (layout) {
    case "horizontal":
      return {
        container: "flex flex-row gap-4",
        item: "w-16 h-16",
      };
    case "vertical":
      return {
        container: "flex flex-col gap-4 items-center",
        item: "w-32 h-12",
      };
    case "grid":
      return {
        container: "grid grid-cols-2 gap-4 max-w-[160px] mx-auto",
        item: "w-16 h-16",
      };
    case "centered":
      return {
        container: "flex flex-col items-center gap-2",
        item: "w-48 h-10",
      };
  }
}

function LayoutAnimationDemo() {
  const { trigger } = useMagicMove();
  const [layout, setLayout] = useState<Layout>("horizontal");

  const handleLayoutChange = (newLayout: Layout) => {
    trigger(() => {
      setLayout(newLayout);
    });
  };

  const styles = getLayoutStyles(layout);

  return (
    <div className="space-y-8">
      <LayoutSelector current={layout} onChange={handleLayoutChange} />

      <div className="min-h-[200px] flex items-center justify-center py-8">
        <div className={styles.container}>
          {items.map((item) => (
            <MagicMove
              key={item.id}
              id={`box-${item.id}`}
              className={`${styles.item} rounded-lg border border-[var(--border)] bg-[var(--bg)] flex items-center justify-center text-[var(--text-secondary)] font-medium transition-shadow hover:border-[var(--text-tertiary)]`}
            >
              {item.label}
            </MagicMove>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-[var(--text-tertiary)]">
        Current layout: <span className="text-[var(--text)]">{layout}</span>
      </div>
    </div>
  );
}

export default function LayoutAnimationPage() {
  return (
    <ExampleLayout
      title="Layout Animation"
      description="Watch elements animate smoothly as they reposition to different layouts."
    >
      <LayoutAnimationDemo />
    </ExampleLayout>
  );
}
