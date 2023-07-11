import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Avatar from 'components/common/Avatar';
import { Divider } from 'components/common/Divider';
import { Spacer } from 'components/common/Spacer';
import { HStack } from 'components/common/Stack';
import { deleteCookie } from 'cookies-next';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import Admin from 'public/Admin.svg';
import Logout from 'public/Logout.svg';
import Setting from 'public/Setting.svg';
import { useState } from 'react';
import { ROUTES } from 'utils/ROUTES';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import { isAuthenticatedAtom } from 'utils/jotai/atoms/isAuthenticatedAtom';
import { isSidebarOpenAtom } from 'utils/jotai/atoms/isSidebarOpenAtom';
import { defaultUser, userAtom } from 'utils/jotai/atoms/userAtom';
import UpdateModal from './UpdateModal';

export const UserStatusPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.Media.mobile_query);
  const [, setAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
  const [isModalOpen, setModalOpen] = useState(false);

  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const logout = () => {
    setAuthenticated(false);
    setIsSidebarOpen(false);
    setUser(defaultUser);
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    router.push('/login');
  };
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <UserStatusPanelContainer spacing="0.5rem">
      {isMobile ? (
        <SidebarCloseButton onClick={() => setIsSidebarOpen(false)}>
          <Divider width="80%" color="gray" thickness="2px" />
        </SidebarCloseButton>
      ) : null}
      <div>
        <Avatar src={user.profileImageUrl || null} size="sm" />
      </div>
      <StyledText color="white" style={{ marginLeft: '0.5rem' }}>
        {user.userName}
      </StyledText>
      <Spacer />
      {user && user.userRole === 'admin' && (
        <StyledButton
          onClick={() => router.push(ROUTES.ADMIN(user.userAccountNo))}
          style={{ marginRight: '0.3rem' }}
        >
          <Admin width="26px" height="26px" />
        </StyledButton>
      )}
      <StyledButton onClick={logout}>
        <Logout width="24px" height="24px" />
      </StyledButton>
      <StyledButton onClick={toggleModal}>
        <Setting width="25px" height="25px" />
      </StyledButton>
      <UpdateModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </UserStatusPanelContainer>
  );
};

const StyledText = styled.p`
  text-overflow: ellipsis; // 텍스트가 넘칠 경우 말줄임표 표시
  white-space: nowrap; // 줄바꿈 방지
  overflow: hidden; // 넘치는 텍스트 숨기기
  font-size: 25px;
  color: ${({ theme }) => theme.colors.mono.white};
  width: 22rem;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    width: 20rem;
  }
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
  height: 8rem;
  width: 86%;

  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    margin-top: 0.5rem;
  }
`;
