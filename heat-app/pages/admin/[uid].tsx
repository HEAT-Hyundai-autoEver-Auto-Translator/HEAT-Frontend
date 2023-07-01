import AuthGuard from 'components/auth/AuthGuard';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/ROUTES';
import { isAuthenticatedAtom } from 'utils/jotai/atoms/isAuthenticatedAtom';
import { userAtom } from 'utils/jotai/atoms/userAtom';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const { uid } = router.query;

  return (
    <AuthGuard adminOnly>
      관리 페이지 입니다. 관리기능이 제공됩니다
      <div>{uid}</div>
      <button onClick={() => router.push(ROUTES.MAIN(user.userId))}>
        메인 페이지로
      </button>
    </AuthGuard>
  );
};

export default Admin;
