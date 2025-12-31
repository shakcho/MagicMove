"use client";

import { useState } from "react";
import { ExampleLayout } from "@/components/ExampleLayout";
import { MagicMove, useMagicMove } from "magicmove";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  bio: string;
  joinedDate: string;
  department: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "Engineering Lead",
    avatar: "SC",
    bio: "Passionate about building scalable systems and mentoring engineers. Previously at Google and Meta.",
    joinedDate: "Jan 2022",
    department: "Engineering",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus.j@example.com",
    role: "Product Designer",
    avatar: "MJ",
    bio: "Design systems enthusiast. Focused on creating delightful user experiences through thoughtful design.",
    joinedDate: "Mar 2021",
    department: "Design",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    role: "Product Manager",
    avatar: "ER",
    bio: "Building products that users love. Background in data science and user research.",
    joinedDate: "Sep 2023",
    department: "Product",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@example.com",
    role: "Senior Developer",
    avatar: "DK",
    bio: "Full-stack developer with a passion for React and TypeScript. Open source contributor.",
    joinedDate: "Jun 2020",
    department: "Engineering",
  },
];

function UserListItem({
  user,
  isSelected,
  onClick,
}: {
  user: User;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <MagicMove
      id={`user-card-${user.id}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && onClick()}
      className={`p-4 rounded-lg cursor-pointer transition-colors border ${
        isSelected
          ? "border-[var(--text)] bg-[var(--bg)]"
          : "border-[var(--border)] hover:border-[var(--text-tertiary)]"
      }`}
    >
      <div className="flex items-center gap-3">
        <MagicMove
          id={`user-avatar-${user.id}`}
          className="w-10 h-10 bg-[var(--border)] rounded-full flex items-center justify-center text-xs font-medium text-[var(--text-secondary)]"
        >
          {user.avatar}
        </MagicMove>
        <div className="flex-1 min-w-0">
          <MagicMove
            id={`user-name-${user.id}`}
            className="font-medium text-[var(--text)] truncate"
          >
            {user.name}
          </MagicMove>
          <MagicMove
            id={`user-role-${user.id}`}
            className="text-sm text-[var(--text-secondary)] truncate"
          >
            {user.role}
          </MagicMove>
        </div>
      </div>
    </MagicMove>
  );
}

function UserDetail({ user, onClose }: { user: User; onClose: () => void }) {
  return (
    <MagicMove
      id={`user-card-${user.id}`}
      className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-6"
    >
      <div className="flex items-start gap-4 mb-6">
        <MagicMove
          id={`user-avatar-${user.id}`}
          className="w-16 h-16 bg-[var(--border)] rounded-lg flex items-center justify-center text-lg font-medium text-[var(--text-secondary)]"
        >
          {user.avatar}
        </MagicMove>
        <div className="flex-1">
          <MagicMove
            id={`user-name-${user.id}`}
            className="text-xl font-medium text-[var(--text)]"
          >
            {user.name}
          </MagicMove>
          <MagicMove
            id={`user-role-${user.id}`}
            className="text-[var(--text-secondary)] mt-1"
          >
            {user.role}
          </MagicMove>
        </div>
        <button
          onClick={onClose}
          className="text-[var(--text-secondary)] hover:text-[var(--text)] text-xl"
        >
          ×
        </button>
      </div>

      <div className="space-y-4 text-[var(--text-secondary)]">
        <p>{user.bio}</p>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border)]">
          <div>
            <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Email</div>
            <div className="text-[var(--text)] mt-1">{user.email}</div>
          </div>
          <div>
            <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Department</div>
            <div className="text-[var(--text)] mt-1">{user.department}</div>
          </div>
          <div>
            <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Joined</div>
            <div className="text-[var(--text)] mt-1">{user.joinedDate}</div>
          </div>
        </div>
      </div>
    </MagicMove>
  );
}

function MasterDetailDemo() {
  const { trigger } = useMagicMove();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const handleSelect = (userId: string) => {
    trigger(() => {
      setSelectedUserId(userId);
    });
  };

  const handleClose = () => {
    trigger(() => {
      setSelectedUserId(null);
    });
  };

  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-6">
      {/* List */}
      <div className="space-y-2">
        {users.map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            isSelected={selectedUserId === user.id}
            onClick={() => handleSelect(user.id)}
          />
        ))}
      </div>

      {/* Detail */}
      <div className="min-h-[400px]">
        {selectedUser ? (
          <UserDetail user={selectedUser} onClose={handleClose} />
        ) : (
          <div className="h-full flex items-center justify-center text-[var(--text-tertiary)] border border-dashed border-[var(--border)] rounded-lg">
            Select a user to view details
          </div>
        )}
      </div>
    </div>
  );
}

export default function MasterDetailPage() {
  return (
    <ExampleLayout
      title="Master-Detail"
      description="Click a user to see detailed information with shared element transitions."
    >
      <MasterDetailDemo />
    </ExampleLayout>
  );
}
