import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'components/common/Button';
import { Spacer } from 'components/common/Spacer';
import { StyledGoogleLogo } from 'components/premade/StyledGoogleLogo';
import { setCookie } from 'cookies-next';
import { useAtom } from 'jotai';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { postDataWithBody } from 'utils/api/api';
import { toastAtom } from 'utils/jotai/atoms/toastAtom';

interface GoogleLoginButtonProps {
  setResultUserAccountNo: React.Dispatch<React.SetStateAction<number | null>>;
}
export const GoogleLoginButton = ({
  setResultUserAccountNo,
}: GoogleLoginButtonProps) => {
  const [token, setToken] = useState(null);
  const [, setToast] = useAtom(toastAtom);

  const googleOnSuccess = (data: any) => {
    const access_token = data.access_token;
    setToken(access_token);
  };
  const googleOnError = (error: any) => {
    console.log(error);
  };

  const handleLogin = useGoogleLogin({
    onSuccess: googleOnSuccess,
    onError: googleOnError,
  });

  const googleLoginMutation = useMutation((accessToken: string) =>
    postDataWithBody('/user/login/google', { accessToken: accessToken }),
  );

  const sendToken = (token: string) => {
    googleLoginMutation.mutate(token, {
      onSuccess: data => {
        setToast({
          type: 'success',
          title: 'Login Success',
          message: 'Google Login successful',
          isOpen: true,
        });
        setResultUserAccountNo(data.userAccountNo);
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);
      },
      onError: error => {
        setToast({
          type: 'error',
          title: 'Login Failed',
          message: 'Google Login failed',
          isOpen: true,
        });
      },
    });
  };

  useEffect(() => {
    if (token) {
      console.log(token);
      sendToken(token);
    }
  }, [token]);
  return (
    <Button
      size="lg"
      onClick={handleLogin}
      fontColor="black"
      bgColor="#FF8944"
      hoverColor="#BC5C24"
    >
      <StyledGoogleLogo />
      <Spacer />
      <StyledText>Google Login</StyledText>
      <Spacer />
    </Button>
  );
};

const StyledText = styled.p`
  margin-right: 6rem;
  font-size: 2rem;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    font-size: 1rem;
    margin-right: 3.5rem;
  }
`;
