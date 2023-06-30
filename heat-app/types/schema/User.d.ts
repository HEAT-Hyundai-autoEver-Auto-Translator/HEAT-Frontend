type UserRoleType = 'normal' | 'admin';

export type User = {
  userId: string;
  userName: string;
  userRole: UserRoleType;
  imageUrl: string;
  languageNo: string;
  signupDate: Date;
  lastAccessDate: Date;
};
