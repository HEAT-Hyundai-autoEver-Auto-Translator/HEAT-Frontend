type UserRoleType = 'normal' | 'admin';

export type User = {
  userAccountNo: number;
  userEmail: string;
  userName: string;
  userRole: UserRoleType;
  profileImageUrl: string;
  languageName: string;
  signupDate: Date;
  lastAccessDate: Date;
};
