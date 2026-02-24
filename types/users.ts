/** Label item as stored in DB (object with display field) or plain string */
export type LabelItem = string | { label?: string; name?: string; value?: string; title?: string };

export interface UserGroup {
  groupId: string;
  groupName: string;
  groupImage?: string;
  unreadMsg?: string;
  hasWarning?: boolean;
  project?: string;
  labels?: string | string[] | LabelItem[];
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
