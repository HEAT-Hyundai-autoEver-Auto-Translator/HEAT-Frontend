import { atomWithStorage } from 'jotai/utils'

type Authenticated = boolean

export const isAuthenticatedAtom = atomWithStorage<Authenticated>(
  'isAuthenticated',
  false,
)
