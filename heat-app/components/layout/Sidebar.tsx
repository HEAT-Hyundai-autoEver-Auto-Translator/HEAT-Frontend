import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Divider } from 'components/common/Divider';
import { Spacer } from 'components/common/Spacer';
import { VStack } from 'components/common/Stack';
import { TranslationHistoryPanel } from 'components/pages/main/TranslationHistoryPanel';
import { UserStatusPanel } from 'components/pages/main/UserStatusPanel';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import { isAuthenticatedAtom } from 'utils/jotai/atoms/isAuthenticatedAtom';
import { isSidebarOpenAtom } from 'utils/jotai/atoms/isSidebarOpenAtom';
import { defaultUser, userAtom } from 'utils/jotai/atoms/userAtom';

const Sidebar = () => {
  const [isSidebarOpen] = useAtom(isSidebarOpenAtom);
  const theme = useTheme();
  return (
    <SidebarContainer isSidebarOpen={isSidebarOpen}>
      <UserStatusPanel />
      <Divider
        width="87%"
        thickness="2px"
        color={theme.colors.primary.semi_light}
      />
      <TranslationHistoryPanel />
      <Spacer />
    </SidebarContainer>
  );
};

export default Sidebar;

interface SidebarContainerProps {
  isSidebarOpen: boolean;
}
/**
 * @param isSidebarOpen 사이드바가 열려있는지 여부
 * @description 사이드바 컨테이너
 * true면 원위치 false면 오른쪽으로 100% 밀림
 */
const SidebarContainer = styled(VStack)<SidebarContainerProps>`
  position: fixed;
  top: 0;
  right: 0;
  width: 25%;
  height: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primary.default};
  @media ${({ theme }) => theme.Media.mobile_query} {
    transition: all 0.5s ease-in-out;
    transform: ${({ isSidebarOpen }) =>
      isSidebarOpen ? 'translateY(0)' : 'translateY(100%)'};
    width: 100%;
  }
`;
