import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'components/common/Button';
import { Spacer } from 'components/common/Spacer';
import { StyledGoogleLogo } from 'components/premade/StyledGoogleLogo';
import { useEffect, useState } from 'react';

export const GoogleLoginButton = () => {
  const [token, setToken] = useState(null);

  const googleOnSuccess = (data: any) => {
    const access_token = data.access_token;
    // await CheckAuth(access_token);
    setToken(access_token);
  };
  const googleOnError = (error: any) => {
    console.log(error);
  };

  const handleLogin = useGoogleLogin({
    onSuccess: googleOnSuccess,
    onError: googleOnError,
  });

  const sendToken = async () => {
    // const res = await Axios.post('member/login/google', {
    //   accessToken: token,
    // });
    // if (res.status === 200) {
    //   setIsAuthenticated(true);
    //   setUserStatus({
    //     email: res.data.memberEmail,
    //     name: res.data.memberName,
    //     point: res.data.memberPoint,
    //     role: res.data.memberRole,
    //   });
    // } else {
    //   console.log(res);
    // }
  };

  useEffect(() => {
    if (token) {
      console.log(token);
      sendToken();
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
