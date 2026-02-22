"use client";

import "./Row.css";
import type { UserGroup } from "@/types/users";
import type { GroupsTableColumnId } from "@/types/users";

interface RowProps {
  group: UserGroup;
  selected: boolean;
  visibleColumns: Set<GroupsTableColumnId>;
  onClick: () => void;
}

export default function GroupRow({ group, selected, visibleColumns, onClick }: RowProps) {
  return (
    <tr
      onClick={onClick}
      className={`Row ${selected ? "Row--selected" : ""}`}
      role="row"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-selected={selected}
    >
      <td className="px-4 py-3 w-10 align-middle">
        <input
          type="checkbox"
          checked={selected}
          readOnly
          tabIndex={-1}
          className="Row__checkbox"
          aria-label={`Select ${group.groupName}`}
        />
      </td>
      {visibleColumns.has("groupName") && (
        <td className="px-4 py-3 align-middle">
          <div className="flex items-center gap-2">
            <div className="Row__avatar flex items-center justify-center shrink-0">
              {(group.groupName ?? "?")[0]}
            </div>
            <span className="Row__name">{group.groupName}</span>
            {group.unreadMsg != null && group.unreadMsg !== "0" && (
              <span className="Row__badge shrink-0 inline-flex items-center justify-center px-1.5">
                {group.unreadMsg}
              </span>
            )}
          </div>
        </td>
      )}
      {visibleColumns.has("project") && (
        <td className="px-4 py-3 align-middle">
          {group.project ? (
            <span className="Row__tag inline-block px-2 py-0.5">#{group.project}</span>
          ) : (
            <span className="Row__muted">—</span>
          )}
        </td>
      )}
      {visibleColumns.has("labels") && (
        <td className="px-4 py-3 align-middle">
          {group.labels ? (
            <span className="Row__labels inline-block" title={group.labels}>
              {group.labels}
            </span>
          ) : (
            <span className="Row__muted">—</span>
          )}
        </td>
      )}
      {visibleColumns.has("members") && (
        <td className="px-4 py-3 align-middle Row__cell-text">{group.members ?? "—"}</td>
      )}
      {visibleColumns.has("lastActive") && (
        <td className="px-4 py-3 align-middle Row__cell-text--light">{group.lastActive ?? "—"}</td>
      )}
    </tr>
  );
}
