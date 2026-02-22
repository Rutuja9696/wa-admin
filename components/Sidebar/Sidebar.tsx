import "./Sidebar.css";
import { useTab } from "@/context/TabContext";
import type { SuperUser } from "@/types/users";

const NAV_ITEMS = [
  { id: "Dashboard", label: "Dashboard" },
  { id: "Chats", label: "Chats", badge: "99+" },
  { id: "Groups", label: "Groups" },
  { id: "Contacts", label: "Contacts" },
  { id: "Logs", label: "Logs" },
  { id: "Files", label: "Files" },
  { id: "Settings", label: "Settings" },
] as const;

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
              <div className="Sidebar__nav-icon shrink-0" aria-hidden />
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