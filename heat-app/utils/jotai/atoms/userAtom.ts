import { atomWithStorage } from 'jotai/utils';
import { User } from 'types/schema/User';

export const defaultUser: User = {
  userId: 'defaultId',
  userName: 'defaultUserName',
  userRole: 'admin',
  imageUrl: '',
  languageName: 'defaultLanguageNo',
  signupDate: new Date(),
  lastAccessDate: new Date(),
};

export const userAtom = atomWithStorage<User>('user', defaultUser);
