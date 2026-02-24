"use client";

import "./Header.css";
import type { RefObject } from "react";
import type { User } from "@/types/users";

interface HeaderViewProps {
  title: string;
  groupsIconPath: string;
  displayPhone: string;
  isPhoneDropdownOpen: boolean;
  onPhoneDropdownToggle: () => void;
  dropdownRef: RefObject<HTMLDivElement | null>;
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export function HeaderView({
  title,
  groupsIconPath,
  displayPhone,
  isPhoneDropdownOpen,
  onPhoneDropdownToggle,
  dropdownRef,
  users,
  selectedUser,
  onSelectUser,
}: HeaderViewProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 Header">
      <div className="flex items-center gap-2">
        <svg className="Header__groups-icon" viewBox="0 0 24 24" fill="var(--color-icon)" aria-hidden>
          <path fillRule="evenodd" clipRule="evenodd" d={groupsIconPath} />
        </svg>
        <h1 className="Header__title">{title.toLowerCase()}</h1>
      </div>

      <div className="flex items-center gap-4 Header__actions">
        <a
          href="https://github.com/Rutuja9696/wa-admin"
          target="_blank"
          rel="noopener noreferrer"
          className="Header__docs-link"
        >
          <svg
            className="Header__docs-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="12" cy="12" r="10" />
            <text x="12" y="16" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="100" fontFamily="system-ui, sans-serif">
              ?
            </text>
          </svg>
          <span>Docs</span>
        </a>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={onPhoneDropdownToggle}
            className="Header__phone-btn"
            aria-expanded={isPhoneDropdownOpen}
            aria-haspopup="listbox"
            aria-label="Select phone number"
          >
            <span className="Header__phone-status-dot" aria-hidden />
            <span className="Header__phone-number">{displayPhone}</span>
            <svg className="w-4 h-4" fill="none" stroke="var(--color-icon)" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isPhoneDropdownOpen && (
            <ul
              role="listbox"
              className="absolute right-0 mt-1 w-56 py-1 Header__dropdown max-h-60 overflow-auto"
              aria-label="Phone numbers"
            >
              {users.length === 0 ? (
                <li className="px-4 py-2 Header__dropdown-empty">No numbers</li>
              ) : (
                users.map((user) => (
                  <li key={user.userId} role="option" aria-selected={selectedUser?.userId === user.userId}>
                    <button
                      type="button"
                      onClick={() => onSelectUser(user)}
                      className={`w-full text-left px-4 py-2 Header__option ${selectedUser?.userId === user.userId ? "Header__option--selected" : ""}`}
                    >
                      {user.phoneNumber}
                      {user.userName ? <span className="block Header__option-sub">{user.userName}</span> : null}
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        <button type="button" className="Header__notification-btn" aria-label="Notifications">
          <svg
            className="Header__notification-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-icon)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </button>
      </div>
    </div>
  );
}
