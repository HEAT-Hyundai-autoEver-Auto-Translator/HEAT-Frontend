import { useTheme } from '@emotion/react';
import { Hamburger } from 'components/common/Hamburger';
import { VStack } from 'components/common/Stack';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ROUTES } from 'utils/ROUTES';
import { isAuthenticatedAtom } from 'utils/atoms/isAuthenticatedAtom';
import { defaultUser, userAtom } from 'utils/atoms/userAtom';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';

type SidebarProps = {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
};
const Sidebar = ({ setIsSidebarOpen, isSidebarOpen }: SidebarProps) => {
  const [, setAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.Media.mobile);
  const [isSidebarOpenOut, setIsSidebarOpenOut] = useState(isSidebarOpen);
  const logout = () => {
    setAuthenticated(false);
    setUser(defaultUser);
    router.push('/login');
  };

  useEffect(() => {
    if (!isSidebarOpenOut) {
      const timeoutId = setTimeout(() => {
        setIsSidebarOpen(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [isSidebarOpenOut, setIsSidebarOpen]);

  return (
    <VStack
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        transition: 'all 0.5s ease-in-out',
        transform: isSidebarOpenOut ? 'translateX(0)' : 'translateX(100%)',
        width: isMobile ? '100%' : '30%',
        height: '100%',
        backgroundColor: theme.colors.primary.default,
      }}
    >
      {/* 여기에 다른 사이드바 요소를 추가할 수 있습니다. */}
      {isMobile ? (
        <button onClick={() => setIsSidebarOpenOut(prev => !prev)}>
          <Hamburger width="14" height="10" fill="gray" />
        </button>
      ) : null}
      사이드바 입니다
      {user && user.role === 'admin' ? (
        <button onClick={() => router.push(ROUTES.ADMIN(user.id))}>
          관리자 페이지로
        </button>
      ) : null}
      <button onClick={logout}>로그아웃</button>
    </VStack>
  );
};

export default Sidebar;
