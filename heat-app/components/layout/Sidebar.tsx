import { HistoryPanelContainer } from '@/admin/[uid]';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Divider } from 'components/common/Divider';
import { Spacer } from 'components/common/Spacer';
import { VStack } from 'components/common/Stack';
import { TranslationHistoryPanel } from 'components/pages/main/TranslationHistoryPanel';
import { UserStatusPanel } from 'components/pages/main/UserStatusPanel';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Translation } from 'types/schema/Translation';
import { getDataWithParams } from 'utils/api/api';

import { isSidebarOpenAtom } from 'utils/jotai/atoms/isSidebarOpenAtom';
import { userAtom } from 'utils/jotai/atoms/userAtom';

interface SidebarProps {
  outputText: string | null;
}
const Sidebar = ({ outputText }: SidebarProps) => {
  const [isSidebarOpen] = useAtom(isSidebarOpenAtom);
  const theme = useTheme();
  const [user, setUser] = useAtom(userAtom);
  const [historyList, setHistoryList] = useState<Translation[]>([]);
  const {
    data: historyResult,
    isLoading: historyIsLoading,
    isError: historyIsError,
    error: historyError,
    refetch: historyRefetch,
  } = useQuery(
    ['getHistoryResult', user?.userEmail],
    () =>
      getDataWithParams(`/translation/user-email`, {
        'user-email': user.userEmail,
      }),
    { enabled: user !== null, retry: 5, retryDelay: 5000 },
  );

  useEffect(() => {
    if (historyResult) {
      setHistoryList(historyResult);
      console.log(historyResult);
    }
  }, [historyResult]);

  // translationNo가 변화할 때마다 historyRefetch를 호출합니다.
  useEffect(() => {
    if (outputText !== null) {
      historyRefetch();
    }
  }, [outputText]);

  return (
    <SidebarContainer isSidebarOpen={isSidebarOpen}>
      <UserStatusPanel />
      <Divider
        width="87%"
        thickness="2px"
        color={theme.colors.primary.semi_light}
      />
      <VStack w="100%" h="92%">
        <TranslationHistoryPanel
          historyList={historyList}
          isLoading={historyIsLoading}
          refetch={historyRefetch}
        />
      </VStack>
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
  justify-content: flex-start;
  position: fixed;
  top: 0;
  right: 0;
  width: 25%;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primary.default};
  @media ${({ theme }) => theme.Media.mobile_query} {
    transition: all 0.5s ease-in-out;
    transform: ${({ isSidebarOpen }) =>
      isSidebarOpen ? 'translateY(0)' : 'translateY(100%)'};
    width: 100%;
  }
`;
