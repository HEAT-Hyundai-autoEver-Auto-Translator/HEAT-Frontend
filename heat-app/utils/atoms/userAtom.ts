import { atomWithStorage } from 'jotai/utils'
import { User } from 'types/schema/User'

const defaultUser: User = {
  id: 0,
  login: 'defaultLogin',
  password: null,
  salt: null,
  nickname: 'defaultNickname',
  role: 'User',
  image: null,
  refresh_token: null,
  lang_id: null,
  created_at: new Date(),
  last_access: new Date(),
}

export const userAtom = atomWithStorage<User>('user', defaultUser)
