"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Table from "@/components/Table/Table";
import SidePanel from "@/components/SidePanel/SidePanel";
import Header from "@/components/Header/Header";
import type { User, UserGroup, SuperUser } from "@/types/users";

interface Props {
  groups: UserGroup[];
  users?: User[];
  superUser?: SuperUser | null;
}

export default function Dashboard({ groups, users = [], superUser = null }: Props) {
  const [selectedGroup, setSelectedGroup] = useState<UserGroup | null>(null);
  const [selectedUser, setSelectedUser] = useState(users[0] ?? null);

  return (
    <div className="flex h-full">
      <Sidebar superUserDetails={superUser ?? null} />
      <div className="flex flex-1 flex-col min-w-0">
        <Header
          users={users}
          selectedUser={selectedUser}
          onSelectUser={(u) => setSelectedUser(u)}
        />
        <div className="flex flex-1 min-h-0">
          <Table
            groups={selectedUser?.groups ?? groups}
            selectedGroup={selectedGroup}
            onSelectGroup={setSelectedGroup}
          />
          <SidePanel group={selectedGroup} />
        </div>
      </div>
    </div>
  );
}
