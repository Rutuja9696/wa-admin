"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Table from "@/components/Table/Table";
import SidePanel from "@/components/SidePanel/SidePanel";
import Header from "@/components/Header/Header";
import { useTab } from "@/context/TabContext";
import { supabase } from "@/lib/supabase";
import type { UsersData, User, UserGroup } from "@/types/users";

export default function Home() {
  const { selectedTab } = useTab();
  const [usersData, setUsersData] = useState<UsersData | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<UserGroup | null>(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      const { data, error } = await supabase
        .from("users_data")
        .select("data")
        .eq("projectname", "Periskope")
        .single();

      if (error) {
        console.error("Error fetching users_data:", error);
        return;
      }

      if (data?.data) {
        const payload = data.data as UsersData;
        setUsersData(payload);
        const firstUser = payload.users?.[0] ?? null;
        setSelectedUser(firstUser);
        setSelectedGroup(null);
      }
    };

    fetchUsersData();
  }, []);

  const handleSelectUser = useCallback((user: User) => {
    setSelectedUser(user);
    setSelectedGroup(null);
  }, []);

  const users = usersData?.users ?? [];

  return (
    <div className="flex h-full">
      <Sidebar superUserDetails={usersData?.superUser ?? null} />
      <div className="flex flex-1 flex-col min-w-0">
        <Header
          users={users}
          selectedUser={selectedUser}
          onSelectUser={handleSelectUser}
        />
        <div className="flex flex-1 min-h-0">
          {selectedTab === "Groups" ? (
            <>
              <Table
                groups={selectedUser?.groups ?? []}
                selectedGroup={selectedGroup}
                onSelectGroup={setSelectedGroup}
              />
              <SidePanel group={selectedGroup} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <p className="text-gray-500 text-lg">This page is under construction.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}