import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import AuthGuard from 'components/auth/AuthGuard';
import { Button } from 'components/common/Button';
import { Divider } from 'components/common/Divider';
import Dropdown from 'components/common/DropDown';
import { Hamburger } from 'components/common/Hamburger';
import { Spacer } from 'components/common/Spacer';
import { HStack, VStack } from 'components/common/Stack';
import Sidebar from 'components/layout/Sidebar';
import { StyledTextarea, Textarea } from 'components/premade/StyledTextArea';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import { isSidebarOpenAtom } from 'utils/jotai/atoms/isSidebarOpenAtom';
import { toastAtom } from 'utils/jotai/atoms/toastAtom';

const languageOptions = [
  { label: 'Korean', value: 'Korean' },
  { label: 'English', value: 'English' },
  { label: 'Japanese', value: 'Japanese' },
];

const MainPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
  const isMobile = useMediaQuery(theme.Media.mobile_query);
  const { uid } = router.query;
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleSubmit = () => {
    setOutputText(inputText);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

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
                  options={languageOptions}
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                  paddingLeft="1rem"
                  paddingRight="1rem"
                  size="xs"
                />
                <Spacer />
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
                value={outputText}
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
        <Sidebar />
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
