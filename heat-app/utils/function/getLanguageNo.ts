type LanguageName =
  | 'Korean'
  | 'English'
  | 'Chinese'
  | 'Spanish'
  | 'Portuguese'
  | 'German'
  | 'Czech'
  | 'Slovak'
  | 'Russian'
  | 'Hindi'
  | 'Indonesian'
  | 'Arabic'
  | 'Vietnamese';

export const getLanguageNo = (languageName: LanguageName): number => {
  switch (languageName) {
    case 'Korean':
      return 1;
    case 'English':
      return 2;
    case 'Chinese':
      return 3;
    case 'Spanish':
      return 4;
    case 'Portuguese':
      return 5;
    case 'German':
      return 6;
    case 'Czech':
      return 7;
    case 'Slovak':
      return 8;
    case 'Russian':
      return 9;
    case 'Hindi':
      return 10;
    case 'Indonesian':
      return 11;
    case 'Arabic':
      return 12;
    case 'Vietnamese':
      return 13;
    default:
      return 0;
  }
};
