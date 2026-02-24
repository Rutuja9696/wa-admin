"use client";

import { useState, useRef, useCallback } from "react";
import { useTab } from "@/context/TabContext";
import { useClickOutside } from "@/hooks";
import { HeaderView } from "./HeaderView";
import type { User } from "@/types/users";

interface HeaderContainerProps {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

const GROUPS_ICON_PATH =
  "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z";

export default function Header({ users, selectedUser, onSelectUser }: HeaderContainerProps) {
  const { selectedTab } = useTab();
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, phoneDropdownOpen, useCallback(() => setPhoneDropdownOpen(false), []));

  const displayPhone = selectedUser?.phoneNumber ?? users[0]?.phoneNumber ?? "Select number";

  const handleSelectUser = useCallback(
    (user: User) => {
      onSelectUser(user);
      setPhoneDropdownOpen(false);
    },
    [onSelectUser]
  );

  return (
    <HeaderView
      title={selectedTab}
      groupsIconPath={GROUPS_ICON_PATH}
      displayPhone={displayPhone}
      isPhoneDropdownOpen={phoneDropdownOpen}
      onPhoneDropdownToggle={() => setPhoneDropdownOpen((p) => !p)}
      dropdownRef={dropdownRef}
      users={users}
      selectedUser={selectedUser}
      onSelectUser={handleSelectUser}
    />
  );
}
