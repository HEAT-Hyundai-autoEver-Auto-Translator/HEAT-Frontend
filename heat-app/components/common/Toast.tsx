import { Theme, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import ErrorIcon from 'public/ErrorIcon.svg';
import SuccessIcon from 'public/SuccessIcon.svg';
import WarningIcon from 'public/WarningIcon.svg';
import { useEffect } from 'react';
import { toastAtom } from 'utils/jotai/atoms/toastAtom';
import { Spacer } from './Spacer';
import { HStack, VStack } from './Stack';

interface ToastContainerProps {
  type: 'success' | 'warning' | 'error';
}

const ToastContainer = styled.div<ToastContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 0px;
  top: 20px;
  width: 25rem;
  height: 5rem;
  ${({ type }) => {
    switch (type) {
      case 'success':
        return ({ theme }) =>
          `background-color: ${theme.colors.semantic.success_light};`;
      case 'warning':
        return ({ theme }) =>
          `background-color: ${theme.colors.semantic.warning_light};`;
      case 'error':
        return ({ theme }) =>
          `background-color: ${theme.colors.semantic.error_light};`;
      default:
        return '';
    }
  }}
  z-index: ${({ theme }) => theme.zIndex.toast};
  padding: 10px;
  animation: ${keyframes`
    0% { transform: translateX(100%); }
    10%, 90% { transform: translateX(0); }
    100% { transform: translateX(100%); }
  `} 2s ease-in-out 1;
  animation-fill-mode: forwards;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    width: 15rem;
    height: 4rem;
  }
`;

export const Toast = () => {
  // jotai atom을 사용하여 토스트 상태 관리
  const [toast, setToast] = useAtom(toastAtom);

  // 토스트가 열렸을 때 5초 후에 자동으로 닫히도록 설정
  useEffect(() => {
    if (toast.isOpen) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, isOpen: false }));
      }, 5000);
      // 컴포넌트가 언마운트되거나 토스트가 닫힐 때 타이머 클린업
      return () => {
        clearTimeout(timer);
      };
    }
  }, [toast, setToast]);

  // 토스트가 열리지 않았으면 렌더링하지 않음
  if (!toast.isOpen) {
    return null;
  }

  // 토스트 클릭 시 즉시 닫히도록 핸들러 설정
  const handleClose = () => {
    setToast(prev => ({ ...prev, isOpen: false }));
  };

  // 토스트 렌더링
  return (
    <ToastContainer type={toast.type} onClick={handleClose}>
      <HStack w="100%" spacing="1rem">
        {toast.type === 'success' && <StyledSuccessIcon />}
        {toast.type === 'warning' && <StyledWarningIcon />}
        {toast.type === 'error' && <StyledErrorIcon />}
        <VStack>
          <StyledTitle>{toast.title}</StyledTitle>
          <StyledText>{toast.message}</StyledText>
        </VStack>
        <Spacer />
      </HStack>
    </ToastContainer>
  );
};

const StyledTitle = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: 1.5rem;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    font-size: 1rem;
  }
`;

const StyledText = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  width: 100%;
  font-size: 1.2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    font-size: 0.7rem;
  }
`;

const iconStyles = (props: { theme: Theme }) => `
  width: 2.4rem;
  height: 2.4rem;
  @media (max-width: ${props.theme.Media.mobile}) {
    width: 2rem;
    height: 2rem;
  }
`;

const StyledErrorIcon = styled(ErrorIcon)`
  ${iconStyles}
`;

const StyledWarningIcon = styled(WarningIcon)`
  ${iconStyles}
`;

const StyledSuccessIcon = styled(SuccessIcon)`
  ${iconStyles}
`;

/*
next/Image로 해보고 싶었으나, svg를 지원하지 않아서 이런 방식으로 하면 된다고만 남겨놓음
interface ImageIconProps {
  src: StaticImageData;
  alt?: string;
  width: number;
  height: number;
}

const ImageIcon: FC<ImageIconProps> = ({ src, alt, width, height }) => {
  return <Image src={src} alt={alt || ''} width={width} height={height} />;
};

export default ImageIcon;
  const StyledSuccessIcon = () => (
    <ImageIcon src={SuccessIcon} alt="Success" width={24} height={24} />
  );
  const StyledWarningIcon = () => (
    <ImageIcon src={WarningIcon} alt="Warning" width={24} height={24} />
  );
  const StyledErrorIcon = () => (
    <ImageIcon src={ErrorIcon} alt="Error" width={24} height={24} />
  );
*/
