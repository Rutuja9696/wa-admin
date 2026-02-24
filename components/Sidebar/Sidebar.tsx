import "./Sidebar.css";
import type { ReactNode } from "react";
import Image from "next/image";
import { useTab } from "@/context/TabContext";
import type { SuperUser } from "@/types/users";
import periskopeLogo from "@/components/Icons/periskopeLogo.png";
import whatsappFill from "@/components/Icons/whatsappFill.jpg";

const iconSvgFilled = (path: string, viewBox = "0 0 24 24") => (
  <svg className="Sidebar__nav-icon-svg" viewBox={viewBox} fill="currentColor" aria-hidden>
    <path fillRule="evenodd" clipRule="evenodd" d={path} />
  </svg>
);

const ChatsIcon = () => (
  <svg className="Sidebar__nav-icon-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    <circle cx="8" cy="13" r="1.25" fill="#fff" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="12" cy="13" r="1.25" fill="#fff" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="16" cy="13" r="1.25" fill="#fff" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

const NAV_ICONS: Record<string, ReactNode> = {
  Dashboard: iconSvgFilled("M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"),
  Chats: <ChatsIcon />,
  Groups: iconSvgFilled("M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"),
  Contacts: iconSvgFilled("M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM6 8h2v2H6V8zm6 0h8v2h-8V8zm-6 4h2v2H6v-2zm6 0h8v2h-8v-2zm-6 4h2v2H6v-2zm6 0h4v2h-4v-2z"),
  Logs: iconSvgFilled("M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-11 8l1.5-1.5 2.5 2.5 5-5 1.5 1.5-6.5 6.5-4-4zm0-5l1.5-1.5 2.5 2.5 5-5 1.5 1.5-6.5 6.5-4-4z"),
  Files: iconSvgFilled("M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"),
  Settings: iconSvgFilled("M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"),
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
        <div className="mr-2 Sidebar__logo flex items-center justify-center shrink-0 overflow-hidden">
          <Image src={periskopeLogo} alt="Periskope" width={40} height={40} className="object-contain" />
        </div>
        <div className="min-w-0 flex-1 flex items-start justify-between gap-1">
          <div className="min-w-0">
            <h1 className="mb-0 Sidebar__project-name">
              {superUserDetails?.projectName ?? "Periskope"}
            </h1>
            <h2 className="Sidebar__secondary-text mb-6">
              {superUserDetails?.email ?? "Loading..."}
            </h2>
          </div>
          <button
            type="button"
            className="Sidebar__periskope-chevrons shrink-0 mt-0.5 p-1 rounded hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/50"
            aria-label="Account or project menu"
          >
            <svg className="Sidebar__periskope-chevron" viewBox="0 0 24 24" fill="#4C5564" aria-hidden>
              <path d="M7 14l5-5 5 5H7z" />
            </svg>
            <svg className="Sidebar__periskope-chevron Sidebar__periskope-chevron--down" viewBox="0 0 24 24" fill="#4C5564" aria-hidden>
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </button>
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

      <div className="pt-4">
        <a
          href="#"
          className="Sidebar__nav-item-wrap flex items-center gap-3 text-sm"
          aria-label="Help and Support"
        >
          <span className="Sidebar__nav-icon shrink-0 flex items-center justify-center overflow-hidden" aria-hidden>
            <Image src={whatsappFill} alt="" width={32} height={32} className="object-contain" />
          </span>
          <span className="Sidebar__nav-item">Help & Support</span>
        </a>
      </div>
    </div>
  );
}