import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { userAtom } from "utils/atoms/userAtom";

type GuardProps = {
  children: JSX.Element;
};

export const AdminGuard = ({ children }: GuardProps) => {
  const user = useAtomValue(userAtom);
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "Admin") {
      window.alert("관리자만 접근할 수 있는 페이지입니다.");
      router.push("/login");
    }
  }, [user, router]);

  return <>{children}</>;
};
