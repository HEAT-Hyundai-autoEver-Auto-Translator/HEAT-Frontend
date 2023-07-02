import GoogleLogo from 'public/GoogleLogo.svg';
import styled from '@emotion/styled';

export const StyledGoogleLogo = styled(GoogleLogo)`
  width: 30px;
  height: 19px;
  margin-left: 3rem;

  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    width: 20px;
    height: 15px;
    margin-left: 1.5rem;
  }
`;
