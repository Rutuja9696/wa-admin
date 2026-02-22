import "./Sidebar.css";
import type { ReactNode } from "react";
import { useTab } from "@/context/TabContext";
import type { SuperUser } from "@/types/users";

const iconSvg = (path: string, viewBox = "0 0 24 24") => (
  <svg className="Sidebar__nav-icon-svg" viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={path} />
  </svg>
);

const NAV_ICONS: Record<string, ReactNode> = {
  Dashboard: iconSvg("M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"),
  Chats: iconSvg("M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"),
  Groups: iconSvg("M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"),
  Contacts: iconSvg("M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"),
  Logs: iconSvg("M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"),
  Files: iconSvg("M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"),
  Settings: iconSvg("M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"),
};

interface NavItemConfig {
  id: string;
  label: string;
  badge?: string;
  icon?: ReactNode;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: "Dashboard", label: "Dashboard", icon: NAV_ICONS.Dashboard },
  { id: "Chats", label: "Chats", badge: "99+", icon: NAV_ICONS.Chats },
  { id: "Groups", label: "Groups", icon: NAV_ICONS.Groups },
  { id: "Contacts", label: "Contacts", icon: NAV_ICONS.Contacts },
  { id: "Logs", label: "Logs", icon: NAV_ICONS.Logs },
  { id: "Files", label: "Files", icon: NAV_ICONS.Files },
  { id: "Settings", label: "Settings", icon: NAV_ICONS.Settings },
];

interface SidebarProps {
  superUserDetails: SuperUser | null;
}

export default function Sidebar({ superUserDetails }: SidebarProps) {
  const { selectedTab, setSelectedTab } = useTab();

  return (
    <div className="w-60 Sidebar flex flex-col">
      <div className="flex mb-6">
        <div className="mr-2 Sidebar__logo flex items-center justify-center shrink-0">
          P
        </div>
        <div className="min-w-0">
          <h1 className="mb-0 Sidebar__project-name">
            {superUserDetails?.projectName ?? "Loading..."}
          </h1>
          <h2 className="Sidebar__secondary-text mb-6">
            {superUserDetails?.email ?? "Loading..."}
          </h2>
        </div>
      </div>

      <nav className="flex-1">
        {NAV_ITEMS.map((item) => {
          const isSelected = selectedTab === item.id;
          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedTab(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedTab(item.id);
                }
              }}
              className={`Sidebar__nav-item-wrap flex items-center gap-3 ${
                isSelected ? "Sidebar__nav-item-wrap--selected" : ""
              }`}
              aria-current={isSelected ? "page" : undefined}
            >
              <span className="Sidebar__nav-icon shrink-0" aria-hidden>
                {item.icon ?? null}
              </span>
              <span className="Sidebar__nav-item flex-1 truncate">{item.label}</span>
              {"badge" in item && item.badge ? (
                <span className="Sidebar__badge shrink-0 inline-flex items-center justify-center px-1.5">{item.badge}</span>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-gray-200">
        <a
          href="#"
          className="Sidebar__nav-item-wrap flex items-center gap-3 text-sm"
          aria-label="Help and Support"
        >
          <span className="Sidebar__nav-icon shrink-0" aria-hidden />
          <span className="Sidebar__nav-item">Help & Support</span>
        </a>
      </div>
    </div>
  );
}