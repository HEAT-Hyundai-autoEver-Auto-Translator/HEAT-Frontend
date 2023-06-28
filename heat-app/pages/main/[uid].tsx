import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import AuthGuard from 'components/auth/AuthGuard';
import { Button } from 'components/common/Button';
import Dropdown from 'components/common/DropDown';
import { Hamburger } from 'components/common/Hamburger';
import { Spacer } from 'components/common/Spacer';
import { HStack, VStack } from 'components/common/Stack';
import { Text } from 'components/common/Text';
import Sidebar from 'components/layout/Sidebar';
import { useRouter } from 'next/router';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
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
  const isMobile = useMediaQuery(theme.Media.mobile);
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
                isMobile={isMobile}
                textareaRef={textareaRef}
                borderColor={theme.colors.primary.default}
                value={inputText}
                onChange={handleInputChange} // Update this
              />
              <HStack w="98%" spacing={isMobile ? '1rem' : '2rem'}>
                <Text
                  fontSize={isMobile ? 'xl' : '2rem'}
                  fontWeight={theme.fonts.weight.bold}
                >
                  TO
                </Text>
                <Dropdown
                  options={languageOptions}
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                  paddingLeft="1rem"
                  paddingRight="1rem"
                  size="xs"
                />
                <Spacer />
                <Button
                  size={isMobile ? 'xxs' : 'xs'}
                  bgColor={theme.colors.primary.semi_light}
                  hoverColor={theme.colors.primary.default}
                  fontColor={theme.colors.mono.white}
                  onClick={handleSubmit}
                >
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
                readOnly // Add this
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

const StyledTextarea = styled.textarea<TextareaProps>`
  width: 100%;
  height: 100%;
  padding: ${({ isMobile }) =>
    isMobile ? '12px' : '15px'}; // Adjust padding based on isMobile
  font-size: ${({ isMobile }) =>
    isMobile ? '14px' : '18px'}; // Adjust font size based on isMobile
  border-radius: 20px;
  border: 1px solid ${({ borderColor }) => borderColor || 'transparent'};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  color: ${({ color }) => color || 'black'};
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.mono.input_gray};
    margin: 20px;
    border-radius: 10px;
  }

  ::placeholder {
    color: ${({ placeholderColor }) => placeholderColor || 'gray'};
  }
`;

type TextareaProps = {
  bgColor?: string;
  borderColor?: string;
  isMobile?: boolean;
  color?: string;
  placeholder?: string;
  placeholderColor?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; // Move this here
};

const Textarea = ({
  bgColor,
  borderColor,
  color,
  placeholder,
  placeholderColor,
  textareaRef,
  isMobile,
  value,
  onChange,
}: TextareaProps & {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  isMobile: boolean;
}) => {
  return (
    <StyledTextarea
      ref={textareaRef}
      bgColor={bgColor}
      borderColor={borderColor}
      color={color}
      placeholder={placeholder}
      placeholderColor={placeholderColor}
      isMobile={isMobile}
      value={value}
      onChange={onChange}
    />
  );
};
