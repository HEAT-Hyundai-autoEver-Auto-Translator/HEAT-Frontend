export type Translation = {
  translationNo: number;
  userId: string;
  requestLanguageName: string;
  resultLanguageName: string;
  createdDateTime: Date;
  requestText: string;
  resultText: string;
};

export type RequestTranslation = {
  userAccountNo: number;
  requestText: string;
  resultLanguageNo: number;
};
