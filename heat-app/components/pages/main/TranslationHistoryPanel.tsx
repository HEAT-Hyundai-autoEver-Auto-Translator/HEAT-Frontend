import styled from '@emotion/styled';
import { HStack, VStack } from 'components/common/Stack';
import { HistoryCard } from './HistoryCard';
import { Text } from 'components/common/Text';
import { Spacer } from 'components/common/Spacer';
import Dropdown from 'components/common/DropDown';
import { useState } from 'react';
import { Translation } from 'types/schema/Translation';

const SortOptions = [
  { label: 'NEW', value: 'new' },
  { label: 'OLD', value: 'old' },
];

const dummyData: Translation[] = [
  {
    translationNo: 1,
    userId: 'user1',
    requestLanguageName: 'eng',
    resultLanguageName: 'kor',
    createdDateTime: new Date(),
    requestText: 'Hello',
    resultText: '안녕',
  },
  {
    translationNo: 2,
    userId: 'user2',
    requestLanguageName: 'eng',
    resultLanguageName: 'jap',
    createdDateTime: new Date(),
    requestText: 'Good morning',
    resultText: 'おはようございます',
  },
  {
    translationNo: 3,
    userId: 'user3',
    requestLanguageName: 'kor',
    resultLanguageName: 'eng',
    createdDateTime: new Date(),
    requestText: '안녕하세요',
    resultText: 'Hello',
  },
  {
    translationNo: 4,
    userId: 'user1',
    requestLanguageName: 'kor',
    resultLanguageName: 'jap',
    createdDateTime: new Date(),
    requestText: '안녕',
    resultText: 'こんにちは',
  },
  {
    translationNo: 5,
    userId: 'user2',
    requestLanguageName: 'jap',
    resultLanguageName: 'eng',
    createdDateTime: new Date(),
    requestText: 'こんにちは',
    resultText: 'Hello',
  },
  {
    translationNo: 6,
    userId: 'user3',
    requestLanguageName: 'jap',
    resultLanguageName: 'kor',
    createdDateTime: new Date(),
    requestText: 'おはようございます',
    resultText: '안녕하세요',
  },
  {
    translationNo: 6,
    userId: 'user3',
    requestLanguageName: 'jap',
    resultLanguageName: 'kor',
    createdDateTime: new Date(),
    requestText: 'おはようございます',
    resultText: '안녕하세요',
  },
  {
    translationNo: 6,
    userId: 'user3',
    requestLanguageName: 'jap',
    resultLanguageName: 'kor',
    createdDateTime: new Date(),
    requestText: 'おはようございます',
    resultText: '안녕하세요',
  },
];

export const TranslationHistoryPanel = () => {
  const [selecedOption, setSelectedOption] = useState('new');

  console.log(dummyData.length);
  return (
    <HistoryContainer>
      <HStack w="100%" h="5rem" style={{ paddingRight: '0.5rem' }}>
        <Text fontSize="2rem" color="white" mobileFontSize="1.8rem">
          History
        </Text>
        <Spacer />
        <Dropdown
          size="xs"
          options={SortOptions}
          value={selecedOption}
          onChange={setSelectedOption}
          paddingLeft="1rem"
          paddingRight="1rem"
        />
      </HStack>
      <HistoryCardWrapper spacing="2rem">
        {dummyData.map(data => {
          return <HistoryCard data={data}></HistoryCard>;
        })}
      </HistoryCardWrapper>
    </HistoryContainer>
  );
};

const HistoryContainer = styled(VStack)`
  width: 90%;
  padding-left: 0.5rem;
`;

const HistoryCardWrapper = styled(VStack)`
  width: 100%;
  justify-content: flex-start;
  height: 82vh;
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
