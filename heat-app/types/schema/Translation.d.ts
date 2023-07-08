export type Translation = {
  translationNo: number;
  userId: string;
  requestLanguageName: string;
  resultLanguageName: string;
  createDateTime: Date;
  requestText: string;
  resultText: string;
};

export type RequestTranslation = {
  userAccountNo: number;
  requestText: string;
  resultLanguageNo: number;
};
