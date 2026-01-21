"use client";

import Link from "next/link";

interface ExampleCardProps {
  title: string;
  description: string;
  href: string;
}

export function ExampleCard({ title, description, href }: ExampleCardProps) {
  return (
    <Link
      href={href}
      className="group block py-3 -mx-2 px-2 rounded hover:bg-[var(--bg-secondary)] transition-colors"
    >
      <h3 className="text-[var(--text)] mb-1">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </Link>
  );
}
