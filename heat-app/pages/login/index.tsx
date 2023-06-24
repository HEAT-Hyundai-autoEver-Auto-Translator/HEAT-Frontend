import { useTheme } from '@emotion/react';
import { HStack, VStack } from 'components/common/Stack';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ROUTES } from 'utils/ROUTES';
import { isAuthenticatedAtom } from 'utils/atoms/isAuthenticatedAtom';
import { userAtom } from 'utils/atoms/userAtom';
import HeatLogo from '@/../public/HeatLogo.svg';
import AutoEverLogo from '@/../public/AutoEverLogo.svg';
import GoogleLogin from '@/../public/GoogleLogin.svg';
import { Spacer } from 'components/common/Spacer';
import { Button } from 'components/common/Button';
import styled from '@emotion/styled';
import { Box } from 'components/common/Box';
import { Divider } from 'components/common/Divider';
import { Input } from 'components/common/Input';
import { Text } from 'components/common/Text';

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const theme = useTheme();
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
      <HeatLogo fill={theme.colors.primary.default} width="550" height="200" />
      <VStack spacing="0.5rem">
        <Box
          spacing="2.5rem"
          borderColor={theme.colors.primary.default}
          borderWidth="2px"
          borderRadius="20px"
          borderStyle="solid"
          padding="3.5rem 1rem 3.5rem 1rem"
        >
          <Input
            inputSize="large"
            fontColor={theme.colors.mono.black}
            bgColor={theme.colors.mono.input_gray}
            placeholder="Email"
            paddingLeft="2.5rem"
            paddingRight="2.5rem"
          />
          <Input
            inputSize="large"
            fontColor={theme.colors.mono.black}
            bgColor={theme.colors.mono.input_gray}
            placeholder="Password"
            paddingLeft="2.5rem"
            paddingRight="2.5rem"
          />
          <Button
            size="large"
            fontColor={theme.colors.mono.white}
            bgColor={theme.colors.primary.semi_light}
            onClick={() => handleLogin('normal')}
          >
            일반 로그인 버튼
          </Button>

          <Button
            size="large"
            fontColor={theme.colors.mono.white}
            bgColor={theme.colors.primary.semi_light}
            onClick={() => handleLogin('admin')}
          >
            관리자 로그인 버튼
          </Button>
          <HStack w="100%" spacing="1rem">
            <Divider
              width="35%"
              color={theme.colors.primary.default}
              thickness="2px"
            />
            <Text fontSize="2rem" color={theme.colors.primary.default}>
              Social Login
            </Text>
            <Divider
              width="35%"
              color={theme.colors.primary.default}
              thickness="2px"
            />
          </HStack>

          <GoogleLogin width="45rem" height="6rem" />
        </Box>
        <Text fontSize="2rem" color={theme.colors.primary.default}>
          Register
        </Text>
      </VStack>
      <Spacer />
      <AutoEverLogo
        fill={theme.colors.primary.default}
        width="150"
        height="50"
        style={{ marginBottom: '2rem' }}
      />
    </VStack>
  );
};

export default Login;
