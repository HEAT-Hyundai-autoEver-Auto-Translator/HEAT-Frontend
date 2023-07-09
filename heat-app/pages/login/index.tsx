import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Box } from 'components/common/Box';
import { Button } from 'components/common/Button';
import { Divider } from 'components/common/Divider';
import { ErrorComponent } from 'components/common/ErrorComponent';
import { ErrorPanel } from 'components/common/ErrorPanel';
import { LoadingComponent } from 'components/common/LoadingComponent';
import { Spacer } from 'components/common/Spacer';
import { HStack, VStack } from 'components/common/Stack';
import { Text } from 'components/common/Text';
import { GoogleLoginButton } from 'components/pages/login/GoogleLoginButton';
import RegisterModal from 'components/pages/login/RegisterModal';
import { StyledAutoEverLogo } from 'components/premade/StyledAutoEverLogo';
import { StyledHeatLogo } from 'components/premade/StyledHeatLogo';
import { StyledInput } from 'components/premade/StyledInput';
import { getCookie, getCookies, setCookie } from 'cookies-next';
import { on } from 'events';
import { useAtom } from 'jotai';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { ROUTES } from 'utils/ROUTES';
import { getDataWithParams, postDataWithBody } from 'utils/api/api';
import { isAuthenticatedAtom } from 'utils/jotai/atoms/isAuthenticatedAtom';
import { toastAtom } from 'utils/jotai/atoms/toastAtom';
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
  const [isModalOpen, setModalOpen] = useState(false);
  const [, setToast] = useAtom(toastAtom);
  const [resultUserAccountNo, setResultUserAccountNo] = useState<number | null>(
    null,
  );
  const { register, handleSubmit, control, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { errors } = formState;

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.MAIN(user.userAccountNo));
    }
  }, [isAuthenticated, user, router]);

  /**
   * @description 유저정보 요청을 위한 useQuery. 번역 번호 상태가 null이 아닐 때에만 실행.
   */
  const {
    data: userResultData,
    isLoading: userResultIsLoading,
    isError: userResultIsError,
    error: userResultError,
    refetch: refetchUserResult,
  } = useQuery(
    ['getUserDataResults', resultUserAccountNo],
    () =>
      getDataWithParams(`/user/uid`, {
        uid: resultUserAccountNo,
      }),
    { enabled: resultUserAccountNo !== null, retry: 3, retryDelay: 3000 },
  );

  /**
   * @description 로그인 폼 제출 시 실행되는 함수
   * formData로 변환후 useMutation 실행 -> onSuccess시 userAccountNo 저장
   * @param data :FormValues
   */
  const onSubmit = (data: FormValues) => {
    console.log(data);
    const formData = new FormData();
    formData.append('userEmail', data.email);
    formData.append('userPassword', data.password);
    console.log(formData.get('userPassword'));

    mutate(formData, {
      onSuccess: data => {
        console.log('data', data);
        setResultUserAccountNo(data.userAccountNo);
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);
      },
      onError: error => {
        console.log(error);
        setToast({
          type: 'error',
          title: 'Login Error',
          message: 'Failed to login',
          isOpen: true,
        });
      },
    });
  };

  /**
   * @description userResultData가 존재하면 userAtom에 저장하고 로그인 성공 후 메인으로 이동
   */
  useEffect(() => {
    if (userResultData) {
      console.log('userResultData', userResultData);
      setUser(userResultData);
      setIsAuthenticated(true);
      setToast({
        type: 'success',
        title: 'Login Success',
        message: 'Login Success',
        isOpen: true,
      });
    }
  }, [userResultData]);

  /**
   * @description 로그인 요청을 위한 useMutation
   * @param FormData
   * @returns tokens + userAccountNo
   */
  const {
    data: result,
    isLoading,
    isError,
    error,
    mutate,
  } = useMutation(
    (userData: FormData) => postDataWithBody('/user/login', userData),
    { retry: 3, retryDelay: 1000 },
  );

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
    // console.log(isModalOpen);
  };

  // const { data, isLoading, isError, error, refetch } = useQuery(
  //   'fetchData',
  //   () => getData('/user'),
  // );

  // if (isLoading) return <LoadingComponent />;
  // if (isError) return <ErrorComponent error={error} refetch={refetch} />;

  // if (isLoading) {
  //   return <LoadingComponent />;
  // }

  // if (isError) {
  //   return <ErrorComponent error={error} />;
  // }
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
                // onClick={() => handleLogin('normal')}
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
            <Text fontSize="2rem" mobileFontSize="1rem">
              Social Login
            </Text>
            <StyledDivider />
          </HStack>
          <GoogleLoginButton setResultUserAccountNo={setResultUserAccountNo} />
        </Box>
        <Text
          fontSize="2rem"
          onClick={toggleModal}
          style={{ cursor: 'pointer' }}
        >
          Register
        </Text>
        <RegisterModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
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
