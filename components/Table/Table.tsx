"use client";

import "./Table.css";
import { useState, useMemo, useEffect } from "react";
import Row from "@/components/Row/Row";
import type { UserGroup } from "@/types/users";
import {
  GROUPS_TABLE_COLUMNS,
  type GroupsTableColumnId,
} from "@/types/users";

const SEARCH_DEBOUNCE_MS = 500;

interface TableProps {
  groups: UserGroup[];
  selectedGroup: UserGroup | null;
  onSelectGroup: (group: UserGroup) => void;
}

const COLUMN_LABELS: Record<GroupsTableColumnId, string> = {
  groupName: "Group Name",
  project: "Project",
  labels: "Labels",
  members: "Members",
  lastActive: "Last Active",
};

export default function GroupsTable({ groups, selectedGroup, onSelectGroup }: TableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [columnDropdownOpen, setColumnDropdownOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Set<GroupsTableColumnId>>(
    () => new Set(GROUPS_TABLE_COLUMNS)
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  const filteredGroups = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return groups;
    const q = debouncedSearchQuery.toLowerCase().trim();
    return groups.filter(
      (g) =>
        g.groupName?.toLowerCase().includes(q) ||
        g.project?.toLowerCase().includes(q) ||
        g.labels?.toLowerCase().includes(q) ||
        g.members?.toLowerCase().includes(q) ||
        g.lastActive?.toLowerCase().includes(q)
    );
  }, [groups, debouncedSearchQuery]);

  const toggleColumn = (id: GroupsTableColumnId) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size <= 1) return prev;
        next.delete(id);
      } else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex-1 Table flex flex-col min-w-0">
      <div className="p-4 Table__toolbar space-y-3">
        <div className="flex items-center gap-2 justify-between">
            <input
              type="search"
              placeholder="Search groups here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 pl-4 pr-4 py-2 Table__search-input"
              aria-label="Search groups"
            />
          <div className="flex">
            <button type="button" className="px-4 py-2 Table__bulk-btn mr-4" onClick={ () => { alert( "Bulk message clicked!" ) } }>
              Bulk message
            </button>
            <button
              type="button"
              onClick={() => setColumnDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 px-3 py-2 Table__filter-btn"
              aria-expanded={columnDropdownOpen}
              aria-haspopup="true"
              aria-label="Column selector"
            >
              Column
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            {columnDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 Table__dropdown-backdrop"
                  aria-hidden
                  onClick={() => setColumnDropdownOpen(false)}
                />
                <div className="mt-1 w-48 py-2 Table__dropdown">
                  <div className="px-3 py-1 Table__dropdown-title">Columns</div>
                  {GROUPS_TABLE_COLUMNS.map((id) => (
                    <label
                      key={id}
                      className="flex items-center gap-2 px-3 py-2 Table__dropdown-option"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns.has(id)}
                        onChange={() => toggleColumn(id)}
                        className="Table__checkbox"
                      />
                      <span>{COLUMN_LABELS[id]}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>
          
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse" role="table" aria-label="Groups">
          <thead className="Table__thead">
            <tr>
              <th className="px-4 py-3 w-10 text-left">
                <input
                  type="checkbox"
                  className="Table__checkbox"
                  aria-label="Select all"
                />
              </th>
              {visibleColumns.has("groupName") && (
                <th className="px-4 py-3 Table__th text-left">Group Name</th>
              )}
              {visibleColumns.has("project") && (
                <th className="px-4 py-3 Table__th text-left">Project</th>
              )}
              {visibleColumns.has("labels") && (
                <th className="px-4 py-3 Table__th text-left">Labels</th>
              )}
              {visibleColumns.has("members") && (
                <th className="px-4 py-3 Table__th text-left">Members</th>
              )}
              {visibleColumns.has("lastActive") && (
                <th className="px-4 py-3 Table__th text-left">Last Active</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredGroups.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.size + 1} className="px-4 py-8 Table__empty-cell">
                  {groups.length === 0 ? "No groups for this number." : "No groups match your search."}
                </td>
              </tr>
            ) : (
              filteredGroups.map((group) => (
                <Row
                  key={group.groupId}
                  group={group}
                  selected={selectedGroup?.groupId === group.groupId}
                  visibleColumns={visibleColumns}
                  onClick={() => onSelectGroup(group)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2 Table__footer flex items-center justify-between">
        <span>1 of {Math.max(1, Math.ceil(filteredGroups.length / 50))}</span>
        <span>{filteredGroups.length} rows</span>
      </div>
    </div>
  );
}
