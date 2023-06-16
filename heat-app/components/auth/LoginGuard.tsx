import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isAuthenticatedAtom } from "utils/atoms/isAuthenticatedAtom";

type GuardProps = {
  children: JSX.Element;
};

export const LoginGuard = ({ children }: GuardProps) => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const router = useRouter();

  console.log(isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated && !router.pathname.startsWith("/login")) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
};
