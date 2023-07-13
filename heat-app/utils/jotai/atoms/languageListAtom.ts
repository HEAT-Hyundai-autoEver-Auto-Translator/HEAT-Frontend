import { atom } from 'jotai';

type LanguageDto = {
  languageName: string;
};
export const languageListAtom = atom<LanguageDto[]>([]);
