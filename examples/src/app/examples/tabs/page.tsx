"use client";

import { useState, useRef, useEffect } from "react";
import { ExampleLayout } from "@/components/ExampleLayout";
import { MagicMove, useMagicMove } from "magicmove";

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: "overview", label: "Overview" },
  { id: "analytics", label: "Analytics" },
  { id: "settings", label: "Settings" },
  { id: "team", label: "Team" },
];

function TabContent({ tabId }: { tabId: string }) {
  switch (tabId) {
    case "overview":
      return (
        <div className="space-y-4">
          <h3 className="font-medium text-[var(--text)]">Dashboard Overview</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total Users", value: "12,345" },
              { label: "Revenue", value: "$54,321" },
              { label: "Active Sessions", value: "1,234" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-4"
              >
                <div className="text-[var(--text-secondary)] text-sm">{stat.label}</div>
                <div className="text-xl font-medium text-[var(--text)] mt-1">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case "analytics":
      return (
        <div className="space-y-4">
          <h3 className="font-medium text-[var(--text)]">Analytics</h3>
          <div className="h-32 bg-[var(--bg)] border border-[var(--border)] rounded-lg flex items-center justify-center text-[var(--text-tertiary)]">
            Chart visualization
          </div>
        </div>
      );
    case "settings":
      return (
        <div className="space-y-4">
          <h3 className="font-medium text-[var(--text)]">Settings</h3>
          <div className="space-y-2">
            {["Email notifications", "Push notifications", "Weekly reports"].map((setting) => (
              <div
                key={setting}
                className="flex items-center justify-between bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3"
              >
                <span className="text-[var(--text)]">{setting}</span>
                <div className="w-8 h-4 bg-[var(--border)] rounded-full" />
              </div>
            ))}
          </div>
        </div>
      );
    case "team":
      return (
        <div className="space-y-4">
          <h3 className="font-medium text-[var(--text)]">Team Members</h3>
          <div className="space-y-2">
            {[
              { name: "Alice Chen", role: "Engineering Lead" },
              { name: "Bob Smith", role: "Designer" },
              { name: "Carol White", role: "Product Manager" },
            ].map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-3 bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3"
              >
                <div className="w-8 h-8 bg-[var(--border)] rounded-full flex items-center justify-center text-xs text-[var(--text-secondary)]">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="text-[var(--text)] text-sm">{member.name}</div>
                  <div className="text-[var(--text-tertiary)] text-xs">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

function TabsDemo() {
  const { trigger } = useMagicMove();
  const [activeTab, setActiveTab] = useState("overview");
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const activeIndex = tabs.findIndex((t) => t.id === activeTab);

  useEffect(() => {
    const activeButton = tabsRef.current[activeIndex];
    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [activeIndex]);

  const handleTabChange = (tabId: string) => {
    trigger(() => {
      setActiveTab(tabId);
    });
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="relative">
        <div className="flex border-b border-[var(--border)]">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el) => { tabsRef.current[index] = el; }}
              onClick={() => handleTabChange(tab.id)}
              className={`relative px-4 py-2 text-[13px] transition-colors ${
                activeTab === tab.id
                  ? "text-[var(--text)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Indicator */}
        <MagicMove
          id="tab-indicator"
          className="absolute bottom-0 h-[2px] bg-[var(--text)]"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />
      </div>

      {/* Tab Content */}
      <MagicMove id="tab-content" className="min-h-[200px]">
        <TabContent tabId={activeTab} />
      </MagicMove>
    </div>
  );
}

export default function TabsPage() {
  return (
    <ExampleLayout
      title="Tabs"
      description="Animated tab switching with indicator and content transitions."
    >
      <TabsDemo />
    </ExampleLayout>
  );
}
