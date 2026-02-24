"use client";

import "./Row.css";
import Chip from "@/components/Chip/Chip";
import Pill from "@/components/Pill/Pill";
import { formatLastActive } from "@/lib/formatDate";
import { LABEL_COLORS, normalizeLabels } from "@/lib/labels";
import type { UserGroup } from "@/types/users";
import type { GroupsTableColumnId } from "@/types/users";

const MAX_PILLS_IN_ROW = 2;

interface RowProps {
  group: UserGroup;
  selected: boolean;
  visibleColumns: Set<GroupsTableColumnId>;
  onClick: () => void;
}

export default function GroupRow({ group, selected, visibleColumns, onClick }: RowProps) {
  const labelItems = normalizeLabels(group.labels);

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
      <td>
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
        <td>
          <div className="Row__group-name">
            <div className="Row__avatar">
              {(group.groupName ?? "?")[0]}
            </div>
            <span className="Row__name">{group.groupName}</span>
            {group.unreadMsg != null && group.unreadMsg !== "0" && (
              <span className={`Row__badge ${Number(group.unreadMsg) > 0 ? "Row__badge--green" : "Row__badge--grey"}`}>
                {group.unreadMsg}
              </span>
            )}
          </div>
        </td>
      )}
      {visibleColumns.has("project") && (
        <td>
          {group.project ? (
            <Chip label={group.project} />
          ) : (
            <span className="Row__muted">—</span>
          )}
        </td>
      )}
      {visibleColumns.has("labels") && (
        <td className="Row__cell--labels">
          {labelItems.length > 0 ? (
            <div className="Row__labels-wrap">
              {labelItems.slice(0, MAX_PILLS_IN_ROW).map((label, i) => (
                <Pill
                  key={i}
                  label={label}
                  color={LABEL_COLORS[i % LABEL_COLORS.length]}
                />
              ))}
              {labelItems.length > MAX_PILLS_IN_ROW && (
                <Pill label={`+${labelItems.length - MAX_PILLS_IN_ROW}`} overflow />
              )}
            </div>
          ) : (
            <span className="Row__muted">—</span>
          )}
        </td>
      )}
      {visibleColumns.has("members") && (
        <td className="Row__cell-text">{group.members ?? "—"}</td>
      )}
      {visibleColumns.has("lastActive") && (
        <td className="Row__cell-text--light">{formatLastActive(group.lastActive)}</td>
      )}
    </tr>
  );
}
