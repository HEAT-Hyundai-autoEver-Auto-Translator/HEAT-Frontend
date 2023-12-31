import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from 'components/common/Button';
import { Modal } from 'components/common/Modal';
import { Spacer } from 'components/common/Spacer';
import { HStack, VStack } from 'components/common/Stack';
import { Text } from 'components/common/Text';
import { StyledTextarea } from 'components/premade/StyledTextArea';
import { useAtom } from 'jotai';
import CloseIcon from 'public/CloseIcon.svg';
import { useState } from 'react';
import { Translation } from 'types/schema/Translation';
import { deleteHistory } from 'utils/api/translation/translationAPI';
import { formatDate, formatDateTime } from 'utils/function/formatTime';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import { toastAtom } from 'utils/jotai/atoms/toastAtom';

type HistoryCardProps = {
  data: Translation;
  refetch: () => void;
};
export const HistoryCard = ({ data, refetch }: HistoryCardProps) => {
  const [, setToast] = useAtom(toastAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.Media.mobile_query);
  const {
    translationNo,
    userId,
    requestLanguageName,
    resultLanguageName,
    createDateTime,
    requestText,
    resultText,
  } = data;
  const handleClick = () => {
    setIsClicked(true);
    toggleModal();
    setTimeout(() => setIsClicked(false), 200); // 200ms 후에 클릭 상태를 초기화
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  //history 삭제하는 mutation hook
  const deleteHistoryMutation = deleteHistory();

  const handleDelete = () => {
    deleteHistoryMutation.mutate(translationNo, {
      onSuccess: data => {
        setToast({
          type: 'success',
          title: 'Delete Success',
          message: 'History deleted successfully',
          isOpen: true,
        });
        toggleModal();
        refetch();
      },
      onError: error => {
        setToast({
          type: 'error',
          title: 'Delete Failed',
          message: 'History Delete failed',
          isOpen: true,
        });
      },
    });
  };

  return (
    <>
      <HistoryCardContainer isClicked={isClicked} onClick={handleClick}>
        <Text fontSize="2rem" color="white">
          {requestText}
        </Text>
      </HistoryCardContainer>
      <Modal padding="0rem" isOpen={isModalOpen} toggle={toggleModal}>
        <VStack style={{ position: 'relative' }}>
          <StyledTitle>Translation History</StyledTitle>
          <StyledCloseIcon width="10px" height="10px" onClick={toggleModal} />
          <ModalContainer>
            <HStack w="100%">
              <StyledText>FROM : {requestLanguageName}</StyledText>
              <Spacer />
              <StyledText>
                {createDateTime &&
                  (isMobile
                    ? formatDate(createDateTime)
                    : formatDateTime(createDateTime))}
              </StyledText>
            </HStack>
            <StyledTextarea
              color={theme.colors.mono.black}
              bgColor={theme.colors.mono.white}
              value={requestText}
              readOnly
            />
            <StyledText>TO : {resultLanguageName}</StyledText>
            <StyledTextarea
              color={theme.colors.mono.black}
              bgColor={theme.colors.mono.white}
              value={resultText}
              readOnly
            />
          </ModalContainer>
          <div style={{ marginBottom: '2rem' }}>
            <Button size="sm" onClick={handleDelete}>
              Delete History
            </Button>
          </div>
        </VStack>
      </Modal>
    </>
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

const ModalContainer = styled(VStack)`
  width: 80vw;
  height: 80vh;
  padding: 0rem 4rem 2rem 4rem;
  align-items: flex-start;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    width: 88vw;
    height: 77vh;
    padding: 0rem 2rem 2rem 2rem;
  }
`;

const StyledText = styled.p`
  margin: 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-size: 3rem;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    font-size: 1.5rem;
  }
`;

const StyledTitle = styled.p`
  margin-top: 1.5rem;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: 3.5rem;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    font-size: 1.7rem;
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 2rem;
  cursor: pointer;
  right: 2rem;
`;
