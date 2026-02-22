"use client";

import "./SidePanel.css";
import type { UserGroup } from "@/types/users";

interface SidePanelProps {
  group: UserGroup | null;
}

export default function SidePanel({ group }: SidePanelProps) {
  return (
    <div className="w-80 SidePanel flex flex-col overflow-hidden">
      {!group ? (
        <div className="p-6 SidePanel__empty">Select a group to view details</div>
      ) : (
        <>
          <div className="p-4 SidePanel__header flex items-center">
            <h2 className="SidePanel__title">{group.groupName}</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <section>
              <h3 className="SidePanel__section-title mb-2">Overview</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="SidePanel__dt">Last Active</div>
                  <div className="SidePanel__dd">{group.lastActive ?? "—"}</div>
                </div>
                <div>
                  <div className="SidePanel__dt">Disappearing Messages</div>
                  <div className="flex items-center gap-2">
                    <span className="SidePanel__dd">OFF</span>
                  </div>
                </div>
                <div>
                  <div className="SidePanel__dt">Send Message Permission</div>
                  <div className="flex items-center gap-1 SidePanel__dd">
                    All
                    <svg className="w-4 h-4 SidePanel__dd-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="SidePanel__dt">Project</div>
                  <div>
                    {group.project ? (
                      <span className="SidePanel__tag inline-block px-2 py-0.5">#{group.project}</span>
                    ) : (
                      <span className="SidePanel__dd-muted">—</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="SidePanel__dt">Labels</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="inline-flex items-center px-2 py-0.5 SidePanel__label-chip">
                      Tested
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-2 pt-2">
                <button type="button" className="flex justify-center items-center gap-2 w-full px-3 py-2 SidePanel__btn">
                <svg className="w-4 h-4 SidePanel__btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Chat
              </button>
                <button type="button" className="flex justify-center items-center gap-2 w-full px-3 py-2 SidePanel__btn SidePanel__btn--danger">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Exit Group
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
