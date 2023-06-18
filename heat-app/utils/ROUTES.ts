export const ROUTES = {
  LOGIN: "/login",
  MAIN: (uid: string | number) => `/main/${uid}`,
  ADMIN: (uid: string | number) => `/admin/${uid}`,
};
