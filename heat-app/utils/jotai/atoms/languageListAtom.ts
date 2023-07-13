import { atom } from 'jotai';

type LanguageDto = {
  languageName: string;
};
const defaultLanguageList: LanguageDto[] = [
  {
    languageName: 'Korean',
  },
  {
    languageName: 'English',
  },
  {
    languageName: 'Chinese',
  },
  {
    languageName: 'Spanish',
  },
  {
    languageName: 'Portuguese',
  },
  {
    languageName: 'German',
  },
  {
    languageName: 'Czech',
  },
  {
    languageName: 'Slovak',
  },
  {
    languageName: 'Russian',
  },
  {
    languageName: 'Hindi',
  },
  {
    languageName: 'Indonesian',
  },
  {
    languageName: 'Arabic',
  },
  {
    languageName: 'Vietnamese',
  },
];
export const languageListAtom = atom<LanguageDto[]>(defaultLanguageList);
