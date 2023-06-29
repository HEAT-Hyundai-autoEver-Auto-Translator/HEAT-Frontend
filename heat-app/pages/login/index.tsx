import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Box } from 'components/common/Box';
import { Button } from 'components/common/Button';
import { Divider } from 'components/common/Divider';
import { ErrorPanel } from 'components/common/ErrorPanel';
import { Spacer } from 'components/common/Spacer';
import { HStack, VStack } from 'components/common/Stack';
import { Text } from 'components/common/Text';
import { GoogleLoginButton } from 'components/pages/login/GoogleLoginButton';
import RegisterModal from 'components/pages/login/RegisterModal';

import { StyledAutoEverLogo } from 'components/premade/StyledAutoEverLogo';
import { StyledHeatLogo } from 'components/premade/StyledHeatLogo';
import { StyledInput } from 'components/premade/StyledInput';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ROUTES } from 'utils/ROUTES';
import { isAuthenticatedAtom } from 'utils/jotai/atoms/isAuthenticatedAtom';
import { userAtom } from 'utils/jotai/atoms/userAtom';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);
  const theme = useTheme();
  const router = useRouter();
  const { register, handleSubmit, control, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { errors } = formState;

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.MAIN(user.id));
    }
  }, [isAuthenticated, user, router]);

  const onSubmit = (data: FormValues) => {
    // Log in logic goes here...
    console.log(data);
  };

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
      <StyledHeatLogo fill={theme.colors.primary.default} />
      <VStack spacing="0.5rem">
        <Box
          spacing="2.5rem"
          borderColor={theme.colors.primary.default}
          borderWidth="2px"
          borderRadius="20px"
          borderStyle="solid"
          padding="3.5rem 3.5rem 3.5rem 3.5rem"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack style={{ position: 'relative' }}>
              <StyledInput
                inputSize="lg"
                placeholder="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'invalid email address',
                  },
                })}
              />
              <ErrorPanel>
                {errors.email ? errors.email.message : null}
              </ErrorPanel>
              <StyledInput
                inputSize="lg"
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must have at least 8 characters',
                  },
                })}
              />
              <ErrorPanel>
                {errors.password ? errors.password.message : null}
              </ErrorPanel>
              <Button
                size="lg"
                onClick={() => handleLogin('normal')}
                type="submit"
              >
                Login
              </Button>
              {/* <Button size="lg" onClick={() => handleLogin('admin')}>
                관리자 로그인 버튼
              </Button> */}
            </VStack>
          </form>
          <HStack w="100%" spacing="1rem">
            <StyledDivider />
            <Text fontSize={'2rem'}>Social Login</Text>
            <StyledDivider />
          </HStack>
          <GoogleLoginButton />
        </Box>
        <RegisterModal />
      </VStack>
      <Spacer />
      <StyledAutoEverLogo fill={theme.colors.primary.default} />
    </VStack>
  );
};

export default Login;

const StyledDivider = styled(Divider)`
  width: 30%;
  border-top: 2px solid ${({ theme }) => theme.colors.primary.default};

  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    width: 20%;
  }
`;
