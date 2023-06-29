import GoogleLogo from '@/../public/GoogleLogo.svg';
import styled from '@emotion/styled';

export const StyledGoogleLogo = styled(GoogleLogo)`
  width: 30px;
  height: 19px;

  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    width: 20px;
    height: 15px;
  }
`;
