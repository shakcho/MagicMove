"use client";

import { useState } from "react";
import { ExampleLayout } from "@/components/ExampleLayout";
import { MagicMove, useMagicMove } from "magicmove";

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  stats: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    id: "1",
    title: "Analytics Dashboard",
    description: "Real-time data visualization and reporting",
    fullDescription:
      "A comprehensive analytics dashboard that provides real-time insights into your business metrics. Features include customizable charts, automated reports, and AI-powered predictions.",
    stats: [
      { label: "Users", value: "12.5k" },
      { label: "Charts", value: "45" },
      { label: "Reports", value: "120" },
    ],
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description: "Full-stack shopping experience",
    fullDescription:
      "A modern e-commerce platform with inventory management, payment processing, and customer analytics. Supports multiple currencies and shipping integrations.",
    stats: [
      { label: "Products", value: "2.3k" },
      { label: "Orders", value: "890" },
      { label: "Revenue", value: "$45k" },
    ],
  },
  {
    id: "3",
    title: "Task Management",
    description: "Collaborative project organization",
    fullDescription:
      "A powerful task management system with team collaboration features. Includes Kanban boards, Gantt charts, time tracking, and integrations with popular tools.",
    stats: [
      { label: "Tasks", value: "5.6k" },
      { label: "Teams", value: "23" },
      { label: "Projects", value: "156" },
    ],
  },
  {
    id: "4",
    title: "Social Network",
    description: "Community building platform",
    fullDescription:
      "A social networking platform designed for communities. Features include posts, comments, direct messaging, groups, and event management.",
    stats: [
      { label: "Members", value: "34k" },
      { label: "Posts", value: "12k" },
      { label: "Groups", value: "89" },
    ],
  },
];

function ProjectCard({
  project,
  isExpanded,
  isHidden,
  onClick,
}: {
  project: Project;
  isExpanded: boolean;
  isHidden: boolean;
  onClick: () => void;
}) {
  if (isHidden) return null;

  return (
    <MagicMove
      id={`project-${project.id}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && onClick()}
      className={`cursor-pointer transition-shadow ${
        isExpanded
          ? "fixed inset-4 md:inset-12 z-50 bg-[var(--bg)] border border-[var(--border)] rounded-lg p-6 overflow-auto"
          : "bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--text-tertiary)] rounded-lg p-4"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <MagicMove
            id={`project-title-${project.id}`}
            className={`font-medium text-[var(--text)] ${isExpanded ? "text-xl" : ""}`}
          >
            {project.title}
          </MagicMove>
          <MagicMove
            id={`project-desc-${project.id}`}
            className="text-[var(--text-secondary)] mt-1 text-sm"
          >
            {project.description}
          </MagicMove>
        </div>
        {isExpanded && (
          <button className="text-[var(--text-secondary)] hover:text-[var(--text)] text-xl">
            ×
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-6">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {project.fullDescription}
          </p>

          <div className="grid grid-cols-3 gap-4">
            {project.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[var(--bg-secondary)] rounded-lg p-4 text-center"
              >
                <div className="text-xl font-medium text-[var(--text)]">{stat.value}</div>
                <div className="text-xs text-[var(--text-tertiary)] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <button className="px-4 py-2 rounded-lg bg-[var(--text)] text-[var(--bg)] text-sm font-medium">
              View Details
            </button>
            <button className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text)] text-sm hover:border-[var(--text-tertiary)] transition-colors">
              Settings
            </button>
          </div>
        </div>
      )}
    </MagicMove>
  );
}

function CardExpandDemo() {
  const { trigger } = useMagicMove();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    trigger(() => {
      setSelectedId(selectedId === id ? null : id);
    });
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isExpanded={selectedId === project.id}
            isHidden={selectedId !== null && selectedId !== project.id}
            onClick={() => handleCardClick(project.id)}
          />
        ))}
      </div>

      {selectedId && (
        <div
          className="fixed inset-0 bg-[var(--bg)]/80 z-40"
          onClick={() => trigger(() => setSelectedId(null))}
        />
      )}
    </>
  );
}

export default function CardExpandPage() {
  return (
    <ExampleLayout
      title="Card Expand"
      description="Click a card to see it expand with smooth shared element transitions."
    >
      <CardExpandDemo />
    </ExampleLayout>
  );
}
