"use client";

import { useState, useRef, useCallback } from "react";
import { useClickOutside } from "@/hooks";
import { normalizeLabels } from "@/lib/labels";
import type { UserGroup } from "@/types/users";
import { SidePanelView } from "./SidePanelView";

type SidePanelTab = "Overview" | "Members" | "Logs";

interface SidePanelProps {
  group: UserGroup | null;
  onRefresh?: (group: UserGroup) => void;
}

export default function SidePanel({ group, onRefresh }: SidePanelProps) {
  const [activeTab, setActiveTab] = useState<SidePanelTab>("Overview");
  const [permissionDropdownOpen, setPermissionDropdownOpen] = useState(false);
  const [disappearingDropdownOpen, setDisappearingDropdownOpen] = useState(false);
  const permissionRef = useRef<HTMLDivElement>(null);
  const disappearingRef = useRef<HTMLDivElement>(null);

  const closePermission = useCallback(() => setPermissionDropdownOpen(false), []);
  const closeDisappearing = useCallback(() => setDisappearingDropdownOpen(false), []);

  useClickOutside(permissionRef, permissionDropdownOpen, closePermission);
  useClickOutside(disappearingRef, disappearingDropdownOpen, closeDisappearing);

  const labelItems = group ? normalizeLabels(group.labels) : [];

  return (
    <SidePanelView
      group={group}
      labelItems={labelItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      permissionDropdownOpen={permissionDropdownOpen}
      onPermissionDropdownToggle={() => setPermissionDropdownOpen((p) => !p)}
      onPermissionClose={closePermission}
      permissionRef={permissionRef}
      disappearingDropdownOpen={disappearingDropdownOpen}
      onDisappearingDropdownToggle={() => setDisappearingDropdownOpen((p) => !p)}
      onDisappearingClose={closeDisappearing}
      disappearingRef={disappearingRef}
      onRefresh={onRefresh}
    />
  );
}
