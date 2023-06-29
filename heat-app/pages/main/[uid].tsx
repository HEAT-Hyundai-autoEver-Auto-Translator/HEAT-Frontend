import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import AuthGuard from 'components/auth/AuthGuard';
import { Button } from 'components/common/Button';
import Dropdown from 'components/common/DropDown';
import { Hamburger } from 'components/common/Hamburger';
import { Spacer } from 'components/common/Spacer';
import { HStack, VStack } from 'components/common/Stack';
import Sidebar from 'components/layout/Sidebar';
import { StyledTextarea, Textarea } from 'components/premade/StyledTextArea';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';

const languageOptions = [
  { label: 'Korean', value: 'Korean' },
  { label: 'English', value: 'English' },
  { label: 'Japanese', value: 'Japanese' },
];

const MainPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery(theme.Media.mobile_query);
  const { uid } = router.query;
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  const handleSubmit = () => {
    setOutputText(inputText);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <AuthGuard>
      <HStack h="100vh" w={isMobile ? '100vw' : '70vw'}>
        <VStack w="100%" h="100%">
          {isMobile && (
            <StyledButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Hamburger width="14" height="10" fill="gray" />
            </StyledButton>
          )}
          <VStack w="100%" h="50%">
            <VStack
              w={isMobile ? '100%' : '98%'}
              h="100%"
              spacing="1rem"
              style={{ padding: '3rem 2rem 1rem 2rem' }}
            >
              <Textarea
                textareaRef={textareaRef}
                borderColor={theme.colors.primary.default}
                value={inputText}
                onChange={handleInputChange} // Update this
              />
              <HStack w="98%" spacing={isMobile ? '1rem' : '2rem'}>
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
              w={isMobile ? '100%' : '98%'}
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
          </VStack>
        </VStack>
        {isSidebarOpen ? (
          <Sidebar
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        ) : null}
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

const StyledButton = styled.button`
  unset: all;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  pointer: cursor;
  background-color: transparent;
  border: 0px solid gray;
  border-radius: 5px;
  &:hover {
    background-color: gray;
  }
`;
