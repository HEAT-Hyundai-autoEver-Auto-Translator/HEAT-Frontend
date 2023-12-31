import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ROUTES } from 'utils/ROUTES';
import { isAuthenticatedAtom } from 'utils/jotai/atoms/isAuthenticatedAtom';
import { userAtom } from 'utils/jotai/atoms/userAtom';

type AuthGuardProps = {
  children: React.ReactNode;
  adminOnly?: boolean;
};

const AuthGuard = ({ children, adminOnly }: AuthGuardProps) => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || (adminOnly && user.userRole !== 'admin')) {
      router.push(ROUTES.LOGIN);
    }
  }, [isAuthenticated, user, router, adminOnly]);

  if (!isAuthenticated || (adminOnly && user.userRole !== 'admin')) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
