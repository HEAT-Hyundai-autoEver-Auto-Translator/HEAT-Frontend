type UserRoleType = 'normal' | 'admin';

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
  profileImageUrl: string;
  languageNo: number;
};

export type UpdateUser = {
  userAccountNo: number;
  password?: string;
  userName?: string;
  userRole?: string;
  languageNo?: number;
};
