"use client";

import { useTab } from "@/context/TabContext";
import { useUsersData } from "@/hooks";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import Table from "@/components/Table/Table";
import SidePanel from "@/components/SidePanel/SidePanel";

export default function Home() {
  const { selectedTab } = useTab();
  const {
    usersData,
    users,
    groups,
    selectedUser,
    selectedGroup,
    selectUser,
    selectGroup,
  } = useUsersData();

  return (
    <div className="flex h-full">
      <Sidebar superUserDetails={usersData?.superUser ?? null} />
      <div className="flex flex-1 flex-col min-w-0">
        <Header
          users={users}
          selectedUser={selectedUser}
          onSelectUser={selectUser}
        />
        <div className="flex flex-1 min-h-0">
          {selectedTab === "Groups" ? (
            <>
              <Table
                groups={groups}
                selectedGroup={selectedGroup}
                onSelectGroup={selectGroup}
              />
              <SidePanel group={selectedGroup} />
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center bg-gray-100">
              <p className="text-gray-500 text-lg">This page is under construction.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
