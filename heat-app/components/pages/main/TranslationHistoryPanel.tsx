import styled from '@emotion/styled';
import { HStack, VStack } from 'components/common/Stack';
import { HistoryCard } from './HistoryCard';
import { Text } from 'components/common/Text';
import { Spacer } from 'components/common/Spacer';
import Dropdown from 'components/common/DropDown';
import { useMemo, useState } from 'react';
import { Translation } from 'types/schema/Translation';
import { Skeleton } from 'components/common/Skeleton';

const SortOptions = [
  { label: 'NEW', value: 'new' },
  { label: 'OLD', value: 'old' },
];
interface TranslationHistoryPanelProps {
  historyList?: Translation[];
  isLoading?: boolean;
  refetch: () => void;
}

export const TranslationHistoryPanel = ({
  historyList,
  isLoading,
  refetch,
}: TranslationHistoryPanelProps) => {
  const [selectedOption, setSelectedOption] = useState('new');

  const sortedHistory = useMemo(() => {
    return historyList?.slice().sort((a, b) => {
      let aDate = new Date(a.createDateTime);
      let bDate = new Date(b.createDateTime);

      if (selectedOption === 'new') {
        return bDate.getTime() - aDate.getTime();
      } else {
        return aDate.getTime() - bDate.getTime();
      }
    });
  }, [historyList, selectedOption]);

  return (
    <HistoryContainer>
      <HStack
        w="100%"
        h="5rem"
        style={{
          paddingRight: '0.5rem',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Text fontSize="2rem" color="white" mobileFontSize="1.8rem">
          History
        </Text>
        <Spacer />
        <Dropdown
          size="xs"
          options={SortOptions}
          value={selectedOption}
          onChange={setSelectedOption}
          paddingLeft="1rem"
          paddingRight="1rem"
        />
      </HStack>
      <HistoryCardWrapper spacing="2rem">
        {isLoading ? (
          // 로딩 중일 때 스켈레톤 컴포넌트를 표시
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          // 로딩이 완료되면 데이터를 표시
          sortedHistory &&
          sortedHistory.map(data => (
            <HistoryCard
              data={data}
              key={data.translationNo}
              refetch={refetch}
            />
          ))
        )}
        {/* 데이터가 없을 때 표시 */}
        {sortedHistory && sortedHistory.length === 0 && (
          <Text fontSize="2rem" color="white" mobileFontSize="1.3rem">
            No history
          </Text>
        )}
      </HistoryCardWrapper>
    </HistoryContainer>
  );
};

const HistoryContainer = styled(VStack)`
  width: 90%;
  padding-left: 0.5rem;
  height: 100%;
  justify-content: flex-start;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    height: 100%;
  }
`;

const HistoryCardWrapper = styled(VStack)`
  width: 100%;
  justify-content: flex-start;
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
    margin-left: 1rem;
    padding-left: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.mono.input_gray};
    margin-left: 1rem;
    padding-left: 1rem;

    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: darkgrey;
    margin: 0px;
    margin-left: 1rem;
    padding-left: 1rem;

    border-radius: 10px;
  }
  padding-right: 0.5rem;
`;
