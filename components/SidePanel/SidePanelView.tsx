"use client";

import "./SidePanel.css";
import type { RefObject } from "react";
import Chip from "@/components/Chip/Chip";
import Pill from "@/components/Pill/Pill";
import { formatLastActive } from "@/lib/formatDate";
import { LABEL_COLORS } from "@/lib/labels";
import type { UserGroup } from "@/types/users";

type SidePanelTab = "Overview" | "Members" | "Logs";

const TABS: SidePanelTab[] = ["Overview", "Members", "Logs"];

interface SidePanelViewProps {
  group: UserGroup | null;
  labelItems: string[];
  activeTab: SidePanelTab;
  onTabChange: (tab: SidePanelTab) => void;
  permissionDropdownOpen: boolean;
  onPermissionDropdownToggle: () => void;
  onPermissionClose: () => void;
  permissionRef: RefObject<HTMLDivElement | null>;
  disappearingDropdownOpen: boolean;
  onDisappearingDropdownToggle: () => void;
  onDisappearingClose: () => void;
  disappearingRef: RefObject<HTMLDivElement | null>;
  onRefresh?: (group: UserGroup) => void;
}

export function SidePanelView({
  group,
  labelItems,
  activeTab,
  onTabChange,
  permissionDropdownOpen,
  onPermissionDropdownToggle,
  onPermissionClose,
  permissionRef,
  disappearingDropdownOpen,
  onDisappearingDropdownToggle,
  onDisappearingClose,
  disappearingRef,
  onRefresh,
}: SidePanelViewProps) {
  if (!group) {
    return (
      <div className="flex flex-col items-center justify-center SidePanel SidePanel--empty">
        <div className="SidePanel__empty">Select a group to view details</div>
      </div>
    );
  }

  return (
    <div className="SidePanel">
      <header className="SidePanel__header">
        <div className="flex items-center gap-2 min-w-0 flex-1 SidePanel__header-left">
          <div className="SidePanel__header-avatar" aria-hidden>
            {(group.groupName ?? "?")[0]}
          </div>
          <h2 className="SidePanel__title">{group.groupName}</h2>
        </div>
        <button
          type="button"
          className="SidePanel__refresh"
          onClick={() => onRefresh?.(group)}
          aria-label="Refresh group details"
        >
          <svg className="SidePanel__refresh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M23 4v6h-6" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Refresh
        </button>
      </header>

      <nav className="SidePanel__tabs" role="tablist" aria-label="Group details">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            className={`SidePanel__tab ${activeTab === tab ? "SidePanel__tab--active" : ""}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="SidePanel__body">
        {activeTab === "Overview" && (
          <>
            <section className="SidePanel__section">
              <h3 className="SidePanel__section-title">Overview</h3>
              <dl className="SidePanel__dl">
                <div className="SidePanel__row">
                  <dt className="SidePanel__dt">Last Active</dt>
                  <dd className="SidePanel__dd">{formatLastActive(group.lastActive)}</dd>
                </div>
                <div className="SidePanel__row">
                  <dt className="SidePanel__dt">Disappearing Messages</dt>
                  <dd className="SidePanel__dd">
                    <div ref={disappearingRef} className={`SidePanel__dropdown-wrap ${disappearingDropdownOpen ? "SidePanel__dropdown-wrap--open" : ""}`}>
                      <button type="button" className="SidePanel__dropdown-btn" onClick={onDisappearingDropdownToggle} aria-expanded={disappearingDropdownOpen}>
                        OFF
                        <svg className="SidePanel__dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {disappearingDropdownOpen && (
                        <ul className="SidePanel__dropdown-menu" role="menu">
                          <li><button type="button" onClick={onDisappearingClose}>OFF</button></li>
                          <li><button type="button" onClick={onDisappearingClose}>ON</button></li>
                        </ul>
                      )}
                    </div>
                  </dd>
                </div>
                <div className="SidePanel__row">
                  <dt className="SidePanel__dt">Send Message Permission</dt>
                  <dd className="SidePanel__dd">
                    <div ref={permissionRef} className={`SidePanel__dropdown-wrap ${permissionDropdownOpen ? "SidePanel__dropdown-wrap--open" : ""}`}>
                      <button type="button" className="SidePanel__dropdown-btn" onClick={onPermissionDropdownToggle} aria-expanded={permissionDropdownOpen}>
                        All
                        <svg className="SidePanel__dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {permissionDropdownOpen && (
                        <ul className="SidePanel__dropdown-menu" role="menu">
                          <li><button type="button" onClick={onPermissionClose}>All</button></li>
                          <li><button type="button" onClick={onPermissionClose}>Admins only</button></li>
                        </ul>
                      )}
                    </div>
                  </dd>
                </div>
                <div className="SidePanel__row">
                  <dt className="SidePanel__dt">Project</dt>
                  <dd className="SidePanel__dd">
                    {group.project ? <Chip label={group.project} /> : <span className="SidePanel__muted">—</span>}
                  </dd>
                </div>
                <div className="SidePanel__row">
                  <dt className="SidePanel__dt">Labels</dt>
                  <dd className="SidePanel__dd">
                    <div className="SidePanel__labels">
                      {labelItems.map((label, i) => (
                        <Pill key={i} label={label} color={LABEL_COLORS[i % LABEL_COLORS.length]} />
                      ))}
                      <button type="button" className="SidePanel__add-label">
                        <svg className="SidePanel__add-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Label
                      </button>
                    </div>
                  </dd>
                </div>
              </dl>
            </section>

            <hr className="SidePanel__divider" />

            <div className="SidePanel__actions">
              <button type="button" className="SidePanel__btn">
                <svg className="SidePanel__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Export Chat
              </button>
              <button type="button" className="SidePanel__btn SidePanel__btn--danger">
                <svg className="SidePanel__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Exit Group
              </button>
            </div>

            <hr className="SidePanel__divider" />

            <section className="SidePanel__card-section">
              <article className="SidePanel__card">
                <div className="SidePanel__card-header">
                  <span className="SidePanel__card-title">PER-011 | {group.groupName}</span>
                  <span className="SidePanel__card-meta">3 days</span>
                  <div className="SidePanel__card-avatar" aria-hidden>H</div>
                </div>
                <p className="SidePanel__card-desc SidePanel__card-desc--warning">
                  <span className="SidePanel__card-dot" aria-hidden />
                  Issues with mentions on groups
                </p>
                <div className="SidePanel__card-footer">
                  <svg className="SidePanel__card-chart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  <span className="SidePanel__card-meta">Dec 22</span>
                  <span className="SidePanel__card-tag">
                    <span className="SidePanel__card-tag-dot" aria-hidden />
                    client
                  </span>
                </div>
              </article>
            </section>
          </>
        )}

        {activeTab === "Members" && (
          <section className="SidePanel__section">
            <h3 className="SidePanel__section-title">Members</h3>
            <p className="SidePanel__muted">Member list will appear here.</p>
          </section>
        )}

        {activeTab === "Logs" && (
          <section className="SidePanel__section">
            <h3 className="SidePanel__section-title">Logs</h3>
            <p className="SidePanel__muted">Activity logs will appear here.</p>
          </section>
        )}
      </div>
    </div>
  );
}
