type UserRoleType = 'user' | 'admin';

export type UserLogin = {
  userEmail: string;
  userPassword: string;
};

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

export type CreateUser = {
  userEmail: string;
  password: string;
  userName: string;
  userProfileImage?: string;
  languageName: string;
};

export type UpdateUser = {
  userAccountNo: number;
  password?: string;
  userName?: string;
  userRole?: string;
  languageName?: string;
};
