"use client";

import { useState } from "react";
import { ExampleLayout } from "@/components/ExampleLayout";
import { MagicMoveList, useMagicMove } from "magicmove";

interface Task {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "done";
}

const initialTasks: Task[] = [
  { id: "1", title: "Implement authentication", priority: "high", status: "done" },
  { id: "2", title: "Design dashboard layout", priority: "medium", status: "in-progress" },
  { id: "3", title: "Write API documentation", priority: "low", status: "todo" },
  { id: "4", title: "Set up CI/CD pipeline", priority: "high", status: "todo" },
  { id: "5", title: "Optimize database queries", priority: "medium", status: "in-progress" },
  { id: "6", title: "Add unit tests", priority: "high", status: "todo" },
  { id: "7", title: "Create onboarding flow", priority: "low", status: "todo" },
  { id: "8", title: "Refactor user settings", priority: "medium", status: "done" },
];

function TaskItem({ task }: { task: Task }) {
  return (
    <div className="flex items-center gap-3 bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 hover:border-[var(--text-tertiary)] transition-colors">
      <span
        className={`text-sm ${
          task.status === "done"
            ? "text-[var(--text-tertiary)]"
            : task.status === "in-progress"
            ? "text-[var(--text-secondary)]"
            : "text-[var(--text-tertiary)]"
        }`}
      >
        {task.status === "done" ? "●" : task.status === "in-progress" ? "◐" : "○"}
      </span>
      <span
        className={`flex-1 ${
          task.status === "done" ? "line-through text-[var(--text-tertiary)]" : "text-[var(--text)]"
        }`}
      >
        {task.title}
      </span>
      <span className="text-xs text-[var(--text-tertiary)] capitalize">
        {task.priority}
      </span>
    </div>
  );
}

function ListReorderingDemo() {
  const { trigger } = useMagicMove();
  const [tasks, setTasks] = useState(initialTasks);

  const shuffle = () => {
    trigger(() => {
      setTasks([...tasks].sort(() => Math.random() - 0.5));
    });
  };

  const sortByPriority = () => {
    const order = { high: 0, medium: 1, low: 2 };
    trigger(() => {
      setTasks([...tasks].sort((a, b) => order[a.priority] - order[b.priority]));
    });
  };

  const sortByStatus = () => {
    const order = { "in-progress": 0, todo: 1, done: 2 };
    trigger(() => {
      setTasks([...tasks].sort((a, b) => order[a.status] - order[b.status]));
    });
  };

  const reverse = () => {
    trigger(() => {
      setTasks([...tasks].reverse());
    });
  };

  const reset = () => {
    trigger(() => {
      setTasks(initialTasks);
    });
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: "Shuffle", onClick: shuffle },
          { label: "By Priority", onClick: sortByPriority },
          { label: "By Status", onClick: sortByStatus },
          { label: "Reverse", onClick: reverse },
          { label: "Reset", onClick: reset },
        ].map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="px-3 py-1.5 border border-[var(--border)] rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--text-tertiary)] transition-colors"
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Task List */}
      <MagicMoveList
        items={tasks}
        getKey={(task) => task.id}
        renderItem={(task) => <TaskItem task={task} />}
        className="space-y-2"
        transitionPrefix="task"
      />

      <div className="text-center text-sm text-[var(--text-tertiary)]">
        {tasks.length} tasks
      </div>
    </div>
  );
}

export default function ListReorderingPage() {
  return (
    <ExampleLayout
      title="List Reordering"
      description="Sort, shuffle, or reverse the list to see smooth reordering animations."
    >
      <ListReorderingDemo />
    </ExampleLayout>
  );
}
