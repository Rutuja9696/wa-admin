"use client";

import { useState, useMemo, useCallback } from "react";
import { useDebounce } from "@/hooks";
import { normalizeLabels } from "@/lib/labels";
import type { UserGroup } from "@/types/users";
import { GROUPS_TABLE_COLUMNS, type GroupsTableColumnId } from "@/types/users";
import { TableView } from "./TableView";

const SEARCH_DEBOUNCE_MS = 500;

const COLUMN_LABELS: Record<GroupsTableColumnId, string> = {
  groupName: "Group Name",
  project: "Project",
  labels: "Labels",
  members: "Members",
  lastActive: "Last Active",
};

interface TableContainerProps {
  groups: UserGroup[];
  selectedGroup: UserGroup | null;
  onSelectGroup: (group: UserGroup) => void;
}

export default function Table({ groups, selectedGroup, onSelectGroup }: TableContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS);
  const [columnDropdownOpen, setColumnDropdownOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Set<GroupsTableColumnId>>(
    () => new Set(GROUPS_TABLE_COLUMNS)
  );

  const filteredGroups = useMemo(() => {
    if (!debouncedSearch.trim()) return groups;
    const q = debouncedSearch.toLowerCase().trim();
    return groups.filter((g) => {
      const labelsStr = normalizeLabels(g.labels).join(" ").toLowerCase();
      return (
        g.groupName?.toLowerCase().includes(q) ||
        g.project?.toLowerCase().includes(q) ||
        labelsStr.includes(q) ||
        g.members?.toLowerCase().includes(q) ||
        g.lastActive?.toLowerCase().includes(q)
      );
    });
  }, [groups, debouncedSearch]);

  const toggleColumn = useCallback((id: GroupsTableColumnId) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size <= 1) return prev;
        next.delete(id);
      } else next.add(id);
      return next;
    });
  }, []);

  return (
    <TableView
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      filteredGroups={filteredGroups}
      groups={groups}
      visibleColumns={visibleColumns}
      columnDropdownOpen={columnDropdownOpen}
      onColumnDropdownToggle={() => setColumnDropdownOpen((p) => !p)}
      onCloseColumnDropdown={() => setColumnDropdownOpen(false)}
      toggleColumn={toggleColumn}
      selectedGroup={selectedGroup}
      onSelectGroup={onSelectGroup}
      columnLabels={COLUMN_LABELS}
      columns={GROUPS_TABLE_COLUMNS}
    />
  );
}
