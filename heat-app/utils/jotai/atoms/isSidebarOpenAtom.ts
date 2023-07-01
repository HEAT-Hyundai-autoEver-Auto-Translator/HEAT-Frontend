import { atom } from 'jotai';

type IsOpen = boolean;

export const isSidebarOpenAtom = atom<IsOpen>(false);
