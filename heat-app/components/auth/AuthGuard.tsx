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

  console.log('guard isAuthenticated', isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated || (adminOnly && user.userRole !== 'admin')) {
      console.log('!@#@here');
      console.log('isAuthenticated', isAuthenticated);
      console.log('adminOnly', adminOnly);
      console.log('user.userRole', user.userRole);
      router.push(ROUTES.LOGIN);
    }
  }, [isAuthenticated, user, router, adminOnly]);

  if (!isAuthenticated || (adminOnly && user.userRole !== 'admin')) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
