import styled from '@emotion/styled';
import { Text } from 'components/common/Text';
import { type } from 'os';
import { useState } from 'react';
import { Translation } from 'types/schema/Translation';

type HistoryCardProps = {
  data: Translation;
};
export const HistoryCard = ({ data }: HistoryCardProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const {
    translationNo,
    userId,
    requestLanguageName,
    resultLanguageName,
    createdDateTime,
    requestText,
    resultText,
  } = data;
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200); // 200ms 후에 클릭 상태를 초기화
  };

  return (
    <HistoryCardContainer isClicked={isClicked} onClick={handleClick}>
      <Text fontSize="2rem" color="white">
        {requestText}
      </Text>
    </HistoryCardContainer>
  );
};

interface HistoryCardContainerProps {
  isClicked: boolean;
}
const HistoryCardContainer = styled.div<HistoryCardContainerProps>`
  display: flex;
  width: 100%;
  height: 6rem;
  align-items: center;
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.primary.semi_light};
  border-width: 2px;
  border-style: solid;
  border-radius: 10px;
  padding: 2rem;

  transition: transform 0.2s;
  transform: ${({ isClicked }) => (isClicked ? 'scale(0.97)' : 'scale(1)')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.semi_dark};
  }
`;
