export interface UserGroup {
  groupId: string;
  groupName: string;
  groupImage?: string;
  unreadMsg?: string;
  project?: string;
  labels?: string;
  members?: string;
  lastActive?: string;
}

export const GROUPS_TABLE_COLUMNS = [
  "groupName",
  "project",
  "labels",
  "members",
  "lastActive",
] as const;
export type GroupsTableColumnId = (typeof GROUPS_TABLE_COLUMNS)[number];

export interface User {
  userId: string;
  userName: string;
  userEmail: string;
  phoneNumber: string;
  profilePicture?: string;
  groups: UserGroup[];
  createdAt: string;
  lastActive: string;
}

export interface SuperUser {
  userId: string;
  projectName: string;
  email: string;
  roles: string[];
  groups: { groupId: string; groupName: string }[];
  docs_url: string;
}

export interface UsersData {
  superUser: SuperUser;
  users: User[];
}
