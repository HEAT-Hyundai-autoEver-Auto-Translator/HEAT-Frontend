import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Avatar from 'components/common/Avatar';
import { Divider } from 'components/common/Divider';
import { HStack, VStack } from 'components/common/Stack';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/ROUTES';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import { isAuthenticatedAtom } from 'utils/jotai/atoms/isAuthenticatedAtom';
import { isSidebarOpenAtom } from 'utils/jotai/atoms/isSidebarOpenAtom';
import { defaultUser, userAtom } from 'utils/jotai/atoms/userAtom';
import Admin from '@/../public/Admin.svg';
import Logout from '@/../public/Logout.svg';
import Setting from '@/../public/Setting.svg';
import { Spacer } from 'components/common/Spacer';
import { Text } from 'components/common/Text';

export const UserStatusPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.Media.mobile_query);
  const [, setAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);

  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const logout = () => {
    setAuthenticated(false);
    setIsSidebarOpen(false);
    setUser(defaultUser);
    router.push('/login');
  };
  return (
    <UserStatusPanelContainer w="90%" h="10%" spacing="0.5rem">
      {isMobile ? (
        <SidebarCloseButton onClick={() => setIsSidebarOpen(false)}>
          <Divider width="80%" color="gray" thickness="2px" />
        </SidebarCloseButton>
      ) : null}
      <Avatar src={null} size="sm" />
      <StyledText color="white" style={{ marginLeft: '0.5rem' }}>
        {user.userName}
      </StyledText>
      <Spacer />
      {user && user.userRole === 'admin' && (
        <StyledButton onClick={() => router.push(ROUTES.ADMIN(user.userId))}>
          <Admin width="25px" height="25px" />
        </StyledButton>
      )}
      <StyledButton onClick={logout} style={{ backgroundColor: 'transparent' }}>
        <Logout width="25px" height="25px" />
      </StyledButton>
      <StyledButton>
        <Setting width="25px" height="25px" />
      </StyledButton>
    </UserStatusPanelContainer>
  );
};

const StyledText = styled.p`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.mono.white};
`;

const StyledButton = styled.button`
  all: unset;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

export const SidebarCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  unset: all;
  position: absolute;
  top: 0px;
  right: 50%;
  transform: translateX(50%);
  width: 150px;
  height: 10px;
  pointer: cursor;
  background-color: ${({ theme }) => theme.colors.mono.input_gray};
  border: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.semi_light};
  }
`;

const UserStatusPanelContainer = styled(HStack)`
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    margin-top: 0.5rem;
  }
`;
