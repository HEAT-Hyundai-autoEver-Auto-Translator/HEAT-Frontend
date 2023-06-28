import { HStack, VStack } from 'components/common/Stack';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ROUTES } from 'utils/ROUTES';
import { isAuthenticatedAtom } from 'utils/atoms/isAuthenticatedAtom';
import { userAtom } from 'utils/atoms/userAtom';
import HeatLogo from '@/../public/HeatLogo.svg';
import AutoEverLogo from '@/../public/AutoEverLogo.svg';
import GoogleLogo from '@/../public/GoogleLogo.svg';
import { Spacer } from 'components/common/Spacer';
import { Button } from 'components/common/Button';
import { Box } from 'components/common/Box';
import { Divider } from 'components/common/Divider';
import { Text } from 'components/common/Text';
import { StyledInput } from 'components/premade/StyledInput';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import RegisterModal from 'components/pages/login/RegisterModal';

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.Media.mobile);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.MAIN(user.id));
    }
  }, [isAuthenticated, user, router]);

  const handleLogin = (role: string) => {
    //로그인 로직 처리하는 부분
    setIsAuthenticated(true);
    if (role === 'admin') {
      setUser(prev => ({ ...prev, id: 1, role: 'admin' }));
    }
  };

  return (
    <VStack w="100vw" h="100vh" spacing="5rem" padding="5rem 0 0 0">
      <Spacer />
      <HeatLogo
        fill={theme.colors.primary.default}
        width={isMobile ? '250' : '550'}
        height={isMobile ? '100' : '200'}
      />
      <VStack spacing="0.5rem">
        <Box
          spacing="2.5rem"
          borderColor={theme.colors.primary.default}
          borderWidth="2px"
          borderRadius="20px"
          borderStyle="solid"
          padding="3.5rem 3.5rem 3.5rem 3.5rem"
        >
          <StyledInput inputSize={isMobile ? 'sm' : 'lg'} placeholder="Email" />
          <StyledInput
            inputSize={isMobile ? 'sm' : 'lg'}
            placeholder="Password"
          />
          <Button
            size={isMobile ? 'sm' : 'lg'}
            fontColor={theme.colors.mono.white}
            bgColor={theme.colors.primary.semi_light}
            onClick={() => handleLogin('normal')}
          >
            일반 로그인 버튼
          </Button>

          <Button
            size={isMobile ? 'sm' : 'lg'}
            fontColor={theme.colors.mono.white}
            bgColor={theme.colors.primary.semi_light}
            onClick={() => handleLogin('admin')}
          >
            관리자 로그인 버튼
          </Button>
          <HStack w="100%" spacing="1rem">
            <Divider
              width={isMobile ? '20%' : '30%'}
              color={theme.colors.primary.default}
              thickness="2px"
            />
            <Text
              fontSize={isMobile ? '1.5rem' : ' 2rem'}
              color={theme.colors.primary.default}
            >
              Social Login
            </Text>
            <Divider
              width={isMobile ? '20%' : '30%'}
              color={theme.colors.primary.default}
              thickness="2px"
            />
          </HStack>
          <Button
            size={isMobile ? 'sm' : 'lg'}
            onClick={() => {}}
            bgColor="#FF8944"
            hoverColor="#BC5C24"
          >
            <GoogleLogo
              width={isMobile ? '20' : '30'}
              height={isMobile ? '15' : '19'}
              style={{ marginLeft: '3rem' }}
            />
            <Spacer />
            <Text
              style={{ marginRight: '3rem' }}
              fontSize={isMobile ? '1.3rem' : theme.fonts.size.h2}
            >
              구글 로그인
            </Text>
            <Spacer />
          </Button>
        </Box>
        <RegisterModal />
      </VStack>
      <Spacer />
      <AutoEverLogo
        fill={theme.colors.primary.default}
        width={isMobile ? '100' : '150'}
        height={isMobile ? '30' : '50'}
        style={{ marginBottom: '2rem' }}
      />
    </VStack>
  );
};

export default Login;
