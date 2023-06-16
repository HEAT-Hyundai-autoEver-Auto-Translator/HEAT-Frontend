import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isAuthenticatedAtom } from "utils/atoms/isAuthenticatedAtom";
import { userAtom } from "utils/atoms/userAtom";

type GuardProps = {
  children: JSX.Element;
  adminOnly?: boolean;
};

export const AuthGuard = ({ children, adminOnly }: GuardProps) => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const user = useAtomValue(userAtom);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (adminOnly && user.role !== "Admin") {
      window.alert("관리자만 접근할 수 있는 페이지입니다.");
    }
    router.push("/");
  }, [isAuthenticated, user]);

  return <>{children}</>;
};
