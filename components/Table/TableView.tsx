"use client";

import "./Table.css";
import Row from "@/components/Row/Row";
import type { UserGroup } from "@/types/users";
import type { GroupsTableColumnId } from "@/types/users";

interface TableViewProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filteredGroups: UserGroup[];
  groups: UserGroup[];
  visibleColumns: Set<GroupsTableColumnId>;
  columnDropdownOpen: boolean;
  onColumnDropdownToggle: () => void;
  onCloseColumnDropdown: () => void;
  toggleColumn: (id: GroupsTableColumnId) => void;
  selectedGroup: UserGroup | null;
  onSelectGroup: (group: UserGroup) => void;
  columnLabels: Record<GroupsTableColumnId, string>;
  columns: readonly GroupsTableColumnId[];
}

export function TableView({
  searchQuery,
  onSearchChange,
  filteredGroups,
  groups,
  visibleColumns,
  columnDropdownOpen,
  onColumnDropdownToggle,
  onCloseColumnDropdown,
  toggleColumn,
  selectedGroup,
  onSelectGroup,
  columnLabels,
  columns,
}: TableViewProps) {
  const emptyMessage = groups.length === 0 ? "No groups for this number." : "No groups match your search.";
  const pageCount = Math.max(1, Math.ceil(filteredGroups.length / 50));

  return (
    <div className="flex flex-1 flex-col min-w-0 Table">
      <div className="p-4 Table__toolbar space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-80 pl-4 pr-4 py-2 Table__search-input"
              aria-label="Search groups"
            />
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 Table__secondary-btn"
              onClick={() => alert("Bulk message clicked!")}
            >
              <svg className="w-4 h-4" fill="none" stroke="var(--color-icon)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
                <path d="M7 6h10" />
                <path d="M5 12h14" />
                <path d="M9 18h6" />
              </svg>
              <span>Filter</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" className="px-4 py-2 Table__bulk-btn" onClick={() => alert("Bulk message clicked!")}>
              Bulk message
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={onColumnDropdownToggle}
                className="flex items-center gap-1 px-3 py-2 Table__secondary-btn"
                aria-expanded={columnDropdownOpen}
                aria-haspopup="true"
                aria-label="Column selector"
              >
                Group Actions
                <svg className="w-4 h-4" fill="none" stroke="var(--color-icon)" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              {columnDropdownOpen && (
                <>
                  <div className="fixed inset-0 Table__dropdown-backdrop" aria-hidden onClick={onCloseColumnDropdown} />
                  <div className="absolute mt-1 w-48 py-2 Table__dropdown right-0">
                    <div className="px-3 py-1 Table__dropdown-title">Columns</div>
                    {columns.map((id) => (
                      <label key={id} className="flex items-center gap-2 px-3 py-2 Table__dropdown-option">
                        <input
                          type="checkbox"
                          checked={visibleColumns.has(id)}
                          onChange={() => toggleColumn(id)}
                          className="Table__checkbox"
                        />
                        <span>{columnLabels[id]}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse Table__table" role="table" aria-label="Groups">
          <thead className="Table__thead">
            <tr>
              <th className="Table__th Table__th--checkbox">
                <input type="checkbox" className="Table__checkbox" aria-label="Select all" />
              </th>
              {columns.filter((id) => visibleColumns.has(id)).map((id) => (
                <th key={id} className="Table__th">
                  {columnLabels[id]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredGroups.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.size + 1} className="px-4 py-8 Table__empty-cell">
                  {emptyMessage}
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

      <div className="Table__footer">
        <div className="Table__pagination-nav">
          <button type="button" className="Table__pagination-btn" aria-label="Previous page" disabled={filteredGroups.length === 0}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="Table__pagination-text">1 of {pageCount}</span>
          <button type="button" className="Table__pagination-btn" aria-label="Next page" disabled={filteredGroups.length === 0}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <span>{filteredGroups.length} rows</span>
      </div>
    </div>
  );
}
