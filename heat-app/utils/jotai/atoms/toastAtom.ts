// toastAtom.ts
import { atom } from 'jotai';

export interface Toast {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error';
}

export const toastAtom = atom<Toast>({
  isOpen: false,
  title: '',
  message: '',
  type: 'success',
});
