import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import AuthGuard from 'components/auth/AuthGuard';
import { Button } from 'components/common/Button';
import { Divider } from 'components/common/Divider';
import Dropdown from 'components/common/DropDown';
import { Spacer } from 'components/common/Spacer';
import { HStack, VStack } from 'components/common/Stack';
import Sidebar from 'components/layout/Sidebar';
import { StyledTextarea, Textarea } from 'components/premade/StyledTextArea';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import {
  getTranslationResult,
  postFormToTranslation,
} from 'utils/api/translation/translationAPI';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import { isAuthenticatedAtom } from 'utils/jotai/atoms/isAuthenticatedAtom';
import { isSidebarOpenAtom } from 'utils/jotai/atoms/isSidebarOpenAtom';
import { languageListAtom } from 'utils/jotai/atoms/languageListAtom';

const MainPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
  const isMobile = useMediaQuery(theme.Media.mobile_query);
  const { uid } = router.query;
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [translationNo, setTranslationNo] = useState<number | null>(null); // 번역 번호 상태 추가
  const [languageList] = useAtom(languageListAtom);
  const [loadingText, setLoadingText] = useState('loading');
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  console.log('is auth main', isAuthenticated);

  // 번역 요청을 위한 useMutation
  const translationMutaion = postFormToTranslation();

  // 번역 결과 요청을 위한 useQuery. translationNo가 null이 아닐 때에만 실행
  const { data: translationResult } = getTranslationResult(translationNo);

  // 제출 버튼 눌렀을 때 실행되는 함수
  const handleSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    console.log(inputText);
    console.log(selectedLanguage);
    formData.append('userAccountNo', uid as string);
    formData.append('requestText', inputText);
    formData.append('resultLanguageName', selectedLanguage);
    translationMutaion.mutate(formData, {
      onSuccess: data => {
        console.log(data);
        setTranslationNo(data);
      },
      onError: error => {
        setIsLoading(false);
        console.log(error);
      },
    });
  };

  // inputText가 바뀔 때마다 실행되는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  // Clear 버튼 눌렀을 때 실행되는 함수
  const clearInputOutput = () => {
    setInputText('');
    setOutputText('');
  };

  // 로딩 중일 때 실행되는 useEffect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    // isLoading이 참일 때에만 작동.
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingText(prev => (prev.length < 10 ? prev + '.' : 'loading'));
      }, 500);
    } else {
      // isLoading이 거짓이 되었을 때, setInterval을 정지.
      if (interval) {
        clearInterval(interval);
        interval = undefined;
      }
    }

    // 컴포넌트가 언마운트 될 때 혹은 이후의 useEffect 호출 전에 실행됨.
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  // 번역 결과가 있을 때 실행되는 useEffect (번역 결과가 있으면 isLoading을 false로 바꾸고, outputText를 설정)
  useEffect(() => {
    if (translationResult) {
      setIsLoading(false);
      console.log(translationResult);
      setOutputText(translationResult.resultText);
    }
  }, [translationResult]);

  return (
    <AuthGuard>
      <HStack h="100vh" w={isMobile ? '100vw' : '75vw'}>
        <VStack w="100%" h="100%">
          <VStack w="100%" h="50%">
            <VStack
              w={'100%'}
              h="100%"
              spacing="1rem"
              style={{ padding: '2rem 2rem 1rem 2rem' }}
            >
              <Textarea
                textareaRef={textareaRef}
                borderColor={theme.colors.primary.default}
                value={inputText}
                onChange={handleInputChange} // Update this
              />
              <HStack w="100%" spacing={isMobile ? '1rem' : '2rem'}>
                <StyledText>TO</StyledText>
                <Dropdown
                  options={languageList}
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                  paddingLeft="1rem"
                  paddingRight="1rem"
                  size="xs"
                />
                <Spacer />
                <Button
                  size={'xs'}
                  bgColor={theme.colors.mono.input_gray}
                  hoverColor={theme.colors.mono.gray200}
                  fontColor="black"
                  onClick={clearInputOutput}
                >
                  Clear
                </Button>
                <Button size={'xs'} onClick={handleSubmit}>
                  Submit
                </Button>
              </HStack>
            </VStack>
          </VStack>
          <VStack
            w="100%"
            h="50%"
            style={{ backgroundColor: theme.colors.primary.semi_dark }}
          >
            <VStack
              w={'100%'}
              h="100%"
              spacing="1rem"
              style={{ padding: '2.5rem 2rem 2.5rem 2rem' }}
            >
              <StyledTextarea
                color={theme.colors.mono.white}
                value={isLoading ? loadingText : outputText}
                readOnly
              />
            </VStack>
            {isMobile && (
              <SidebarOpenButton onClick={() => setIsSidebarOpen(true)}>
                <Divider width="80%" color="gray" thickness="2px" />
              </SidebarOpenButton>
            )}
          </VStack>
        </VStack>
        <Sidebar outputText={outputText} />
      </HStack>
    </AuthGuard>
  );
};

export default MainPage;

const StyledText = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: 2rem;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    font-size: 1.5rem;
  }
`;

export const SidebarOpenButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  unset: all;
  position: absolute;
  bottom: 0px;
  right: 50%;
  transform: translateX(50%);
  width: 150px;
  height: 10px;
  pointer: cursor;
  background-color: ${({ theme }) => theme.colors.mono.input_gray};
  border: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.semi_light};
  }
`;
