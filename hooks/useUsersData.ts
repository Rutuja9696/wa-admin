import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { UsersData, User, UserGroup } from "@/types/users";

export function useUsersData() {
  const [usersData, setUsersData] = useState<UsersData | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<UserGroup | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("users_data")
        .select("data")
        .eq("projectname", "Periskope")
        .single();

      if (error) {
        console.error("Error fetching users_data:", error);
        return;
      }
      if (cancelled || !data?.data) return;
      const payload = data.data as UsersData;
      setUsersData(payload);
      setSelectedUser(payload.users?.[0] ?? null);
      setSelectedGroup(null);
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectUser = useCallback((user: User) => {
    setSelectedUser(user);
    setSelectedGroup(null);
  }, []);

  const selectGroup = useCallback((group: UserGroup | null) => {
    setSelectedGroup(group);
  }, []);

  const users = usersData?.users ?? [];
  const groups = selectedUser?.groups ?? [];

  return {
    usersData,
    users,
    groups,
    selectedUser,
    selectedGroup,
    selectUser,
    selectGroup,
  };
}
