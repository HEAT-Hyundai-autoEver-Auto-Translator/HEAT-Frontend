import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from 'components/common/Button';
import { Spacer } from 'components/common/Spacer';
import { StyledGoogleLogo } from 'components/premade/StyledGoogleLogo';

export const GoogleLoginButton = () => {
  const theme = useTheme();
  const handleLogin = () => {};
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
