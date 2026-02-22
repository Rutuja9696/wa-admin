"use client";

import "./Header.css";
import { useState, useRef, useEffect } from "react";
import { useTab } from "@/context/TabContext";
import type { User } from "@/types/users";

interface HeaderProps {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export default function Header({ users, selectedUser, onSelectUser }: HeaderProps) {
  const { selectedTab } = useTab();
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPhoneDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayPhone = selectedUser?.phoneNumber ?? (users[0]?.phoneNumber ?? "Select number");

  return (
    <div className="flex items-center justify-between px-6 py-4 Header">
      <div className="flex flex-col">
        <h1 className="Header__title">{selectedTab}</h1>
      </div>

      <div className="flex items-center gap-3">
        <a href={"https://github.com/Rutuja9696/wa-admin"} target="_blank" className="px-4 py-2 Header__docs-link">
          Docs
        </a>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setPhoneDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 Header__phone-btn"
            aria-expanded={phoneDropdownOpen}
            aria-haspopup="listbox"
            aria-label="Select phone number"
          >
            <span>{displayPhone}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {phoneDropdownOpen && (
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
                      onClick={() => {
                        onSelectUser(user);
                        setPhoneDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 Header__option ${
                        selectedUser?.userId === user.userId ? "Header__option--selected" : ""
                      }`}
                    >
                      {user.phoneNumber}
                      {user.userName ? (
                        <span className="block Header__option-sub">{user.userName}</span>
                      ) : null}
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
