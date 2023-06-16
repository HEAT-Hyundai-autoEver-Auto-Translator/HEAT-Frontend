import { useRouter } from "next/router";
import { AdminGuard } from "./AdminGuard";
import { LoginGuard } from "./LoginGuard";

type GuardProps = {
  children: JSX.Element;
};

export const AuthGuard = ({ children }: GuardProps) => {
  const router = useRouter();

  console.log(router.pathname);

  return (
    <LoginGuard>
      {router.pathname.startsWith("/admin") ? (
        <AdminGuard>{children}</AdminGuard>
      ) : (
        children
      )}
    </LoginGuard>
  );
};
