import { Theme, useTheme } from '@emotion/react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ROUTES } from 'utils/ROUTES';
import { isAuthenticatedAtom } from 'utils/atoms/isAuthenticatedAtom';
import { userAtom } from 'utils/atoms/userAtom';

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const theme = useTheme();
  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.MAIN(user.id));
    }
  }, [isAuthenticated, user, router]);

  const handleLogin = (role: string) => {
    //로그인 로직 처리하는 부분
    setIsAuthenticated(true);
    if (role === 'admin') {
      setUser(prev => ({ ...prev, id: 1, role: 'admin' }));
    }
  };

  return (
    <>
      로그인 페이지
      <button
        style={{ color: theme.colors.primary.default }}
        onClick={() => handleLogin('normal')}
      >
        일반 로그인 버튼
      </button>
      <button onClick={() => handleLogin('admin')}>관리자 로그인 버튼</button>
    </>
  );
};

export default Login;
