import { atomWithStorage } from 'jotai/utils';
import { User } from 'types/schema/User';

export const defaultUser: User = {
  userAccountNo: 1,
  userEmail: 'defaultUserEmail',
  userName: 'defaultUserName',
  userRole: 'admin',
  profileImageUrl: '',
  languageName: 'defaultLanguageNo',
  signupDate: new Date(),
  lastAccessDate: new Date(),
};

export const userAtom = atomWithStorage<User>('user', defaultUser);
